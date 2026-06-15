# FEAT-002 — Scaffold du monorepo (Astro + Payload + Postgres, dockerisé)

> Statut : **déployé sur Avignon — en attente de validation Val**
> Prod : https://noema.zitoon.com (public) · https://noema-admin.zitoon.com/admin (CMS) — TLS Let's Encrypt OK
> Date : 2026-06-15
> Spec source de vérité : `docs/specs/noema-spec.md` (§9)
> Pré-requis : FEAT-001 (fondations) validé.

## Implémentation (résumé)

- **Monorepo pnpm** : `apps/cms` (Payload 3.85.1 / Next 16) + `apps/web` (Astro 6.4.7).
- **CMS** : adaptateur `@payloadcms/db-postgres`, `push:true` en dev, localisation fr/es/en/de
  (défaut fr), collection `Pages` (title/slug/excerpt/content, lecture publique) + global
  `SiteSettings` (siteName/tagline/contactEmail). Image Docker `output: standalone`.
- **Web** : Astro SSG, i18n préfixée (`/fr /es /en /de`, racine `/`→`/fr/`), tokens CSS du
  design system (spec §5), page d'accueil lisant l'API Payload (settings + page `accueil`),
  RTL-first (direction dérivée de la langue, propriétés logiques).
- **Docker** : `postgres` + `cms` + `web-build` (one-shot SSG → volume `web_dist`) + `web`
  (nginx). Traefik via `.env` (réseau `web`, `websecure`, `letsencrypt`).
- **Décisions actées** : rendu **SSG** (cf. §9.2) ; convention Traefik Avignon relevée.

### Décisions techniques notables

- Template Payload récupéré via `degit payloadcms/payload/templates/blank#v3.85.1`, puis
  versions `workspace:*` remplacées par `3.85.1` (apps installables indépendamment → builds
  Docker par-app simples). Adaptateur mongodb → postgres.
- Test local Tulear via `docker-compose.dev.yml` (ports exposés, `docker network create web`).
- Front statique généré au démarrage par `web-build` (résout l'ordre « CMS prêt avant build »).

## Objectif

Monter le squelette **qui tourne** : monorepo `apps/web` (Astro) + `apps/cms` (Payload +
Postgres), orchestré par Docker Compose, intégré à Traefik sur Avignon. Une page d'accueil
minimale branchée sur Payload valide la chaîne complète (CMS → API → front → HTTPS).

## Où builder / déployer

- **Dev/build/test** : **Tulear** (`C:\WORK\NOEMA` en local, Docker + Node présents, toutes
  les clés SSH). Lancer la session Claude Code sur Tulear.
- **Hôte de production** : **Avignon** (Traefik/TLS/DNS existants, 24/7). Déploiement : push
  GitHub → sur Avignon `git pull && docker compose up -d --build` (ou pilotage SSH depuis Tulear).
- ⚠️ **Bruxelles** (poste courant) ne peut PAS builder (pas de Docker/Node) ni joindre Avignon
  (n'a que la clé GitHub). D'où le travail depuis Tulear.

## Décisions à acter à l'implémentation (avec test réel sur Tulear)

1. **Rendu Astro** : `SSG` (nginx, ultra-léger, mais rebuild sur publication) **vs** `SSR Node
   minimal + cache de pages` (mises à jour instantanées pour l'éditrice non technique, ~100 Mo).
   → Trancher sur Tulear en mesurant ; pencher SSR-léger si la fraîcheur instantanée prime,
   SSG si l'empreinte RAM sur Avignon (8 Go) devient critique. Mettre à jour §9 de la spec.
2. **Intégration Traefik** : récupérer la convention des autres sites d'Avignon (nom du réseau
   Docker externe, `certresolver`, entrypoint `websecure`) et calquer les labels. Paramétrer
   via `.env` (`TRAEFIK_NETWORK`, `CERT_RESOLVER`, `PUBLIC_HOST`, `ADMIN_HOST`).
3. **Domaine** : `noema.ch` (ou variante) géré par Val ; pointer le DNS vers Avignon le moment venu.

## Périmètre

- [ ] `git init` du repo (sur Tulear, en local) + remote `git@github.com:valery-blanc/NOEMA.git`
      (SSH) + `.gitignore` (node_modules, `.env`, build, uploads, `*.key`).
- [ ] Structure monorepo `apps/web` + `apps/cms` (+ gestion de paquets : pnpm workspaces).
- [ ] `apps/cms` : Payload v3 + adaptateur **Postgres** (`@payloadcms/db-postgres`), config
      minimale (Users + une collection `Pages` localisée + global `SiteSettings`), localisation
      `fr/es/en/de` (défaut `fr`), e-mail (SMTP) à brancher plus tard.
- [ ] `apps/web` : Astro + intégration i18n (`/fr /es /en /de`) + tokens CSS de base (palette,
      polices Cormorant/Inter) + une page d'accueil lisant l'API Payload.
- [ ] `docker-compose.yml` : `postgres` (volume) + `cms` + `web`, réseau Traefik externe,
      labels paramétrés. `docker-compose.dev.yml` (hot reload) pour Tulear.
- [ ] `.env.example` documenté (DB, `PAYLOAD_SECRET`, hosts, Traefik).
- [ ] Build + run sur Tulear → valider CMS `/admin`, API, page d'accueil.
- [ ] Demander test à Val → après OK, premier commit + push, puis déploiement Avignon.

## Hors périmètre (FEAT suivants)

Design system complet (FEAT-003), modèle de contenu complet + blocs (FEAT-004), pages
réelles + formulaire contact (FEAT-005), traductions ES/EN/DE + prépa arabe RTL (FEAT-006).

## Note de reprise (si nouvelle session)

Lire `MEMORY.md`, `docs/tasks/TASKS.md`, `docs/specs/noema-spec.md`. État : FEAT-001 validé
(stack + design « chaleur éditoriale » + i18n/RTL). Hôte = Avignon, dev = Tulear. Reprendre
au premier `[ ]` non coché de FEAT-002 ci-dessus.
