# BUG-005 — Uploads CMS impossibles : volume média possédé par root

> Statut : **FIXED** (FEAT-010)
> Date : 2026-06-16
> Découvert au test du pipeline média (FEAT-010).

## Symptôme

Écriture dans `/app/media` (uploads Payload) → `sh: can't create … : Permission denied`.

## Cause

Le conteneur `cms` tourne en utilisateur **`nextjs` (uid 1001)** (Dockerfile). Le volume nommé
`media_data` monté sur `/app/media` était créé **possédé par root** → l'utilisateur `nextjs`
ne pouvait pas y écrire. Tout upload depuis l'admin aurait échoué.

## Fix

1. **Dockerfile cms** : créer `/app/media` possédé par `nextjs:nodejs` **avant** le montage
   (`RUN mkdir .next media && chown nextjs:nodejs .next media`) → un volume *vide* hérite de ces
   droits à la première création.
2. **Volume existant** (déjà créé root) : `chown` ponctuel —
   `docker run --rm -v noema_media_data:/m alpine chown -R 1001:1001 /m`.

## Règle à retenir

> Tout volume écrit par un conteneur tournant en utilisateur non-root doit avoir le bon
> propriétaire (uid du process). Créer + `chown` le dossier dans l'image avant le montage,
> ou `chown` le volume existant.
