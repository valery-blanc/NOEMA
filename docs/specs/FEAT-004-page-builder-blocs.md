# FEAT-004 — Page-builder à blocs + navigation/affichage originaux

> Statut : **déployé sur Avignon — en attente de validation Val**
> Live : https://noema.zitoon.com (public) · https://noema-preview.zitoon.com (aperçu)
> Date : 2026-06-15
> Spec source de vérité : `docs/specs/noema-spec.md` (§4 nav, §5 design, §7 modèle, §8 pages)
> Cadrage Val : ne pas investir la charte (couleurs/polices — faites en // avec Claude Design)
> ni le contenu réel (lorem). **Chercher une originalité de navigation et d'affichage de page.**

## Ce qui est livré

### Modèle (Payload) — page-builder à blocs
Champ `layout` (type `blocks`, **localisé** → un jeu de blocs par langue) sur la collection
`Pages`. Blocs (`apps/cms/src/blocks/`) :
- **hero** : sur-titre, titre, intro.
- **prose** : titre de section (optionnel), corps richText, **note de marge** (marginalia).
- **pullquote** : citation + attribution.
- **indexList** : titre + entrées (label + texte) — piliers / index.
- **signature** : titre, nom, rôle, bio, portrait (upload, emplacement réservé).
- **cta** : titre, texte, libellé + lien de bouton (bande pétrole — accent rare).

`excerpt`/`content` conservés comme repli (pages sans blocs).

### Front (Astro) — parti pris original
- **Navigation = « rail-index »** : colonne verticale fixe façon catalogue de bibliothèque —
  entrées **numérotées (folios `01 — Philosophie`)**, filet laiton, sélecteur de langue intégré
  en bas. Remplace la barre horizontale. Mobile : off-canvas plein écran (burger + scrim).
- **Affichage de page = « marginalia + folios »** : chaque section est une grille
  `[folio | colonne de lecture | note de marge]`. Le numéro de folio vit dans la marge, les
  notes (`prose.note`) en marginalia à côté du texte.
- **Sommaire vivant** : les sections (blocs avec `sectionTitle`) alimentent un sommaire dans le
  rail, **surligné au scroll** (IntersectionObserver scroll-spy).
- **Apparition au scroll** : fondu/translation douce des blocs, **désactivée** si
  `prefers-reduced-motion` (et toujours visible sans JS — opt-in via classe `.reveal-ready`).
- **RTL-first** : tout en propriétés logiques ; un seul override `[dir=rtl]` pour l'off-canvas.

Charte (couleurs/polices) inchangée : variables dans `apps/web/src/styles/tokens.css`, prêtes
à être remplacées par la sortie de Claude Design sans toucher à la structure.

## Décisions techniques

- `layout` **localisé** (un jeu de blocs par langue) plutôt que blocs communs + champs
  localisés : plus simple pour le seed/démo et flexible (structure libre par langue).
- **Migrations repartie à zéro** : aucune donnée réelle (lorem) → schéma régénéré en une seule
  migration `initial` contre une base vide (évite les prompts interactifs de renommage de
  drizzle). DB dev + Avignon réinitialisées puis re-seedées.
- Le `seed.ts` type le `layout` en `any[]` (littéraux de blocs ≠ union stricte générée ;
  script exécuté par tsx).

## Reste pour plus tard

- Charte définitive (Claude Design) → remplacer `tokens.css`.
- Contenu réel (remplacer le lorem dans l'admin).
- SEO par bloc/page, slugs localisés, brouillons/versions, formulaire de contact (FEAT-006+).
