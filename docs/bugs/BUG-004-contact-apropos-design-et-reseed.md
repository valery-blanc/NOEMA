# BUG-004 — Contact/À propos pas au nouveau design + seed servi par l'ancienne image

> Statut : **FIXED** (FEAT-009)
> Date : 2026-06-16
> Signalé par Val : pages À propos et Contact « encore l'ancien design » (Contact
> devrait être bleu pétrole).

## Symptômes

1. **Contact** rendu en crème avec champs encadrés blancs, au lieu du **fond pétrole**
   plein écran à champs soulignés transparents + bouton or (design Claude Design).
2. **À propos** : hero en crème au lieu de **pétrole** (portrait à droite sur fond pétrole).

## Causes

1. **Erreur de design** à l'implémentation initiale : `ContactForm.astro` construit en crème ;
   hero À propos seedé en `variant: cream`. (Le design réel : Contact `background #133A42`
   plein écran ; A-propos hero `#133A42`.)
2. **Re-seed inopérant** au 1er correctif : le seed s'exécute via l'image **`cms-migrate`**
   (qui *bake* `src/seed.ts`). N'avoir rebuild que `publisher` ⇒ le seed a tourné avec
   l'ancien `seed.ts` → `variant` resté `cream` en base.

## Fix appliqué

- `ContactForm.astro` réécrit : section pétrole pleine hauteur, champs soulignés transparents
  (texte crème), bouton or, coordonnées à filet (`border-inline-start`).
- `HeroText.astro` : emplacement portrait en variante pétrole (hachuré sombre).
- `Story.astro` : mise en page 2 colonnes (sur-titre | récit).
- `seed.ts` : hero À propos `variant: 'petrol'`.
- **Déploiement** : rebuild **`cms-migrate` ET `publisher`** → re-seed → régénération.

## Règle à retenir

> Toute modification de **`seed.ts`** (ou de tout fichier `apps/cms/src/`) impose de
> **rebuild l'image `cms-migrate`** avant de relancer `pnpm seed` — sinon le seed s'exécute
> avec l'ancien code. De même, un changement Astro impose de rebuild `publisher`.
> Sur un correctif touchant CMS **et** front : `docker compose build cms-migrate publisher`.
