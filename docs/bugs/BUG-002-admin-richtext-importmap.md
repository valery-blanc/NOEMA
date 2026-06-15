# BUG-002 — Champ richText (Content) vide / formulaire bloqué dans l'admin

> Statut : **FIXED** (FEAT-003)
> Date : 2026-06-15
> Découvert au test Val sur Avignon : page `accueil` (id 2), champ Content n'affiche
> aucun paragraphe, bouton d'édition bloqué, pas de bouton d'enregistrement utilisable.

## Symptôme

Dans l'admin, le champ **Content** (richText Lexical) ne se rend pas : aucun paragraphe
visible alors que le front affiche bien le contenu ; le formulaire d'édition est inutilisable.
Logs CMS : références répétées à `@payloadcms/richtext-lexical/rsc#RscEntryLexicalField`.

## Cause racine

Le fichier généré **`apps/cms/src/app/(payload)/admin/importMap.js`** (carte des composants
React de l'admin) était resté celui du template *blank* : il ne contenait que `CollectionCards`,
**pas** les composants de l'éditeur Lexical. Or l'admin résout les composants de champs via cet
import map. Sans l'entrée `RscEntryLexicalField`, le champ richText ne peut pas s'afficher →
champ vide + formulaire cassé. `next build` **ne régénère pas** l'import map automatiquement.

(À noter : le contenu stocké en base était parfaitement valide — seul l'admin était impacté.
Le « pas de bouton Publier » est normal : la collection `Pages` n'a pas de drafts/versions
activés, il y a donc un bouton **Save**, pas **Publish**.)

## Fix appliqué

- `pnpm --filter @noema/cms exec payload generate:importmap` → l'import map inclut désormais
  tous les composants Lexical (RSC + client features). Fichier commité.
- Rebuild de l'image CMS + redéploiement Avignon.

## Règle à retenir (workflow CMS)

> **Toute modification du modèle Payload** (collections, globals, champs, features d'éditeur)
> nécessite de régénérer, committer, puis rebuild :
> 1. `payload generate:types`      → `payload-types.ts`
> 2. `payload generate:importmap`  → `admin/importMap.js`
> 3. `payload migrate:create <nom>` → migration Postgres (schéma)
>
> Oublier (2) casse l'admin sans casser le front ni la base. Reporté dans `noema-spec.md` §9.2.
