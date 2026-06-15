# FEAT-005 — Boutons Aperçu / Publier + workflow statique

> Statut : **DONE — validé par Val (2026-06-15)**
> Aperçu : https://noema-preview.zitoon.com (basic-auth user « noema », noindex, TLS LE OK)
> Date : 2026-06-15
> Spec source de vérité : `docs/specs/noema-spec.md` (§9)
> Pré-requis : FEAT-002/003 déployés.

## Objectif

Donner à la fondatrice deux actions dans l'admin :
- **Aperçu** : reconstruit un **site d'aperçu** (contenu sauvegardé) sur une URL privée et
  l'ouvre — sans toucher la prod.
- **Publier** : reconstruit le **site public** (le « régénère » manuel devient un bouton).

Décisions (Val, 2026-06-15) : aperçu **après Save** (réutilise le rendu statique, pas de SSR
Live Preview), accès **distant protégé par mot de passe** (basic-auth Traefik) + `noindex`.

## Architecture

```
[admin] —bouton Aperçu—> POST /api/preview ┐
[admin] —bouton Publier—> POST /api/publish ┤ (réservés admin connecté ; sinon 403)
                                            └─> publisher (POST /build/{preview|public}, x-token)
publisher (apps/web, node) :
  - reconstruit le statique Astro à la demande, sérialise les builds
  - cibles : /out/public (volume web_dist) et /out/preview (volume web_preview)
  - build initial des deux au démarrage ; /health pour le healthcheck
web      (nginx)  → web_dist    → https://noema.zitoon.com           (public)
preview  (nginx)  → web_preview → https://noema-preview.zitoon.com    (basic-auth + noindex)
```

Le service one-shot `web-build` de FEAT-002/003 est **remplacé** par `publisher` (service
permanent qui reconstruit à la demande).

## Détails d'implémentation

- `apps/cms/src/components/AdminActions.tsx` : boutons `PreviewButton` / `PublishButton`
  (`admin.components.actions`). Régénérer `importMap.js` après ajout (cf. BUG-002).
- `apps/cms/src/payload.config.ts` : endpoints `/preview` et `/publish` (vérifient `req.user`),
  helper `triggerBuild` → `publisher`. Verrouillage de documents désactivé
  (`lockDocuments: false`) sur toutes les collections + global → supprime le « Edit » bloqué.
- `apps/web/publisher.mjs` + `Dockerfile` (CMD node publisher.mjs).
- `docker-compose.yml` : services `publisher` + `preview`, volume `web_preview`, middlewares
  Traefik `basicauth` + header `X-Robots-Tag: noindex`. `docker-compose.dev.yml` : ports
  8080 (public) / 8081 (preview) / 3000 (cms).
- `.env` : `PREVIEW_HOST`, `PREVIEW_SITE_URL`, `PUBLISH_TOKEN` (interne), `PREVIEW_BASICAUTH`
  (hash htpasswd ; **doubler les `$` → `$$`** car Compose interpole).

## Règle à retenir

- **Publier** = mettre en ligne (public). **Aperçu** = prévisualiser le contenu sauvegardé sur
  l'URL privée. Les deux partent du **contenu enregistré** (Save d'abord).
- Pas de bouton « Publish » natif Payload : la collection n'a pas de versions/drafts (bouton
  **Save**). Workflow brouillon→publication = évolution possible ultérieure.
