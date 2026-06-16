# FEAT-008 — Intégration du design Claude Design (Noema-site.dc.html) + i18n 4 langues

> Statut : **déployé sur Avignon — en attente de validation Val**
> Live : https://noema.zitoon.com (FR/ES/EN/DE) · aperçu https://noema-preview.zitoon.com
> Date : 2026-06-16
> Demande Val : reprendre le design produit dans Claude Design (`Noema-site.dc.html`),
> le câbler au CMS, garder le contenu d'exemple (pas de contenu définitif), traduire en 4 langues.
> Handoff : `/.design-handoff/` (gitignoré) — bundle Claude Design (chat + projet + assets).

## Ce qui est livré

### Charte (remplace les tokens provisoires)
`apps/web/src/styles/tokens.css` aligné sur le design : palette crème/pétrole/or
(`#FBF9F3`, `#133A42`, `#0F2D34`, `#C9A86A`…), 4 polices Google
(**Cormorant Garamond**, **Hanken Grotesk**, **IBM Plex Mono**, **Pinyon Script**),
échelle typo, conteneur 1360px pleine largeur.

### En-tête / pied de page (Base.astro)
- Header **fixe pleine largeur**, dégradé pétrole + blur, **se solidifie** après le hero.
- **Strike animé** (tiret or qui barre, origine droite→gauche) sur l'item actif/survolé.
- **Méga-menu Services** pleine largeur (3 métiers numérotés + carte « Le lieu »),
  **piloté par le CMS** (items du 1er bloc `services` de la page services).
- Sélecteur de langues **ES · EN · FR · DE** (ordre charte). Mobile : panneau plein écran.
- Footer 3 colonnes (marque + baseline, liens, contact/domaine/langues), CMS.

### Blocs (page-builder, mappés sur les sections du design)
`hero` (HeroMedia plein écran sur la home / HeroText sur pages internes) · `values`
(philosophie : intro + lignes terme/légende) · `services` (bande pétrole 3 colonnes) ·
`gallery` (réalisations : image réelle ou emplacement hachuré, `imageUrl` ou upload Media) ·
`founder` (portrait + citation + signature script) · `prose` · `pullquote` · `cta`.

### Contenu & i18n
`seed.ts` reprend **le texte exact du design (FR)** et le **traduit en ES/EN/DE** (hero,
philosophie, 3 services, réalisations, fondatrice, contact, footer). 5 pages × 4 langues.
SiteSettings étendu : `tagline`, `domain`, `location` (+ `contactEmail`).

## Décisions / notes

- L'image `literature_cafe.jpg` (= `cafe-bibliotheque.jpg` du bundle) sert hero + méga-menu
  + 1re réalisation, via `/literature_cafe.jpg` (public) ou champ `imageUrl` du bloc gallery.
- Le custom-cursor « voir » du prototype n'est pas repris (gadget ; à rediscuter si souhaité).
- DB réinitialisée (contenu d'exemple uniquement) → migration `initial` unique régénérée.
- Charte = désormais **définitive** (issue de Claude Design) ; le contenu reste éditable au CMS.

## Remplace / clôt

Remplace FEAT-004 (rail-index) et FEAT-007 (nav top maison) — le design Claude Design fait foi.
