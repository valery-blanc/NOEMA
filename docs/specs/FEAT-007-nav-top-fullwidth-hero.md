# FEAT-007 — Navigation supérieure (style meghanmaven) + pleine largeur + hero image

> Statut : **implémenté (Tulear), en cours de déploiement Avignon**
> Date : 2026-06-15
> Demande Val : repartir d'une navigation type https://meghanmaven.com — menu en haut,
> **petit tiret barrant les dernières lettres** du menu sélectionné, **sous-menus déroulants**,
> site **pleine largeur** (cf. meghanmaven / tiffany.fr), **image hero** de home dont le haut
> est flouté/fondu vers le beige (#F6F2EA) pour que le menu se pose sur fond clair.

## Ce qui change (remplace le « rail-index » de FEAT-004)

- **Navigation supérieure** horizontale, pleine largeur, **sticky** : transparente au-dessus du
  hero sur la home, devient surface beige opaque (+ filet laiton) au scroll. Capitales espacées.
- **Tiret « dernières lettres »** : sur l'item actif/survolé, un court trait (1px) barre la fin
  du mot (pseudo-élément `.txt::after`, en propriété logique → RTL-safe).
- **Sous-menus déroulants** (style meghanmaven) : panneau sous l'item au survol **et au clavier**
  (`:focus-within`). Démo (faux) branchée sur **Services** (3 piliers) — `SUBNAV` dans
  `Base.astro`, à remplacer par un vrai champ CMS `navChildren` ultérieurement.
- **Pleine largeur** : suppression du conteneur centré `--w-content`. En-tête, sections, footer
  occupent toute la largeur avec respiration `--pad-x`. Les paragraphes gardent une mesure de
  lecture (`--w-prose`) pour la lisibilité.
- **Hero image home** : `apps/web/public/literature_cafe.jpg`, pleine largeur, **haut flouté**
  (couche `backdrop-filter: blur` masquée en dégradé) **+ fondu beige** (dégradé `--c-ivory` →
  transparent) → le menu se pose sur fond clair. Le 1er bloc `hero` de la page passe en
  sur-impression de l'image (sinon `siteName` + `tagline`).
- **Conservé de FEAT-004** : affichage de page « marginalia + folios », apparition au scroll,
  page-builder à blocs, off-canvas mobile (le menu top devient plein écran).
- **Retiré** : le rail vertical et le sommaire latéral (liés au rail).

## Fichiers

- `apps/web/src/layouts/Base.astro` — en-tête top, sous-menus, tiret, pleine largeur, sticky.
- `apps/web/src/blocks/HeroMedia.astro` — hero image (flou + fondu beige).
- `apps/web/src/pages/[lang]/index.astro` — home : HeroMedia + blocs.
- `apps/web/src/styles/tokens.css` — `--header-h`, `--pad-x` (structure ; charte inchangée).
- `apps/web/public/literature_cafe.jpg` — image hero.

## À brancher plus tard

- Vrais sous-menus depuis le CMS (champ `navChildren` sur Pages) au lieu du `SUBNAV` de démo.
- Charte définitive (Claude Design) via `tokens.css`. Image hero éditable depuis le CMS.
