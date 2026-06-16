# NOÊMA — Spécification (source de vérité)

> Version : **FEAT-001 — Fondations : architecture, navigation, design system, i18n**
> Statut : conception validée · implémentation à venir
> Dernière mise à jour : 2026-06-15

Ce document décrit le comportement réel **cible** du site NOÊMA. Il doit refléter à tout
moment l'état du code. Toute évolution (FEAT-XXX) ou correctif (BUG-XXX) met à jour ce
fichier et incrémente la version en en-tête.

---

## 1. Vision & positionnement

**NOÊMA** est une « maison intellectuelle » européenne : création de **bibliothèques
privées**, d'**espaces culturels** et de **collections patrimoniales**. La marque révèle
l'identité intellectuelle de ses clients.

Le site doit transmettre : **intelligence** (pas luxe ostentatoire), **culture** (pas
marketing), **sérénité** (pas performance), **élégance intemporelle** (pas tendances).
Impression visée : *entrer dans un univers rare, calme, cultivé et profondément personnel.*

Références d'ambiance (inspiration, **pas** copie) : `asever.com`, `meghanmaven.com`.
⚠ Observées : ce sont en réalité des **sites e-commerce** → on n'en retient que le
**registre esthétique**, pas la structure (grilles produits, panier…). `asever.com` est la
plus proche de NOÊMA : neutres **chauds** (crème/ivoire), **or champagne** discret, beaucoup
d'air, **récit personnel** au cœur, CTA sobres. `meghanmaven.com` apporte le minimalisme
éditorial (contraste, whitespace). Note : les deux sont **sans-serif dominantes** — NOÊMA
garde des **titres serif** (Cormorant) sur un corps sans, par choix de la fondatrice.

**Registre visuel retenu : « Chaleur éditoriale »** (validé Val, 2026-06-15) — base chaude
type As Ever (ivoire/crème + or très subtil, beaucoup d'air, présence fondatrice), titres en
grande serif, **bleu pétrole utilisé en accent rare** (section CTA + footer uniquement), pas
comme couleur dominante.

La **fondatrice** est centrale : sa présence doit être visible et naturelle dès l'accueil
(parcours personnel, recherche, expérience internationale, passion des bibliothèques).
Photos professionnelles fournies ultérieurement → prévoir des emplacements dédiés.

---

## 2. Stack technique

| Couche | Choix | Rôle |
|---|---|---|
| Front-end | **Astro** (statique/hybride) | Rendu du site, design sur-mesure, routing i18n, RTL |
| CMS | **Payload CMS** (Node/TypeScript) | Admin pour la fondatrice, API REST/GraphQL, localisation |
| Base de données | **Postgres** | Contenu, structure, traductions |
| Médias | Volume Payload (uploads) | Images, documents |
| Reverse proxy | **Traefik** (déjà sur Avignon) | TLS (ACME), routage des domaines |
| Conteneurisation | **Docker Compose** | Tout dockerisé, **portable vers un VPS** |

**Décisions écartées et pourquoi** :
- Builders SaaS (Squarespace/Webflow) : l'identité visuelle est le produit → templates trop bridants.
- **Sanity** : non auto-hébergeable (content lake cloud) → incompatible « tout dockerisé chez soi ».
- CMS from-scratch : charge de dev + sécurité + maintenance injustifiées.

**Hébergement** : auto-hébergé sur **Avignon** (`192.168.0.222`, Debian/Docker/Traefik
existant, 24/7) — décidé Val 2026-06-15, car c'est déjà le serveur web (Traefik/TLS + DNS).
Migration vers un VPS prévue (la stack Docker est portable telle quelle). Contrainte :
**8 Go RAM partagés** → front Astro **léger** (rendu serveur Node minimal + cache, cf. §9).
Repo source : `C:\WORK\NOEMA` sur **Tulear** (accédé en SMB `\\tulear\C\WORK\NOEMA`).
Noms de domaine gérés par Val (cible **.ch** : `noema.ch` / `noema-library.ch` /
`noema-signature.ch` — choix final par Val).

---

## 3. Architecture & structure du projet (cible)

```
Z:\NOEMA\
├─ apps\
│  ├─ web\                  # Astro (front public)
│  │  ├─ src\
│  │  │  ├─ pages\[lang]\   # routing i18n : /fr, /es, /en, /de
│  │  │  ├─ components\
│  │  │  ├─ layouts\
│  │  │  ├─ blocks\         # rendu des blocs du page-builder Payload
│  │  │  ├─ lib\            # client API Payload, helpers i18n
│  │  │  └─ styles\         # design tokens, base, RTL
│  │  └─ astro.config.mjs
│  └─ cms\                  # Payload CMS
│     ├─ src\
│     │  ├─ collections\    # Pages, Services, Media, Users
│     │  ├─ globals\        # SiteSettings
│     │  ├─ blocks\         # définitions des blocs du page-builder
│     │  └─ payload.config.ts
│     └─ ...
├─ docker-compose.yml       # postgres + cms + web (+ réseau Traefik)
├─ docker-compose.dev.yml   # surcouche dev (hot reload)
├─ .env(.example)
└─ docs\                    # specs, bugs, tasks
```

---

## 4. Structure du site & navigation

Pages publiques (ordre du menu) :

1. **Accueil** — hero éditorial + présence fondatrice + aperçu philosophie/services + signature.
2. **Philosophie** — le manifeste, la vision, l'approche intellectuelle.
3. **Services** — bibliothèques privées, espaces culturels, collections patrimoniales.
4. **À propos** — la fondatrice : parcours, recherche, international, bibliothèques.
5. **Contact** — prise de contact (formulaire + coordonnées).

**Navigation** (FEAT-007 — barre supérieure, style meghanmaven ; remplace le rail de FEAT-004) :
- **Barre supérieure** pleine largeur, **sticky** : wordmark **NOÊMA**, menu horizontal,
  **sélecteur de langue** (FR/ES/EN/DE). Transparente au-dessus du hero de la home, devient
  surface beige opaque (+ filet laiton) au scroll.
- **Item actif/survolé** : un court **tiret barre les dernières lettres** du mot.
- **Sous-menus déroulants** au survol/clavier (démo branchée sur Services — 3 piliers).
- **Pleine largeur** (pas de conteneur centré) ; mesure de lecture conservée sur les paragraphes.
- Mobile : menu plein écran (burger + scrim).
- Pied de page : wordmark, liens, langue, mentions, contact, fine ligne laiton.

Le menu reste volontairement court ; la fondatrice peut créer des **pages additionnelles**
(slug libre) via le CMS — affichées en page autonome, et optionnellement ajoutées au menu
via les réglages du site.

---

## 5. Design system

### 5.1 Palette

Registre « chaleur éditoriale » : **les neutres chauds dominent** (ivoire/pierre/sable),
le **pétrole reste rare** (uniquement la section CTA et le footer), l'**or est très subtil**
(filets, séparateurs, détails typographiques, boutons/éléments de signature). Aucun effet
métallique/brillant. Éviter les bruns foncés dominants.

| Token | Hex | Usage |
|---|---|---|
| `--c-ivory` | `#F6F2EA` | Fond principal (blanc cassé chaud) |
| `--c-stone` | `#E7E0D3` | Surface alternative (pierre claire) |
| `--c-sand` | `#D8C9B0` | Accent chaud, aplats discrets (beige sable) |
| `--c-petrol` | `#15333B` | Bleu pétrole — **accent rare** : section CTA uniquement |
| `--c-petrol-deep` | `#0F262C` | Pétrole très profond — footer, hover |
| `--c-charcoal` | `#2A2B29` | Texte courant (gris charbon) |
| `--c-charcoal-soft` | `#55564F` | Texte secondaire |
| `--c-brass` | `#A6884F` | Accent or vieilli (filets, signature, focus) |
| `--c-brass-soft` | `#C2A973` | Or clair (hover discret) |

Contraste : viser WCAG AA (charbon sur ivoire ≈ 11:1 ✔ ; ivoire sur pétrole ✔). Le laiton
n'est jamais utilisé pour du texte courant (réservé accents/filets).

### 5.2 Typographie

- **Titres / display (latin)** : **Cormorant Garamond** — héritage intellectuel, lettres fines, grandes tailles.
- **Texte courant (latin)** : **Inter** — sans-serif contemporaine, neutre, lisible (alt : Mulish).
- **Titres (arabe)** : **Amiri** (fallback display RTL).
- **Texte courant (arabe)** : **Noto Sans Arabic** / **Noto Naskh Arabic**.
- La pile de polices bascule selon le script de la locale active (cf. §6).

Échelle modulaire (base 1rem = 16px, ratio ≈ 1.25) :

| Token | Taille | Emploi |
|---|---|---|
| `--fs-display` | clamp(2.6rem, 6vw, 4.5rem) | Hero |
| `--fs-h1` | clamp(2rem, 4vw, 3rem) | Titres de page |
| `--fs-h2` | 2rem | Sections |
| `--fs-h3` | 1.5rem | Sous-sections |
| `--fs-body` | 1.0625rem | Paragraphes |
| `--fs-small` | 0.875rem | Légendes, méta |

Détails : interlignage généreux (corps ~1.7), titres serrés (~1.1), `letter-spacing`
légèrement négatif sur les grandes serif, capitales espacées (`tracking`) pour les
sur-titres/labels.

### 5.3 Mise en page & rythme

- Largeur de contenu : `--w-content: 72rem` (≈ 1152px) ; colonne de lecture étroite `--w-prose: 42rem`.
- Espacement vertical ample (« respiration ») : échelle 8px → sections séparées par `clamp(5rem, 10vw, 9rem)`.
- Grilles éditoriales **asymétriques** (texte décalé, images débordant légèrement la colonne).
- Séparateurs : **filets laiton 1px** plutôt que des cartes/ombres. Pas d'ombres marquées.
- Boutons : contour fin (laiton/charbon), fond transparent, capitales espacées, hover discret.
- Mouvement : transitions lentes et douces (fade/translate ~400–600ms), parallaxe très légère sur images. Aucun effet tape-à-l'œil.

---

## 6. Internationalisation (i18n) & RTL

**Exigence durable** : multilingue dès la conception, scalable à un **grand nombre de
langues** dont l'**arabe (RTL)**.

- **Locales au lancement** : `fr` (défaut), `es`, `en`, `de`. Ajouter une langue = ajouter
  une locale (Payload) + un dictionnaire UI + traduire le contenu — **sans toucher au code**.
- **Payload** : `localization` activée (locales + fallback sur `fr`). Champs de contenu localisés.
- **Astro** : routing par préfixe de langue (`/fr/...`, `/es/...`, `/en/...`, `/de/...`).
- **RTL** : attribut `dir` calculé depuis la locale (table `rtlLocales` ⊃ `ar`). CSS en
  **propriétés logiques** (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`)
  → aucune réécriture lourde pour passer en RTL. Overrides `[dir="rtl"]` réduits au minimum.
- **Polices par script** : bascule automatique Cormorant/Inter ↔ Amiri/Noto selon la locale.
- **Sélecteur de langue** : dans la nav et le footer ; conserve la page courante.

---

## 7. Modèle de contenu (Payload)

### Collections
- **Pages** : `title` (localisé), `slug`, `showInNav` (bool), `navOrder`, **`layout`**
  (page-builder = liste de **blocs**, **localisé** → un jeu de blocs par langue, FEAT-004),
  `excerpt`/`content` (repli). Permet à la fondatrice de **créer/modifier des pages**.
- **Media** : uploads (image/doc), `alt`, formats responsive générés.
- **Users** : authentification admin (fondatrice + Val).

### Globals
- **SiteSettings** (localisé) : `siteName`, `tagline`, `contactEmail` (étendra : nav, footer,
  liens sociaux, SEO par défaut).

### Blocs du page-builder (implémentés FEAT-004)
`hero` · `prose` (richText + **note de marge/marginalia** + titre de section) · `pullquote`
(citation) · `indexList` (titre + entrées label/texte — piliers/index) · `signature`
(présence fondatrice : nom/rôle/bio/portrait) · `cta` (bande pétrole — accent rare).
*À venir : ImageOrGallery, ContactBlock (formulaire), SEO par bloc.*

---

## 8. Pages — contenu cible

- **Accueil** : `Hero` (accroche + image) → `FounderSignature` (présence dès l'accueil) →
  extrait `Philosophie` → `ServicesGrid` (aperçu) → `PullQuote` → `CallToAction` (contact).
- **Philosophie** : manifeste en prose éditoriale (colonne étroite), citations, respiration.
- **Services** : 3 piliers (bibliothèques privées · espaces culturels · collections patrimoniales),
  chacun en bloc texte/image alterné.
- **À propos** : portrait de la fondatrice, parcours, recherche, international ; mise en page éditoriale.
- **Contact** : formulaire (nom, email, message) + coordonnées ; envoi e-mail côté CMS/serveur.

---

## 9. Infrastructure & déploiement

### 9.1 Monorepo (FEAT-002)

```
NOEMA/
├─ apps/
│  ├─ cms/   → Payload v3.85.1 (Next.js 16) + adaptateur Postgres
│  └─ web/   → Astro 6.4.7 (SSG) + i18n (/fr /es /en /de)
├─ docker-compose.yml         (prod Avignon, Traefik)
├─ docker-compose.dev.yml     (override test local Tulear : ports exposés, pas de Traefik)
├─ .env.example
├─ package.json + pnpm-workspace.yaml   (pnpm workspaces)
└─ docs/
```

### 9.2 Services Docker (`docker-compose.yml`)

- `postgres` (16-alpine) — volume persistant `pg_data`, réseau `internal`, healthcheck `pg_isready`.
- `cms-migrate` (one-shot, image cible `builder`) — applique les **migrations Payload**
  (`pnpm payload migrate`) avant le démarrage du CMS. En prod, le schéma Postgres est géré
  **exclusivement par migrations versionnées** (`apps/cms/src/migrations/`) : le `push` auto de
  l'adaptateur n'opère qu'en dev (`NODE_ENV != production`). Toute évolution du modèle ⇒
  `payload migrate:create` + commit (cf. BUG-001). **Toute évolution du modèle Payload**
  (champs/collections/globals/features d'éditeur) impose en plus de régénérer + committer
  `payload generate:types` **et** `payload generate:importmap` (sinon l'admin casse — cf. BUG-002).
- `cms` (Payload/Next, image `output: standalone`) — dépend de postgres (healthy) **et** de
  `cms-migrate` (terminé OK) ; réseaux `internal` + `web` ; labels Traefik → `${ADMIN_HOST}`, port 3000.
- `publisher` (apps/web, Node — FEAT-005) — reconstruit le statique Astro **à la demande**
  (lit l'API Payload) vers deux cibles : `web_dist` (public) et `web_preview` (aperçu). Build
  initial des deux au démarrage ; `/health` ; déclenché par les boutons admin via `x-token`.
  Remplace l'ancien one-shot `web-build`.
- `web` (nginx 1.27-alpine) — sert `web_dist` (statique) ; dépend de `publisher` (healthy) ;
  labels Traefik → `${PUBLIC_HOST}`, port 80.
- `preview` (nginx — FEAT-005) — sert `web_preview` sur `${PREVIEW_HOST}` ; **basic-auth**
  Traefik (`PREVIEW_BASICAUTH`) + header `X-Robots-Tag: noindex`.

**Décision de rendu (actée FEAT-002/005)** : **SSG statique** servi par nginx — runtime web minimal
(adapté aux 8 Go RAM d'Avignon, cf. infra). Fraîcheur du contenu = rebuild via le service
`publisher`, déclenché par les boutons **Aperçu** (→ `web_preview`) / **Publier** (→ `web_dist`)
de l'admin (cf. FEAT-005).

### 9.3 Traefik (convention Avignon)

Réseau Docker externe partagé **`web`** ; entrypoint **`websecure`** ; certresolver
**`letsencrypt`**. Tout est paramétré via `.env` (`TRAEFIK_NETWORK`, `TRAEFIK_ENTRYPOINT`,
`CERT_RESOLVER`, `PUBLIC_HOST`, `ADMIN_HOST`). Test local Tulear : `docker network create web`
puis l'override `docker-compose.dev.yml` expose les ports (cms `3000`, web `8080`).

Portabilité : le même `docker-compose.yml` (avec `.env`) se déploie sur n'importe quel VPS ;
seules les variables d'environnement et le domaine changent.

**Commande de déploiement (`RUN_CMD`)** : `docker compose up -d --build`.

---

## 10. Cas limites & règles à retenir

- **RTL d'abord** : tout nouveau composant utilise des propriétés CSS logiques (jamais
  `left`/`right` en dur) pour rester compatible arabe/RTL.
- **Fallback de langue** : si une traduction manque, repli silencieux sur `fr`.
- **Or subtil** : ne jamais utiliser le laiton pour du texte courant ni des aplats larges.
- **Clés/secrets** : `.env` jamais commité ; `PAYLOAD_SECRET`, identifiants Postgres, SMTP en variables d'env.
- **Présence fondatrice** : conserver des emplacements photo dédiés (accueil + à propos) en
  attendant la séance photo professionnelle.
- **Médias responsive** : toute image passe par Media (formats générés) ; `alt` localisé obligatoire.

---

## 11. Historique des versions

- **FEAT-001** (2026-06-15) — Fondations : choix de stack, architecture, navigation, design
  system (palette, typo, rythme), i18n/RTL, modèle de contenu. Registre visuel « chaleur
  éditoriale » validé (sites de référence observés ; pétrole en accent rare). Conception validée.
- **FEAT-008** (2026-06-16) — Intégration de la **charte Claude Design** (`Noema-site.dc.html`) :
  palette crème/pétrole/or + 4 polices (Cormorant, Hanken Grotesk, IBM Plex Mono, Pinyon Script),
  en-tête fixe pleine largeur (strike animé + **méga-menu Services piloté CMS**), home
  full-bleed (hero image, philosophie, bande services, réalisations, fondatrice), footer.
  Blocs `hero/values/services/gallery/founder` + contenu d'exemple **traduit FR/ES/EN/DE**.
  Fait foi sur la direction visuelle (remplace FEAT-004 rail-index et FEAT-007 nav maison).
- **FEAT-007** (2026-06-15) — Refonte navigation (style meghanmaven) : barre **supérieure**
  sticky (transparente sur le hero → beige au scroll), **tiret barrant les dernières lettres**
  de l'item actif, **sous-menus déroulants** (démo sur Services), **mise en page pleine largeur**,
  **hero image** de home (`literature_cafe.jpg`) au **haut flouté + fondu beige**. Remplace le
  rail-index de FEAT-004 (affichage marginalia/folios conservé).
- **FEAT-004** (2026-06-15) — Page-builder à blocs (hero/prose+note/pullquote/indexList/
  signature/cta), `layout` localisé. Front : **navigation « rail-index »** (folios numérotés,
  catalogue vertical), **affichage « marginalia + folios »**, **sommaire vivant** (scroll-spy),
  apparition au scroll (reduced-motion safe). Charte (couleurs/polices) laissée en tokens
  (faite en parallèle avec Claude Design). DB réinitialisée (lorem) → migration `initial` unique.
- **FEAT-005** (2026-06-15) — Workflow éditorial statique : boutons **Aperçu** / **Publier**
  dans l'admin. Service `publisher` (rebuild Astro à la demande, cibles public + preview),
  service `preview` (nginx, basic-auth Traefik + noindex). Endpoints `/api/preview|publish`
  réservés admin. Verrouillage de documents désactivé. Remplace le one-shot `web-build`.
- **FEAT-003** (2026-06-15) — Pages affichées : navigation (header wordmark + menu + sélecteur
  de langue, footer), routage `/[lang]/` (accueil) + `/[lang]/[slug]/` (pages de menu), layout
  au design system, sérialiseur richText→HTML minimal. Modèle `Pages` étendu (`showInNav`,
  `navOrder`). Seed de démonstration multilingue (lorem labellisé `[FR]/[ES]/[EN]/[DE]`).
  Page-builder à blocs reporté à FEAT-004.
- **FEAT-002** (2026-06-15) — Scaffold du monorepo (Tulear) : `apps/cms` (Payload 3.85.1 +
  Postgres, collection `Pages` + global `SiteSettings`, locales fr/es/en/de), `apps/web`
  (Astro 6 SSG, i18n /fr /es /en /de, tokens du design system), orchestration Docker Compose
  (postgres/cms/web-build/web) + Traefik (réseau `web`, `websecure`, `letsencrypt`). Rendu
  Astro tranché : **SSG statique servi par nginx**.
