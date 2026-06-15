/**
 * Seed de démonstration NOÊMA (FEAT-004).
 * Remplit SiteSettings + 5 pages avec un page-builder à blocs, chaque champ en lorem ipsum
 * PRÉFIXÉ PAR LA LANGUE ([FR]/[ES]/[EN]/[DE]) pour visualiser le câblage, l'i18n et les blocs.
 * Le champ `layout` est localisé → un jeu de blocs par langue. Idempotent (upsert par slug).
 *
 * Lancer : pnpm --filter @noema/cms seed   (avec DATABASE_URI + PAYLOAD_SECRET)
 */
import { getPayload } from 'payload'
import config from './payload.config'

const LOCALES = ['fr', 'es', 'en', 'de'] as const
type Locale = (typeof LOCALES)[number]
const LC: Record<Locale, string> = { fr: 'FR', es: 'ES', en: 'EN', de: 'DE' }
const L = (loc: Locale, s: string) => `[${LC[loc]}] ${s}`

// Paragraphe(s) → structure richText lexical attendue par Payload.
const rt = (paras: string[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: paras.map((text) => ({
      type: 'paragraph',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      textFormat: 0,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

const LOREM1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const LOREM2 =
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

type PageDef = { slug: string; order: number; name: Record<Locale, string> }
const PAGES: PageDef[] = [
  { slug: 'accueil', order: 1, name: { fr: 'Accueil', es: 'Inicio', en: 'Home', de: 'Startseite' } },
  { slug: 'philosophie', order: 2, name: { fr: 'Philosophie', es: 'Filosofía', en: 'Philosophy', de: 'Philosophie' } },
  { slug: 'services', order: 3, name: { fr: 'Services', es: 'Servicios', en: 'Services', de: 'Leistungen' } },
  { slug: 'a-propos', order: 4, name: { fr: 'À propos', es: 'Acerca de', en: 'About', de: 'Über uns' } },
  { slug: 'contact', order: 5, name: { fr: 'Contact', es: 'Contacto', en: 'Contact', de: 'Kontakt' } },
]

// Blocs réutilisables (pré-remplis, labellisés par langue).
const hero = (loc: Locale, name: string) => ({
  blockType: 'hero',
  eyebrow: L(loc, 'Maison intellectuelle'),
  heading: L(loc, name),
  intro: L(loc, LOREM1),
})
const prose = (loc: Locale, title: string, withNote = false) => ({
  blockType: 'prose',
  sectionTitle: L(loc, title),
  body: rt([L(loc, LOREM1), L(loc, LOREM2)]),
  ...(withNote ? { note: L(loc, 'Note de marge — ' + LOREM2) } : {}),
})
const quote = (loc: Locale) => ({
  blockType: 'pullquote',
  quote: L(loc, 'Une bibliothèque est le portrait intellectuel de qui la compose.'),
  attribution: L(loc, 'NOÊMA'),
})
const services = (loc: Locale, title: string) => ({
  blockType: 'indexList',
  sectionTitle: L(loc, title),
  entries: [
    { label: L(loc, 'Bibliothèques privées'), text: L(loc, LOREM1) },
    { label: L(loc, 'Espaces culturels'), text: L(loc, LOREM1) },
    { label: L(loc, 'Collections patrimoniales'), text: L(loc, LOREM1) },
  ],
})
const signature = (loc: Locale, title: string) => ({
  blockType: 'signature',
  sectionTitle: L(loc, title),
  name: L(loc, 'La fondatrice'),
  role: L(loc, 'Conception & direction'),
  bio: L(loc, LOREM1 + ' ' + LOREM2),
})
const cta = (loc: Locale, slug: string) => ({
  blockType: 'cta',
  heading: L(loc, 'Donner forme à votre bibliothèque'),
  text: L(loc, LOREM1),
  buttonLabel: L(loc, 'Prendre contact'),
  buttonHref: `/${loc}/contact/`,
})

// Composition par page (mélanges variés pour montrer tous les blocs).
// Retour typé `any[]` : les littéraux de blocs ne matchent pas l'union stricte
// `blockType` générée par Payload ; ce script est exécuté par tsx (pas critique).
const layoutFor = (slug: string, loc: Locale, name: string): any[] => {
  switch (slug) {
    case 'accueil':
      return [hero(loc, name), signature(loc, 'La fondatrice'), services(loc, 'Nos métiers'), quote(loc), cta(loc, slug)]
    case 'philosophie':
      return [hero(loc, name), prose(loc, 'Manifeste', true), quote(loc), prose(loc, 'Approche')]
    case 'services':
      return [hero(loc, name), services(loc, 'Trois piliers'), prose(loc, 'Méthode', true)]
    case 'a-propos':
      return [hero(loc, name), signature(loc, 'Portrait'), prose(loc, 'Parcours', true)]
    case 'contact':
      return [hero(loc, name), prose(loc, 'Nous écrire'), cta(loc, slug)]
    default:
      return [hero(loc, name)]
  }
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const loc of LOCALES) {
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: loc,
      depth: 0,
      data: {
        siteName: 'NOÊMA',
        tagline: L(loc, 'Maison intellectuelle — création de bibliothèques privées.'),
        contactEmail: 'contact@noema-library.ch',
      },
    })
  }
  payload.logger.info('SiteSettings seedé (fr/es/en/de)')

  for (const p of PAGES) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
      locale: 'fr',
      depth: 0,
    })
    let id = found.docs[0]?.id
    if (!id) {
      const created = await payload.create({
        collection: 'pages',
        locale: 'fr',
        depth: 0,
        data: {
          slug: p.slug,
          showInNav: true,
          navOrder: p.order,
          title: L('fr', p.name.fr),
          layout: layoutFor(p.slug, 'fr', p.name.fr),
        },
      })
      id = created.id
    }
    for (const loc of LOCALES) {
      await payload.update({
        collection: 'pages',
        id,
        locale: loc,
        depth: 0,
        data: {
          showInNav: true,
          navOrder: p.order,
          title: L(loc, p.name[loc]),
          layout: layoutFor(p.slug, loc, p.name[loc]),
        },
      })
    }
    payload.logger.info(`Page « ${p.slug} » seedée (blocs, fr/es/en/de)`)
  }

  payload.logger.info('Seed NOÊMA terminé.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
