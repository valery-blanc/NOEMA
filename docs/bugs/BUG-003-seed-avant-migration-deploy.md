# BUG-003 — Seed lancé avant la fin de la migration (déploiement)

> Statut : **FIXED / contourné** (FEAT-004)
> Date : 2026-06-15
> Découvert au déploiement Avignon de FEAT-004.

## Symptôme

Au premier passage du script de déploiement, le `seed` a échoué :
`DrizzleQueryError: Failed query: select … from "site_settings" … relation … does not exist`.

## Cause racine

Course (race condition) dans le script de déploiement : le `docker compose run --rm
cms-migrate … pnpm seed` a démarré pendant que le service `cms-migrate` de la stack
(lancé par `up -d --build`) n'avait pas encore fini d'appliquer la migration `initial`.
Les tables n'existaient donc pas au moment du seed. (Vérifié ensuite : 18 tables présentes,
`payload_migrations` = `initial` → migration bien appliquée ; re-seed OK.)

## Fix / contournement

- Re-lancer le `seed` **après** confirmation que la migration est terminée, puis
  `docker compose up -d --force-recreate publisher` pour régénérer le statique.
- Règle pour les prochains déploiements impliquant un reset DB : **attendre explicitement**
  la fin de `cms-migrate` (état `Exited (0)`) avant de seeder, plutôt qu'un simple `sleep`.

## À retenir

- Sur un déploiement avec reset de schéma : `migrate` (attendre la fin) → `seed` →
  régénération du front (`publisher`). Ne pas paralléliser migrate et seed.
- Aucune perte : données de démonstration (lorem) uniquement.
