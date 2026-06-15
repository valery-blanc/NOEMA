# FEAT-003 — Pages affichées : navigation, routage, layout + seed multilingue

> Statut : **en cours** (Tulear → Avignon)
> Date : 2026-06-15
> Spec source de vérité : `docs/specs/noema-spec.md` (§4 nav, §7 modèle, §8 pages)
> Pré-requis : FEAT-002 (scaffold déployé).

## Objectif

Rendre le site **visible et navigable** : les 5 pages (Accueil, Philosophie, Services,
À propos, Contact) s'affichent avec une barre de navigation, un pied de page, et le design
system (palette/typo/filets laiton). Toutes les pages et tous les champs configurables sont
**pré-remplis d'un lorem ipsum préfixé par la langue** (`[FR]`, `[ES]`, `[EN]`, `[DE]`) pour
vérifier d'un coup d'œil le câblage CMS↔front et le changement de langue.

> Le **page-builder à blocs** complet (Hero, ServicesGrid, PullQuote, FounderSignature…)
> reste prévu pour **FEAT-004**. Ici : modèle de page simple (title, slug, excerpt, content
> richtext, showInNav, navOrder) suffisant pour afficher et démontrer la structure.

## Périmètre

- **CMS** : extension `Pages` (`showInNav`, `navOrder`). Migration Postgres dédiée.
  Script de **seed** (`apps/cms/src/seed.ts`) idempotent : `SiteSettings` + 5 pages,
  champs localisés remplis en fr/es/en/de (lorem labellisé).
- **Web (Astro)** :
  - `lib/payload.js` : `getNavPages`, `getPageBySlug`, `getSiteSettings`.
  - `lib/lexical.js` : sérialiseur minimal lexical → HTML (paragraphes, titres, listes, citations, liens).
  - `layouts/Base.astro` : header (wordmark + menu + sélecteur de langue, filet laiton) + footer.
  - `pages/[lang]/index.astro` : accueil (tagline + page de slug `accueil`).
  - `pages/[lang]/[slug].astro` : pages de menu (slug ≠ `accueil`).
- **Déploiement** : migration + seed + régénération SSG sur Avignon.

## URLs (clarification demandée par Val)

- **Accueil** = racine de langue : `/fr/`, `/es/`, `/en/`, `/de/` (pas de `/accueil/` séparé ;
  la page de slug `accueil` *remplit* la home).
- **Autres pages** : `/fr/philosophie/`, `/es/servicios/`… (slug **commun** à toutes les langues
  dans cette version ; slugs localisés = amélioration ultérieure).

## Règle à retenir

- Le **grand texte d'accroche** vient du global **SiteSettings.tagline** (≠ contenu de page).
- Une page n'apparaît dans le menu que si **`showInNav = true`**, triée par **`navOrder`**.
- Champs **localisés** : `title`, `excerpt`, `content`. Champs **communs** : `slug`,
  `showInNav`, `navOrder`. `contactEmail` (global) non localisé.
