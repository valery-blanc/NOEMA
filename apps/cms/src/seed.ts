/**
 * Seed de démonstration NOÊMA.
 * Remplit SiteSettings + les 5 pages du menu avec un lorem ipsum PRÉFIXÉ PAR LA LANGUE
 * ([FR]/[ES]/[EN]/[DE]) sur chaque champ localisé, pour visualiser le câblage et le i18n.
 * Idempotent : ré-exécutable (upsert par slug / global).
 *
 * Lancer : pnpm --filter @noema/cms seed   (avec DATABASE_URI + PAYLOAD_SECRET)
 */
import { getPayload } from 'payload'
import config from './payload.config'

const LOCALES = ['fr', 'es', 'en', 'de'] as const
type Locale = (typeof LOCALES)[number]
const LC: Record<Locale, string> = { fr: 'FR', es: 'ES', en: 'EN', de: 'DE' }

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
      children: [
        { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
      ],
    })),
  },
})

type PageDef = { slug: string; order: number; name: Record<Locale, string> }

const PAGES: PageDef[] = [
  { slug: 'accueil', order: 1, name: { fr: 'Accueil', es: 'Inicio', en: 'Home', de: 'Startseite' } },
  { slug: 'philosophie', order: 2, name: { fr: 'Philosophie', es: 'Filosofía', en: 'Philosophy', de: 'Philosophie' } },
  { slug: 'services', order: 3, name: { fr: 'Services', es: 'Servicios', en: 'Services', de: 'Leistungen' } },
  { slug: 'a-propos', order: 4, name: { fr: 'À propos', es: 'Acerca de', en: 'About', de: 'Über uns' } },
  { slug: 'contact', order: 5, name: { fr: 'Contact', es: 'Contacto', en: 'Contact', de: 'Kontakt' } },
]

const title = (loc: Locale, p: PageDef) => `[${LC[loc]}] ${p.name[loc]}`
const excerpt = (loc: Locale, p: PageDef) =>
  `[${LC[loc]}] Chapô · ${p.name[loc]} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
const content = (loc: Locale, p: PageDef) =>
  rt([
    `[${LC[loc]}] Paragraphe 1 · ${p.name[loc]} — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    `[${LC[loc]}] Paragraphe 2 · ${p.name[loc]} — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  ])

const run = async () => {
  const payload = await getPayload({ config })

  // SiteSettings (global) : siteName identique, tagline localisée + libellée, email commun.
  for (const loc of LOCALES) {
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: loc,
      depth: 0,
      data: {
        siteName: 'NOÊMA',
        tagline: `[${LC[loc]}] Accroche — Maison intellectuelle : Lorem ipsum dolor sit amet.`,
        contactEmail: 'contact@noema-library.ch',
      },
    })
  }
  payload.logger.info('SiteSettings seedé (fr/es/en/de)')

  // Pages : upsert par slug, puis remplissage de chaque locale.
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
          title: title('fr', p),
          excerpt: excerpt('fr', p),
          content: content('fr', p),
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
          title: title(loc, p),
          excerpt: excerpt(loc, p),
          content: content(loc, p),
        },
      })
    }
    payload.logger.info(`Page « ${p.slug} » seedée (fr/es/en/de)`)
  }

  payload.logger.info('Seed NOÊMA terminé.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
