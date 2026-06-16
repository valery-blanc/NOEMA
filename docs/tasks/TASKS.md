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

### FEAT-005 — Boutons Aperçu / Publier + site d'aperçu protégé
- [x] Désactiver le verrouillage de documents (`lockDocuments:false`) → « Edit » bloqué supprimé
- [x] Endpoints CMS `/api/preview` & `/api/publish` (réservés admin) + helper triggerBuild
- [x] Boutons admin `AdminActions.tsx` + régénération importMap
- [x] Service `publisher` (build à la demande, 2 cibles) + service `preview` (nginx) + volume web_preview
- [x] Traefik : basic-auth + noindex sur l'aperçu ; `.env(.example)` (PREVIEW_*, PUBLISH_TOKEN)
- [x] Build/run Tulear OK : public 8080 + preview 8081 servis, triggers token/session 403 vérifiés
- [x] Mot de passe aperçu (Val) → hash htpasswd dans `.env` Avignon (jamais commité)
- [x] Déploiement Avignon OK : public 200, admin 200, aperçu 401 sans auth / 200 avec, X-Robots-Tag noindex, TLS LE émis
- [x] **Validé par Val (2026-06-15)** : boutons Aperçu/Publier OK, accès aperçu protégé OK

### FEAT-004 — Page-builder à blocs + nav/affichage originaux
- [x] Blocs Payload (hero, prose+note, pullquote, indexList, signature, cta) ; `layout` localisé
- [x] Migration repartie propre (DB sans données réelles) + types + importmap
- [x] Front : nav « rail-index » (folios) + affichage « marginalia/folios » + sommaire vivant (scroll-spy) + reveal (reduced-motion safe)
- [x] Seed blocs labellisés [FR]/[ES]/[EN]/[DE] (mélanges variés par page)
- [x] Build/run Tulear OK : 20 pages, blocs rendus, i18n + sommaire vérifiés
- [x] Déploiement Avignon (reset DB lorem + migrate + seed + régénération) — OK, 20 pages 200, blocs/nav/sommaire live (seed rejoué après course migration → BUG-003)
- [~] Test/validation Val (nav rail-index, sommaire, blocs, switch langue) → en attente

### FEAT-007 — Nav supérieure (meghanmaven) + pleine largeur + hero image
- [x] Barre supérieure sticky (transparente sur hero → beige au scroll), pleine largeur
- [x] Tiret barrant les dernières lettres de l'item actif/survolé
- [x] Sous-menus déroulants (survol + clavier) — démo sur Services
- [x] Hero image home `literature_cafe.jpg` (haut flouté + fondu beige #F6F2EA)
- [x] Build/run Tulear OK : nav, sous-menu, hero, pleine largeur, 20 pages 200
- [~] Déploiement Avignon (pull + rebuild publisher + régénération) → en cours
- [ ] Demander test à Val (nav top, tiret, sous-menu, hero, pleine largeur)

### FEAT-008 — Intégration design Claude Design + i18n 4 langues
- [x] Tokens charte (palette crème/pétrole/or, 4 polices) depuis Noema-site.dc.html
- [x] Base.astro : header fixe + strike animé + méga-menu Services (CMS) + footer ; langues ES·EN·FR·DE
- [x] Blocs hero/values/services/gallery/founder (+ prose/pullquote/cta) mappés sur le design
- [x] Seed contenu d'exemple FR (design) traduit ES/EN/DE ; SiteSettings (tagline/domain/location)
- [x] DB reset + migration `initial` + types/importmap
- [x] Build/run Tulear OK : design rendu fidèle, méga-menu, i18n, 20 pages 200
- [x] Déploiement Avignon (reset DB + migrate + seed + régénération) — OK, design live, FR/ES/EN/DE, 20 pages 200
- [~] Test/validation Val (rendu, méga-menu, strike, hero, 4 langues) → en attente

### FEAT-009 — Pages intérieures Philosophie/Services/À propos/Contact + i18n
- [x] Lire le 2ᵉ handoff Claude Design (4 pages) ; nouveaux blocs (statement, manifesto, serviceDetail, steps, milestones, story, contactForm)
- [x] Hero enrichi (variant crème/pétrole/media + portrait) ; pullquote/cta variant
- [x] Seed des 4 pages, contenu d'exemple FR traduit ES/EN/DE
- [x] Formulaire contact (mailto, site statique) piloté CMS
- [x] DB reset + migration + types/importmap + build/run Tulear : 20 pages 200, rendu fidèle, i18n OK
- [~] Déploiement Avignon (reset DB + migrate + seed + régénération) → en cours
- [ ] Demander test à Val (les 4 pages, 4 langues, formulaire)

## Backlog (FEAT suivants)
- [ ] Envoi e-mail serveur du formulaire (endpoint Payload + SMTP) au lieu du mailto
- [ ] Contenu réel (remplacer l'exemple) + vraies photos + SEO
- [ ] Sous-menus/nav pilotés depuis le CMS de façon générique (au-delà de Services)
- [ ] FEAT-004 — Modèle Payload (collections/globals/blocs) + seed contenu FR
- [ ] FEAT-005 — Pages (Accueil, Philosophie, Services, À propos, Contact) + formulaire contact
- [ ] FEAT-006 — Traductions ES/EN/DE + préparation locale arabe (RTL)

## Done
