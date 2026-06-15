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
- [~] Demander test à Val → **en attente de validation** ; après OK : remote + 1er commit + push + déploiement Avignon

> **Décisions actées** (FEAT-002) :
> - Rendu Astro = **SSG statique** servi par nginx (cf. infra.md, RAM Avignon 8 Go). Build « one-shot » au `up` (service `web-build` attend le CMS, génère dans le volume `web_dist`).
> - Traefik Avignon : réseau externe **`web`**, entrypoint **`websecure`**, certresolver **`letsencrypt`** (paramétré via `.env`).
> - Versions épinglées : Payload **3.85.1**, Next **16.2.6**, Astro **6.4.7**, Postgres **16-alpine**.

## Backlog (FEAT suivants)
- [ ] FEAT-003 — Design system implémenté (tokens, polices, layout, RTL) + composants/blocs
- [ ] FEAT-004 — Modèle Payload (collections/globals/blocs) + seed contenu FR
- [ ] FEAT-005 — Pages (Accueil, Philosophie, Services, À propos, Contact) + formulaire contact
- [ ] FEAT-006 — Traductions ES/EN/DE + préparation locale arabe (RTL)

## Done
