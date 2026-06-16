# FEAT-009 — Pages intérieures (Philosophie, Services, À propos, Contact) + i18n

> Statut : **implémenté (Tulear), en cours de déploiement Avignon**
> Date : 2026-06-16
> Source : 2ᵉ handoff Claude Design (`Noema-handoff_5pages/` — gitignoré) : pages
> `Philosophie.dc.html`, `Services.dc.html`, `A-propos.dc.html`, `Contact.dc.html`.
> Demande Val : ajouter ces pages d'exemple et les traduire (4 langues).

## Pages livrées (fidèles au design, pilotées CMS)

- **Philosophie** : bandeau pétrole · conviction (phrase forte flottante + 2 paragraphes) ·
  manifeste **I·II·III·IV** (terme + légende + texte) · citation pétrole centrée · clôture + lien.
- **Services** : bandeau pétrole · **3 métiers détaillés** (texte + étiquettes + image/placeholder,
  fonds alternés crème/pétrole) · **démarche en 4 temps** (Écouter/Concevoir/Composer/Accompagner) · CTA.
- **À propos** : hero + portrait (placeholder « à venir ») · récit (« Mon parcours » + signature
  script) · **3 jalons** (Recherche/International/NOÊMA) · CTA ligne.
- **Contact** : titre + **formulaire** (nom, courriel, projet [select], message) + coordonnées
  (Écrire/Rencontrer/Langues).

## Nouveaux blocs Payload

`statement`, `manifesto`, `serviceDetail` (avec `tags[]`, image, `comingSoon`), `steps`,
`milestones`, `story`, `contactForm`. `hero` enrichi (`variant` crème/pétrole/media + portrait +
`comingSoon`). `pullquote`/`cta` reçoivent un `variant`. Tous éditables dans l'admin.

## Formulaire de contact (site statique)

Le site étant **SSG (sans backend)**, l'envoi du formulaire **compose un courriel pré-rempli**
(`mailto:` vers `contactEmail`) côté client. Champs et options pilotés par le CMS.
→ **À suivre** : envoi e-mail côté serveur (endpoint Payload + SMTP) pour un vrai envoi sans
ouvrir le client mail. Documenté comme évolution.

## i18n

Contenu d'exemple Claude Design (FR = référence) **traduit ES/EN/DE** pour les 4 pages
(hero, convictions, métiers, étiquettes, démarche, récit, jalons, formulaire). 5 pages × 4 langues.

## Notes techniques

- DB réinitialisée (contenu d'exemple uniquement) → migration `initial` régénérée.
- L'image `literature_cafe.jpg` sert la 1ʳᵉ réalisation services + galerie home ; les autres
  visuels sont des emplacements hachurés « à venir » (en attente des photos).
- Curseur custom « voir » du prototype non repris.
