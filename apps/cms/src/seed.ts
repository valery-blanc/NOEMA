/**
 * Seed NOÊMA — contenu d'exemple de Claude Design (handoff Noema-site.dc.html),
 * traduit FR/ES/EN/DE. Le champ `layout` est localisé → un jeu de blocs par langue.
 * Idempotent (upsert par slug). Lancer : pnpm --filter @noema/cms seed.
 */
import { getPayload } from 'payload'
import config from './payload.config'

const LOCALES = ['fr', 'es', 'en', 'de'] as const
type Locale = (typeof LOCALES)[number]

const rt = (paras: string[]) => ({
  root: {
    type: 'root', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1,
    children: paras.map((text) => ({
      type: 'paragraph', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, textFormat: 0,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

// ---- Dictionnaire de contenu (FR = référence du design ; ES/EN/DE traduits) ----
type T = Record<Locale, string>
const tr = (fr: string, es: string, en: string, de: string): T => ({ fr, es, en, de })

const C = {
  title: {
    accueil: tr('Accueil', 'Inicio', 'Home', 'Startseite'),
    philosophie: tr('Philosophie', 'Filosofía', 'Philosophy', 'Philosophie'),
    services: tr('Services', 'Servicios', 'Services', 'Leistungen'),
    'a-propos': tr('À propos', 'Sobre', 'About', 'Über uns'),
    contact: tr('Contact', 'Contacto', 'Contact', 'Kontakt'),
  },
  settings: {
    tagline: tr(
      "Maison de bibliothèques privées, d'espaces culturels et de collections patrimoniales — Suisse.",
      'Casa de bibliotecas privadas, espacios culturales y colecciones patrimoniales — Suiza.',
      'House of private libraries, cultural spaces and heritage collections — Switzerland.',
      'Haus für Privatbibliotheken, Kulturräume und Sammlungen — Schweiz.',
    ),
    location: tr('Genève, Suisse', 'Ginebra, Suiza', 'Geneva, Switzerland', 'Genf, Schweiz'),
  },
  hero: {
    eyebrow: tr(
      'Maison de bibliothèques privées · Genève, Suisse',
      'Casa de bibliotecas privadas · Ginebra, Suiza',
      'House of private libraries · Geneva, Switzerland',
      'Haus für Privatbibliotheken · Genf, Schweiz',
    ),
    heading: tr('Révéler une vie intellectuelle.', 'Revelar una vida intelectual.', 'Revealing an intellectual life.', 'Ein geistiges Leben sichtbar machen.'),
    intro: tr(
      'Nous composons des bibliothèques sur mesure et des espaces culturels qui donnent forme à une pensée — patiemment, livre après livre.',
      'Componemos bibliotecas a medida y espacios culturales que dan forma a un pensamiento — con paciencia, libro a libro.',
      'We compose bespoke libraries and cultural spaces that give shape to a mind — patiently, book after book.',
      'Wir gestalten maßgeschneiderte Bibliotheken und Kulturräume, die einem Denken Gestalt geben — geduldig, Buch für Buch.',
    ),
    cta: tr('Prendre rendez-vous', 'Pedir cita', 'Book an appointment', 'Termin vereinbaren'),
  },
  philo: {
    eyebrow: tr('(Philosophie)', '(Filosofía)', '(Philosophy)', '(Philosophie)'),
    heading: tr('Ce à quoi nous croyons.', 'En lo que creemos.', 'What we believe in.', 'Woran wir glauben.'),
    intro: tr(
      "L'intelligence plutôt que le luxe, la culture plutôt que le marketing. Une élégance qui ne cherche pas à se montrer.",
      'La inteligencia antes que el lujo, la cultura antes que el marketing. Una elegancia que no busca mostrarse.',
      'Intelligence over luxury, culture over marketing. An elegance that does not seek to be seen.',
      'Intelligenz statt Luxus, Kultur statt Marketing. Eine Eleganz, die sich nicht zeigen will.',
    ),
    rows: [
      { term: tr("L'intelligence", 'La inteligencia', 'Intelligence', 'Die Intelligenz'), cap: tr('plutôt que le luxe ostentatoire', 'antes que el lujo ostentoso', 'over ostentatious luxury', 'statt protzigem Luxus') },
      { term: tr('La culture', 'La cultura', 'Culture', 'Die Kultur'), cap: tr('plutôt que le marketing', 'antes que el marketing', 'over marketing', 'statt Marketing') },
      { term: tr('La sérénité', 'La serenidad', 'Serenity', 'Die Gelassenheit'), cap: tr('plutôt que la performance', 'antes que el rendimiento', 'over performance', 'statt Leistung') },
      { term: tr("L'élégance intemporelle", 'La elegancia intemporal', 'Timeless elegance', 'Zeitlose Eleganz'), cap: tr('plutôt que les tendances', 'antes que las tendencias', 'over trends', 'statt Trends') },
    ],
  },
  services: {
    eyebrow: tr('(Services)', '(Servicios)', '(Services)', '(Leistungen)'),
    heading: tr("Trois manières d'accompagner.", 'Tres formas de acompañar.', 'Three ways to accompany.', 'Drei Arten zu begleiten.'),
    items: [
      { title: tr('Bibliothèques privées', 'Bibliotecas privadas', 'Private libraries', 'Privatbibliotheken'), text: tr(
        "Conception et composition sur mesure — du choix des ouvrages à l'architecture des rayonnages et à la mise en lumière.",
        'Concepción y composición a medida — desde la elección de las obras hasta la arquitectura de las estanterías y la iluminación.',
        'Bespoke design and composition — from the choice of works to the architecture of the shelving and the lighting.',
        'Maßgeschneiderte Gestaltung und Zusammenstellung — von der Auswahl der Werke bis zur Architektur der Regale und der Beleuchtung.',
      ) },
      { title: tr('Espaces culturels', 'Espacios culturales', 'Cultural spaces', 'Kulturräume'), text: tr(
        'Lieux de lecture, salons et fondations où une collection prend vie et se partage, pensés dans leurs moindres détails.',
        'Lugares de lectura, salones y fundaciones donde una colección cobra vida y se comparte, cuidados hasta el último detalle.',
        'Reading rooms, salons and foundations where a collection comes to life and is shared, considered down to the last detail.',
        'Lesesäle, Salons und Stiftungen, in denen eine Sammlung lebendig wird und geteilt wird — bis ins kleinste Detail durchdacht.',
      ) },
      { title: tr('Conseil — culture & ONG', 'Asesoría — cultura y ONG', 'Advisory — culture & NGOs', 'Beratung — Kultur & NGOs'), text: tr(
        'Accompagnement des institutions culturelles et des ONG dans la constitution et la valorisation de collections patrimoniales.',
        'Acompañamiento de instituciones culturales y ONG en la constitución y la puesta en valor de colecciones patrimoniales.',
        'Supporting cultural institutions and NGOs in building and enhancing heritage collections.',
        'Begleitung von Kulturinstitutionen und NGOs beim Aufbau und der Aufwertung von Sammlungen.',
      ) },
    ],
  },
  gallery: {
    eyebrow: tr('(Réalisations)', '(Realizaciones)', '(Selected work)', '(Arbeiten)'),
    heading: tr('Quelques bibliothèques.', 'Algunas bibliotecas.', 'A few libraries.', 'Einige Bibliotheken.'),
    cap1: tr('Café-bibliothèque — voûte historique', 'Café-biblioteca — bóveda histórica', 'Café-library — historic vault', 'Café-Bibliothek — historisches Gewölbe'),
    cap2: tr('Bibliothèque privée — Genève', 'Biblioteca privada — Ginebra', 'Private library — Geneva', 'Privatbibliothek — Genf'),
    tag: tr('à venir', 'próximamente', 'coming soon', 'in Kürze'),
  },
  founder: {
    eyebrow: tr('(La fondatrice)', '(La fundadora)', '(The founder)', '(Die Gründerin)'),
    quote: tr(
      "J'ai fondé NOÊMA au croisement de la recherche, du voyage et d'un attachement ancien aux bibliothèques. Composer une collection, c'est dresser le portrait d'un esprit.",
      'Fundé NOÊMA en el cruce de la investigación, el viaje y un antiguo apego a las bibliotecas. Componer una colección es trazar el retrato de un espíritu.',
      'I founded NOÊMA at the crossroads of research, travel and a long-held attachment to libraries. To compose a collection is to draw the portrait of a mind.',
      'Ich habe NOÊMA an der Kreuzung von Forschung, Reisen und einer alten Verbundenheit mit Bibliotheken gegründet. Eine Sammlung zusammenzustellen heißt, das Porträt eines Geistes zu zeichnen.',
    ),
    name: tr('Votre nom', 'Su nombre', 'Your name', 'Ihr Name'),
    role: tr('Fondatrice de NOÊMA', 'Fundadora de NOÊMA', 'Founder of NOÊMA', 'Gründerin von NOÊMA'),
  },
  contact: {
    heading: tr('Écrivons-nous.', 'Escribámonos.', 'Let’s talk.', 'Schreiben wir uns.'),
    text: tr(
      'Pour un projet de bibliothèque, un espace culturel ou un conseil — prenons rendez-vous.',
      'Para un proyecto de biblioteca, un espacio cultural o una asesoría — pidamos cita.',
      'For a library project, a cultural space or advisory work — let’s arrange a meeting.',
      'Für ein Bibliotheksprojekt, einen Kulturraum oder eine Beratung — vereinbaren wir einen Termin.',
    ),
  },
  aboutBody: tr(
    'NOÊMA naît au croisement de la recherche, du voyage et d’un attachement ancien aux bibliothèques. Chaque collection se compose patiemment, livre après livre.',
    'NOÊMA nace en el cruce de la investigación, el viaje y un antiguo apego a las bibliotecas. Cada colección se compone con paciencia, libro a libro.',
    'NOÊMA was born at the crossroads of research, travel and a long-held attachment to libraries. Each collection is composed patiently, book after book.',
    'NOÊMA entsteht an der Kreuzung von Forschung, Reisen und einer alten Verbundenheit mit Bibliotheken. Jede Sammlung wird geduldig zusammengestellt, Buch für Buch.',
  ),
}

// ---- Blocs par page et par langue ----
const heroBlock = (loc: Locale, slug: string) => ({
  blockType: 'hero', eyebrow: C.hero.eyebrow[loc], heading: C.hero.heading[loc], intro: C.hero.intro[loc],
  ctaLabel: C.hero.cta[loc], ctaHref: `/${loc}/contact/`,
})
const valuesBlock = (loc: Locale) => ({
  blockType: 'values', eyebrow: C.philo.eyebrow[loc], heading: C.philo.heading[loc], intro: C.philo.intro[loc],
  rows: C.philo.rows.map((r) => ({ term: r.term[loc], caption: r.cap[loc] })),
})
const servicesBlock = (loc: Locale) => ({
  blockType: 'services', eyebrow: C.services.eyebrow[loc], heading: C.services.heading[loc],
  items: C.services.items.map((it) => ({ title: it.title[loc], text: it.text[loc] })),
})
const galleryBlock = (loc: Locale) => ({
  blockType: 'gallery', eyebrow: C.gallery.eyebrow[loc], heading: C.gallery.heading[loc],
  items: [
    { caption: C.gallery.cap1[loc], imageUrl: '/literature_cafe.jpg' },
    { caption: C.gallery.cap2[loc], tag: C.gallery.tag[loc] },
  ],
})
const founderBlock = (loc: Locale) => ({
  blockType: 'founder', eyebrow: C.founder.eyebrow[loc], quote: C.founder.quote[loc],
  signatureName: C.founder.name[loc], role: C.founder.role[loc],
})
const ctaBlock = (loc: Locale) => ({
  blockType: 'cta', heading: C.contact.heading[loc], text: C.contact.text[loc],
  buttonLabel: C.hero.cta[loc], buttonHref: 'mailto:bonjour@noema.ch',
})

const layoutFor = (slug: string, loc: Locale): any[] => {
  switch (slug) {
    case 'accueil':
      return [heroBlock(loc, slug), valuesBlock(loc), servicesBlock(loc), galleryBlock(loc), founderBlock(loc)]
    case 'philosophie':
      return [
        { blockType: 'hero', eyebrow: C.title.philosophie[loc], heading: C.philo.heading[loc], intro: C.philo.intro[loc] },
        valuesBlock(loc),
        { blockType: 'pullquote', quote: C.founder.quote[loc].split('. ').slice(-1)[0], attribution: 'NOÊMA' },
      ]
    case 'services':
      return [
        { blockType: 'hero', eyebrow: C.title.services[loc], heading: C.services.heading[loc] },
        servicesBlock(loc),
        ctaBlock(loc),
      ]
    case 'a-propos':
      return [
        { blockType: 'hero', eyebrow: C.title['a-propos'][loc], heading: C.founder.name[loc] },
        founderBlock(loc),
        { blockType: 'prose', body: rt([C.aboutBody[loc]]) },
      ]
    case 'contact':
      return [
        { blockType: 'hero', eyebrow: C.title.contact[loc], heading: C.contact.heading[loc], intro: C.contact.text[loc] },
        ctaBlock(loc),
      ]
    default:
      return [heroBlock(loc, slug)]
  }
}

const PAGES = ['accueil', 'philosophie', 'services', 'a-propos', 'contact'] as const

const run = async () => {
  const payload = await getPayload({ config })

  for (const loc of LOCALES) {
    await payload.updateGlobal({
      slug: 'site-settings', locale: loc, depth: 0,
      data: {
        siteName: 'NOÊMA',
        tagline: C.settings.tagline[loc],
        contactEmail: 'bonjour@noema.ch',
        domain: 'noema-library.ch',
        location: C.settings.location[loc],
      },
    })
  }
  payload.logger.info('SiteSettings seedé (fr/es/en/de)')

  for (let i = 0; i < PAGES.length; i++) {
    const slug = PAGES[i]
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, locale: 'fr', depth: 0 })
    let id = found.docs[0]?.id
    if (!id) {
      const created = await payload.create({
        collection: 'pages', locale: 'fr', depth: 0,
        data: { slug, showInNav: true, navOrder: i + 1, title: C.title[slug].fr, layout: layoutFor(slug, 'fr') },
      })
      id = created.id
    }
    for (const loc of LOCALES) {
      await payload.update({
        collection: 'pages', id, locale: loc, depth: 0,
        data: { showInNav: true, navOrder: i + 1, title: C.title[slug][loc], layout: layoutFor(slug, loc) },
      })
    }
    payload.logger.info(`Page « ${slug} » seedée (fr/es/en/de)`)
  }

  payload.logger.info('Seed NOÊMA terminé.')
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
