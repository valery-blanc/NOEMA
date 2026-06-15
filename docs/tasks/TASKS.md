# TASKS

## In Progress

### FEAT-001 — Fondations (architecture, nav, design system, i18n)
- [x] Lire la pré-spec fondatrice
- [x] Décider l'approche (front sur-mesure + CMS headless auto-hébergeable)
- [x] Choisir la stack (Astro + Payload + Postgres, Docker, Avignon)
- [x] Fixer les langues + contrainte RTL (FR/ES/EN/DE → arabe)
- [x] Rédiger la spec source de vérité `docs/specs/noema-spec.md`
- [x] Rédiger `docs/specs/FEAT-001-foundation-architecture.md`
- [x] Définir le design system (palette, typo, rythme)
- [x] Définir l'architecture / structure projet
- [x] Définir le modèle de contenu Payload
- [x] Consulter les sites de référence (asever.com, meghanmaven.com)
- [x] Présenter maquettes (wireframes) à Val + valider la direction visuelle (registre « chaleur éditoriale »)

## In Progress

### FEAT-002 — Scaffold monorepo (à faire **depuis Tulear**)
> ⚠️ Reprise : travailler sur **Tulear** (`C:\WORK\NOEMA`, Docker + clés SSH). Bruxelles ne peut pas builder/déployer. Hôte prod = Avignon.
- [x] Décider hôte (Avignon) + poste dev (Tulear)
- [x] Rédiger `docs/specs/FEAT-002-scaffold-monorepo.md`
- [x] `git init` (branche `main`) + `.gitignore` (remote/push → après OK Val)
- [x] Structure monorepo `apps/web` (Astro) + `apps/cms` (Payload) — pnpm workspaces
- [x] `apps/cms` : Payload v3.85.1 + Postgres + collection `Pages` + global `SiteSettings` + locales fr/es/en/de (défaut fr)
- [x] `apps/web` : Astro 6 SSG + i18n (/fr /es /en /de) + tokens CSS (palette/polices spec §5) + accueil branché sur Payload
- [x] `docker-compose.yml` (+ `.dev.yml`) + `.env.example` + labels Traefik (réseau `web`, `websecure`, `letsencrypt` — convention Avignon relevée)
- [x] Build + run sur Tulear (valider /admin, API, accueil) — **OK** : `/admin` 200, API globals/pages OK, accueil `/fr/` « Chaîne CMS → API → front : OK »
- [x] Migrations Postgres (service `cms-migrate`) + fix `public/` → voir BUG-001
- [x] 1er commit + remote `git@github.com:valery-blanc/NOEMA.git` + push `main`
- [x] **Déploiement Avignon** (`~/NOEMA`, `docker compose up -d --build`) — OK : conteneurs sains, migration appliquée, SSG généré
  - Public : **https://noema.zitoon.com** (TLS Let's Encrypt OK, HTTP 200)
  - Admin : **https://noema-admin.zitoon.com/admin** (TLS OK, HTTP 200)
  - Domaine définitif `noema-library.ch` à acheter plus tard.
- [~] Test/validation Val sur Avignon → créer le 1er compte admin, saisir SiteSettings + page `accueil`

> **Décisions actées** (FEAT-002) :
> - Rendu Astro = **SSG statique** servi par nginx (cf. infra.md, RAM Avignon 8 Go). Build « one-shot » au `up` (service `web-build` attend le CMS, génère dans le volume `web_dist`).
> - Traefik Avignon : réseau externe **`web`**, entrypoint **`websecure`**, certresolver **`letsencrypt`** (paramétré via `.env`).
> - Versions épinglées : Payload **3.85.1**, Next **16.2.6**, Astro **6.4.7**, Postgres **16-alpine**.

### FEAT-003 — Pages affichées : nav, routage, layout + seed multilingue
- [x] Étendre `Pages` (`showInNav`, `navOrder`) + migration Postgres (`add_nav_fields`) + régénérer `payload-types.ts`
- [x] Seed `apps/cms/src/seed.ts` (SiteSettings + 5 pages, lorem labellisé fr/es/en/de)
- [x] Web : `lib/payload` (nav/page), `lib/lexical` (richtext→HTML)
- [x] Web : `Base.astro` header/footer + design system, `[lang]/index`, `[lang]/[slug]`
- [x] Build/run Tulear OK : 21 pages, nav + switch de langue vérifiés ([FR]/[ES]/[EN]/[DE])
- [x] Déploiement Avignon : migrate (`add_nav_fields`) + seed + régénération SSG — OK, 20 pages (4 langues × 5) en HTTP 200
- [~] Test/validation Val sur Avignon (toutes les pages, switch de langue) → en attente

## Backlog (FEAT suivants)
- [ ] FEAT-004 — Page-builder à blocs (Hero, ServicesGrid, PullQuote, FounderSignature…) + SEO
- [ ] FEAT-004 — Modèle Payload (collections/globals/blocs) + seed contenu FR
- [ ] FEAT-005 — Pages (Accueil, Philosophie, Services, À propos, Contact) + formulaire contact
- [ ] FEAT-006 — Traductions ES/EN/DE + préparation locale arabe (RTL)

## Done
