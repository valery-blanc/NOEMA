# FEAT-012 — Redirection racine selon la langue du navigateur (serveur)

> Statut : **déployé sur Avignon — OK**
> Date : 2026-06-16
> Demande Val : `https://noema.zitoon.com/` affichait une page blanche (meta-refresh JS vers
> /fr). Faire une redirection **serveur** (invisible) et, si possible, **selon la langue du
> navigateur** (ES/EN/FR/DE ; défaut **EN** pour toute autre langue).

## Solution

Pourquoi pas Traefik : ses middlewares redirigent sur l'**URL**, pas sur les **en-têtes** — il
ne peut pas brancher sur `Accept-Language`. La redirection est donc faite par **nginx** (le
serveur derrière Traefik), ce qui donne le même résultat (302 serveur, sans page blanche).

`apps/web/nginx.conf` :
- `map $http_accept_language $noema_lang` → `es|en|fr|de`, **défaut `en`** (préfixe de langue).
- `map $http_x_forwarded_proto $noema_scheme` → force **https** (Traefik termine le TLS et
  transmet en http ; sans ça, la redirection repartait en http → hop inutile).
- `location = /` → `return 302 $noema_scheme://$host/$noema_lang/;` + `Vary: Accept-Language`.

## Vérifié

`/` avec `Accept-Language` : fr→/fr/, es→/es/, en→/en/, de→/de/, autre (it/ja…)→/en/.
Location en **https** direct, 302, sans page blanche.

## Déploiement

`nginx.conf` est un fichier **bind-mounté** (web + preview) → `git pull` + `docker compose
restart web preview` (pas de rebuild). S'applique aussi au site d'aperçu.
