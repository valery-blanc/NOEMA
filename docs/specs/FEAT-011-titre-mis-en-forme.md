# FEAT-011 — Titre de hero mis en forme (citation : italique + auteur) + retours à la ligne

> Statut : **implémenté — déploiement incrémental (sans reset)**
> Date : 2026-06-16
> Demande Val : pouvoir mettre en forme certains textes (italique, gras, plus petit, retour à
> la ligne) ; en particulier transformer le titre du hero en **citation** (italique) avec
> l'**auteur en plus petit**.

## Ce qui était déjà possible

Les blocs **richText** (bloc *Texte*, récit À propos, conviction Philosophie) ont un éditeur
visuel : **gras, italique, titres, listes, liens, retours à la ligne** (sérialisés en HTML).

## Approche retenue : petits tags dans le texte (pas de richText)

L'éditeur richText cassait le style (caractères noirs, toolbar) et le grand titre était trop
gros pour une citation. → On garde un **champ texte simple** pour le titre/intro, qui accepte
un **petit jeu de tags** rendus avec le bon style :

- `<i>…</i>` (ou `<em>`) → italique
- `<b>…</b>` (ou `<strong>`) → gras
- `<small>…</small>` → **plus petit, même police serif, blanc, juste en dessous** (ligne auteur)
- `<br/>` → saut de ligne

Tout autre tag est **échappé** (allowlist sûre, `lib/inline.js`). Appliqué au hero **home**
(HeroMedia) et **pages intérieures** (HeroText), sur `heading` et `intro`.

Taille du titre **réduite** (clamp ~32→60px home, mesure élargie à ~24ch) pour qu'une citation
tienne élégamment.

## Comment faire la citation (admin)

Accueil → bloc **Hero** → champ **Titre** :
```
<i>« J'ai toujours imaginé le paradis comme une sorte de bibliothèque »</i><br/><small>Jorge Luis Borges</small>
```
Save → Aperçu → Publier.

## Technique

- `lib/inline.js` : `inlineTags()` — échappe puis restaure l'allowlist `i/em/b/strong/small/u/br`.
- Migrations incrémentales (sans reset) : `…120000_add_hero_rich` (colonnes ajoutées) puis
  `…130000_drop_hero_rich` (retirées, vides) — le richText est abandonné. Contenu/photos préservés.
