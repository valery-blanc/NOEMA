# FEAT-011 — Titre de hero mis en forme (citation : italique + auteur) + retours à la ligne

> Statut : **implémenté — déploiement incrémental (sans reset)**
> Date : 2026-06-16
> Demande Val : pouvoir mettre en forme certains textes (italique, gras, plus petit, retour à
> la ligne) ; en particulier transformer le titre du hero en **citation** (italique) avec
> l'**auteur en plus petit**.

## Ce qui était déjà possible

Les blocs **richText** (bloc *Texte*, récit À propos, conviction Philosophie) ont un éditeur
visuel : **gras, italique, titres, listes, liens, retours à la ligne** (sérialisés en HTML).

## Ajout (bloc Hero)

- **Titre mis en forme** (`headingRich`, richText) : permet **italique / gras / retour à la
  ligne** dans le grand titre (ex. une citation). Prioritaire sur le « Titre simple » s'il est
  rempli. Rendu *inline* (les retours à la ligne deviennent des `<br>`).
- **Attribution** (`attribution`, texte) : ligne **plus petite** sous le titre (ex. l'auteur de
  la citation), en capitales espacées dorées.
- **Intro** : les **retours à la ligne** saisis sont désormais respectés (`white-space: pre-line`).

Appliqué au hero **home** (HeroMedia) et aux hero **de pages intérieures** (HeroText).

## Comment faire la citation (admin)

Accueil → bloc **Hero** :
1. Vider/ignorer « Titre simple », remplir **« Titre mis en forme »** avec la citation et
   passer le texte en **italique** (bouton *I* de l'éditeur).
2. Renseigner **« Attribution »** avec l'auteur (s'affiche plus petit dessous).
3. Save → Aperçu → Publier.

## Technique

- `lexicalToInlineHtml()` / `lexicalHasContent()` : rendu inline du richText (sans `<p>`).
- **Migration incrémentale** `20260616_120000_add_hero_rich` (ajout colonnes `heading_rich`
  jsonb + `attribution` varchar sur `pages_blocks_hero`) — **additive, sans perte** : déploiement
  `payload migrate` sans reset ni re-seed (préserve le contenu/les photos déjà saisis).
