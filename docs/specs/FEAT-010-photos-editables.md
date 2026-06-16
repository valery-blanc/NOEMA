# FEAT-010 — Photos éditables depuis l'admin (médias persistés + servis sur le statique)

> Statut : **déployé sur Avignon — pipeline vérifié de bout en bout**
> Date : 2026-06-16

## Objectif

Permettre à la fondatrice de changer les photos (fond de la home, portraits, réalisations)
depuis l'admin, sans toucher au code.

## Où, dans l'admin

Bibliothèque **Media** (téléverser les images), puis dans le champ du bloc concerné :
- **Fond de la home** : page Accueil → bloc **Hero** → champ **image** (variante « media »).
- **Portrait fondatrice (home)** : bloc **Fondatrice** → champ **portrait**.
- **Portrait À propos** : page À propos → bloc **Hero** → champ **portrait**.
- **Réalisations** : bloc **Réalisations** → chaque item → champ **image**.
Puis **Aperçu** → **Publier**.

## Plomberie (SSG)

- **Persistance** : `Media.upload.staticDir = /app/media`, monté sur le volume **`media_data`**
  (cms en écriture). Le dossier `/app/media` est créé et **possédé par `nextjs` (uid 1001)**
  dans le Dockerfile → le volume hérite des droits (cf. BUG-005).
- **Service sur le site statique** : `media_data` est monté **en lecture seule** dans le
  `publisher` à `/app/public/media`. `astro build` copie `public/` → `dist/`, donc les médias
  arrivent dans `dist/media/` → `web_dist` → servis par nginx à **`/media/<filename>`**.
- **Front** : helper `mediaUrl(upload)` → `/media/<filename>` (repli sur champ texte `imageUrl`
  / `portraitUrl`, ex. `/literature_cafe.jpg`). Utilisé par home hero, portraits, galerie.

## Vérification

Pipeline testé de bout en bout sur Avignon : écriture CMS (nextjs) → rebuild → fichier servi
à `https://noema.zitoon.com/media/…` (HTTP 200). Fichier de test retiré ensuite.

## Limites / à suivre

- `serviceDetail` (pages Services) utilise pour l'instant un champ `imageUrl` texte (pas encore
  d'upload Media) — à ajouter si besoin.
- Formats responsive (plusieurs tailles générées par Payload) non activés — possible évolution.
