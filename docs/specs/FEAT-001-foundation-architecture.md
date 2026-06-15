# FEAT-001 — Fondations : architecture, navigation, design system, i18n

> Statut : **conception validée** (implémentation à venir)
> Date : 2026-06-15
> Spec source de vérité : `docs/specs/noema-spec.md`

## Contexte

Création du site vitrine **NOÊMA** (maison intellectuelle : bibliothèques privées, espaces
culturels, collections patrimoniales). Brief fondatrice : `docs/specs/Noema_website_pre-spec.txt`.
Besoin clé : une éditrice **non technique** doit pouvoir créer/modifier pages et contenus.

## Décisions (validées avec Val, 2026-06-15)

1. **Approche** : front-end sur-mesure + CMS headless auto-hébergeable (pas de builder SaaS, pas de CMS from-scratch).
2. **Stack** : **Astro + Payload CMS + Postgres**, tout en **Docker**, auto-hébergé sur **Avignon**, portable VPS.
3. **Sanity écarté** : non auto-hébergeable, incompatible avec « tout dockerisé chez soi ».
4. **Langues** : **FR/ES/EN/DE** au lancement ; architecture i18n scalable à un grand nombre
   de langues **dont l'arabe (RTL)** dès la conception.
5. **Hébergement** : Avignon maintenant, migration VPS plus tard (stack portable).

## Périmètre de ce FEAT

Définir et figer (documentation + maquettes), **sans coder encore l'app** :
- Architecture technique et structure du projet.
- Structure du site et navigation.
- Design system : palette, typographie, rythme/espacement, composants de base.
- Stratégie i18n + RTL.
- Modèle de contenu Payload (collections, globals, blocs).

Tout est consigné dans `docs/specs/noema-spec.md` (§2 à §10).

## Hors périmètre (FEAT suivants)

- **FEAT-002** : scaffold du monorepo (apps/web Astro + apps/cms Payload), Docker Compose, Postgres, intégration Traefik.
- **FEAT-003** : implémentation du design system (tokens CSS, polices, layout, RTL) + composants/blocs.
- **FEAT-004** : modèle Payload (collections/globals/blocs) + seed de contenu FR.
- **FEAT-005** : pages (Accueil, Philosophie, Services, À propos, Contact) + formulaire de contact.
- **FEAT-006** : traductions ES/EN/DE ; préparation locale arabe (RTL) en validation.

## Impact

Projet neuf : aucun code existant impacté. Pose les fondations structurantes (notamment
RTL-first et i18n scalable) qui contraignent tout le développement ultérieur.
