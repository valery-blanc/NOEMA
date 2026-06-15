# BUG-001 — Build CMS : `public/` manquant + schéma Postgres absent en prod

> Statut : **FIXED** (FEAT-002)
> Date : 2026-06-15
> Découvert lors du build/run de validation sur Tulear (FEAT-002).

## Symptômes

1. **Build Docker du CMS échoue** :
   `COPY --from=builder /app/public ./public: "/app/public": not found`.
2. **API CMS en 500** après démarrage : l'appel
   `/api/globals/site-settings` renvoie `{"errors":[{"message":"Something went wrong."}]}`.
   Logs : `error: relation "site_settings" does not exist`.

## Cause racine

1. Le template Payload `blank` ne contient pas de dossier `public/`, mais le Dockerfile
   (issu du modèle Next « with-docker ») copie `/app/public` → échec.
2. L'adaptateur `@payloadcms/db-postgres` **ne fait du `push` automatique du schéma que si
   `NODE_ENV !== 'production'`**. L'image tournant en `NODE_ENV=production`, aucune table
   n'était créée. Le `push: true` de la config est ignoré en production *par design*.

## Fix appliqué

1. Création de `apps/cms/public/.gitkeep` pour garantir l'existence du dossier au build.
2. Passage à un schéma **géré par migrations versionnées** (pattern de prod Payload) :
   - Migration initiale générée (`payload migrate:create initial`) →
     `apps/cms/src/migrations/`.
   - Nouveau service Docker `cms-migrate` (image cible `builder`) qui exécute
     `pnpm payload migrate` **avant** le démarrage du CMS
     (`cms` `depends_on: cms-migrate: service_completed_successfully`).
   - `push` reste actif uniquement en dev local (`pnpm cms:dev`).

## Règle à retenir (reportée dans `noema-spec.md` §9.2)

> Postgres + Payload en production : **toujours des migrations** (`payload migrate` au boot,
> via le service `cms-migrate`). Le `push` auto n'existe qu'en dev. Toute évolution de modèle
> de contenu ⇒ régénérer une migration (`payload migrate:create`) et la committer.
