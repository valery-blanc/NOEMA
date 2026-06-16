/**
 * Seed NOÊMA — contenu d'exemple de Claude Design (home + Philosophie/Services/À propos/Contact),
 * traduit FR/ES/EN/DE. `layout` localisé → un jeu de blocs par langue. Idempotent (upsert par slug).
 * Lancer : pnpm --filter @noema/cms seed.
 */
import { getPayload } from 'payload'
import config from './payload.config'

const LOCALES = ['fr', 'es', 'en', 'de'] as const
type Locale = (typeof LOCALES)[number]
type T = Record<Locale, string>
const t = (fr: string, es: string, en: string, de: string): T => ({ fr, es, en, de })

const rt = (paras: string[]) => ({
  root: {
    type: 'root', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1,
    children: paras.map((text) => ({
      type: 'paragraph', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, textFormat: 0,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

// ============ DICTIONNAIRE ============
const D = {
  title: {
    accueil: t('Accueil', 'Inicio', 'Home', 'Startseite'),
    philosophie: t('Philosophie', 'Filosofía', 'Philosophy', 'Philosophie'),
    services: t('Services', 'Servicios', 'Services', 'Leistungen'),
    'a-propos': t('À propos', 'Sobre', 'About', 'Über uns'),
    contact: t('Contact', 'Contacto', 'Contact', 'Kontakt'),
  },
  settings: {
    tagline: t(
      "Maison de bibliothèques privées, d'espaces culturels et de collections patrimoniales — Suisse.",
      'Casa de bibliotecas privadas, espacios culturales y colecciones patrimoniales — Suiza.',
      'House of private libraries, cultural spaces and heritage collections — Switzerland.',
      'Haus für Privatbibliotheken, Kulturräume und Sammlungen — Schweiz.',
    ),
    location: t('Genève, Suisse', 'Ginebra, Suiza', 'Geneva, Switzerland', 'Genf, Schweiz'),
  },
  rdv: t('Prendre rendez-vous', 'Pedir cita', 'Book an appointment', 'Termin vereinbaren'),

  // ---- HOME ----
  home: {
    heroEyebrow: t('Maison de bibliothèques privées · Genève, Suisse', 'Casa de bibliotecas privadas · Ginebra, Suiza', 'House of private libraries · Geneva, Switzerland', 'Haus für Privatbibliotheken · Genf, Schweiz'),
    heroTitle: t('Révéler une vie intellectuelle.', 'Revelar una vida intelectual.', 'Revealing an intellectual life.', 'Ein geistiges Leben sichtbar machen.'),
    heroIntro: t(
      'Nous composons des bibliothèques sur mesure et des espaces culturels qui donnent forme à une pensée — patiemment, livre après livre.',
      'Componemos bibliotecas a medida y espacios culturales que dan forma a un pensamiento — con paciencia, libro a libro.',
      'We compose bespoke libraries and cultural spaces that give shape to a mind — patiently, book after book.',
      'Wir gestalten maßgeschneiderte Bibliotheken und Kulturräume, die einem Denken Gestalt geben — geduldig, Buch für Buch.',
    ),
    philoEyebrow: t('(Philosophie)', '(Filosofía)', '(Philosophy)', '(Philosophie)'),
    philoHeading: t('Ce à quoi nous croyons.', 'En lo que creemos.', 'What we believe in.', 'Woran wir glauben.'),
    philoIntro: t(
      "L'intelligence plutôt que le luxe, la culture plutôt que le marketing. Une élégance qui ne cherche pas à se montrer.",
      'La inteligencia antes que el lujo, la cultura antes que el marketing. Una elegancia que no busca mostrarse.',
      'Intelligence over luxury, culture over marketing. An elegance that does not seek to be seen.',
      'Intelligenz statt Luxus, Kultur statt Marketing. Eine Eleganz, die sich nicht zeigen will.',
    ),
    servEyebrow: t('(Services)', '(Servicios)', '(Services)', '(Leistungen)'),
    servHeading: t("Trois manières d'accompagner.", 'Tres formas de acompañar.', 'Three ways to accompany.', 'Drei Arten zu begleiten.'),
    galEyebrow: t('(Réalisations)', '(Realizaciones)', '(Selected work)', '(Arbeiten)'),
    galHeading: t('Quelques bibliothèques.', 'Algunas bibliotecas.', 'A few libraries.', 'Einige Bibliotheken.'),
    galCap1: t('Café-bibliothèque — voûte historique', 'Café-biblioteca — bóveda histórica', 'Café-library — historic vault', 'Café-Bibliothek — historisches Gewölbe'),
    galCap2: t('Bibliothèque privée — Genève', 'Biblioteca privada — Ginebra', 'Private library — Geneva', 'Privatbibliothek — Genf'),
    comingSoon: t('à venir', 'próximamente', 'coming soon', 'in Kürze'),
    founderEyebrow: t('(La fondatrice)', '(La fundadora)', '(The founder)', '(Die Gründerin)'),
    founderQuote: t(
      "J'ai fondé NOÊMA au croisement de la recherche, du voyage et d'un attachement ancien aux bibliothèques. Composer une collection, c'est dresser le portrait d'un esprit.",
      'Fundé NOÊMA en el cruce de la investigación, el viaje y un antiguo apego a las bibliotecas. Componer una colección es trazar el retrato de un espíritu.',
      'I founded NOÊMA at the crossroads of research, travel and a long-held attachment to libraries. To compose a collection is to draw the portrait of a mind.',
      'Ich habe NOÊMA an der Kreuzung von Forschung, Reisen und einer alten Verbundenheit mit Bibliotheken gegründet. Eine Sammlung zusammenzustellen heißt, das Porträt eines Geistes zu zeichnen.',
    ),
    founderName: t('Votre nom', 'Su nombre', 'Your name', 'Ihr Name'),
    founderRole: t('Fondatrice de NOÊMA', 'Fundadora de NOÊMA', 'Founder of NOÊMA', 'Gründerin von NOÊMA'),
  },

  // 3 métiers (home services + méga-menu)
  metiers: [
    { title: t('Bibliothèques privées', 'Bibliotecas privadas', 'Private libraries', 'Privatbibliotheken'),
      text: t(
        "Conception et composition sur mesure — du choix des ouvrages à l'architecture des rayonnages et à la mise en lumière.",
        'Concepción y composición a medida — desde la elección de las obras hasta la arquitectura de las estanterías y la iluminación.',
        'Bespoke design and composition — from the choice of works to the architecture of the shelving and the lighting.',
        'Maßgeschneiderte Gestaltung — von der Auswahl der Werke bis zur Architektur der Regale und der Beleuchtung.',
      ) },
    { title: t('Espaces culturels', 'Espacios culturales', 'Cultural spaces', 'Kulturräume'),
      text: t(
        'Lieux de lecture, salons et fondations où une collection prend vie et se partage, pensés dans leurs moindres détails.',
        'Lugares de lectura, salones y fundaciones donde una colección cobra vida y se comparte, cuidados hasta el último detalle.',
        'Reading rooms, salons and foundations where a collection comes to life and is shared, considered down to the last detail.',
        'Lesesäle, Salons und Stiftungen, in denen eine Sammlung lebendig wird — bis ins kleinste Detail durchdacht.',
      ) },
    { title: t('Conseil — culture & ONG', 'Asesoría — cultura y ONG', 'Advisory — culture & NGOs', 'Beratung — Kultur & NGOs'),
      text: t(
        'Accompagnement des institutions culturelles et des ONG dans la constitution et la valorisation de collections patrimoniales.',
        'Acompañamiento de instituciones culturales y ONG en la constitución y la puesta en valor de colecciones patrimoniales.',
        'Supporting cultural institutions and NGOs in building and enhancing heritage collections.',
        'Begleitung von Kulturinstitutionen und NGOs beim Aufbau und der Aufwertung von Sammlungen.',
      ) },
  ],

  // ---- PHILOSOPHIE ----
  philo: {
    heroIntro: t(
      "Une maison se reconnaît moins à ce qu'elle montre qu'à ce qu'elle refuse. Voici nos choix — tenus avec constance, loin du bruit.",
      'Una casa se reconoce menos por lo que muestra que por lo que rechaza. Estas son nuestras decisiones — sostenidas con constancia, lejos del ruido.',
      'A house is known less by what it shows than by what it refuses. These are our choices — held with constancy, far from the noise.',
      'Ein Haus erkennt man weniger an dem, was es zeigt, als an dem, was es ablehnt. Dies sind unsere Entscheidungen — beständig gehalten, fern vom Lärm.',
    ),
    leadEyebrow: t('Notre conviction', 'Nuestra convicción', 'Our conviction', 'Unsere Überzeugung'),
    lead: t(
      "Une bibliothèque n'est pas un décor. C'est une pensée rendue visible.",
      'Una biblioteca no es un decorado. Es un pensamiento hecho visible.',
      'A library is not a backdrop. It is a thought made visible.',
      'Eine Bibliothek ist keine Kulisse. Sie ist ein sichtbar gemachter Gedanke.',
    ),
    leadBody: [
      t(
        "NOÊMA conçoit des collections qui ressemblent à ceux qui les habitent — patientes, exigeantes, vivantes. Nous ne vendons pas des mètres linéaires de reliures assorties : nous écoutons longuement, puis nous traduisons un monde intérieur en livres.",
        'NOÊMA concibe colecciones que se parecen a quienes las habitan — pacientes, exigentes, vivas. No vendemos metros lineales de encuadernaciones a juego: escuchamos largamente y luego traducimos un mundo interior en libros.',
        "NOÊMA designs collections that resemble those who inhabit them — patient, demanding, alive. We do not sell linear metres of matching bindings: we listen at length, then translate an inner world into books.",
        'NOÊMA gestaltet Sammlungen, die denen ähneln, die sie bewohnen — geduldig, anspruchsvoll, lebendig. Wir verkaufen keine laufenden Meter passender Einbände: Wir hören lange zu und übersetzen dann eine innere Welt in Bücher.',
      ),
      t(
        "Ce travail demande du temps et un certain silence. Il se situe à l'opposé de l'urgence et de la démonstration. C'est, au fond, une affaire de fidélité : à une histoire, à un goût, à une vie de l'esprit.",
        'Este trabajo exige tiempo y cierto silencio. Se sitúa en las antípodas de la urgencia y la ostentación. Es, en el fondo, una cuestión de fidelidad: a una historia, a un gusto, a una vida del espíritu.',
        'This work demands time and a certain silence. It stands at the opposite of urgency and display. It is, at heart, a matter of fidelity: to a story, to a taste, to a life of the mind.',
        'Diese Arbeit erfordert Zeit und eine gewisse Stille. Sie steht im Gegensatz zu Eile und Zurschaustellung. Im Grunde ist sie eine Frage der Treue: zu einer Geschichte, einem Geschmack, einem geistigen Leben.',
      ),
    ],
    convictions: [
      { term: t("L'intelligence", 'La inteligencia', 'Intelligence', 'Die Intelligenz'),
        cap: t('plutôt que le luxe ostentatoire', 'antes que el lujo ostentoso', 'over ostentatious luxury', 'statt protzigem Luxus'),
        text: t(
          "La valeur d'une collection ne tient pas à son prix mais à sa justesse. Nous cherchons la profondeur, la cohérence et la surprise — non l'effet.",
          'El valor de una colección no reside en su precio sino en su acierto. Buscamos la profundidad, la coherencia y la sorpresa — no el efecto.',
          "A collection's value lies not in its price but in its rightness. We seek depth, coherence and surprise — not effect.",
          'Der Wert einer Sammlung liegt nicht im Preis, sondern in ihrer Stimmigkeit. Wir suchen Tiefe, Kohärenz und Überraschung — nicht den Effekt.',
        ) },
      { term: t('La culture', 'La cultura', 'Culture', 'Die Kultur'),
        cap: t('plutôt que le marketing', 'antes que el marketing', 'over marketing', 'statt Marketing'),
        text: t(
          "Nous parlons d'œuvres, d'auteurs et de transmission, jamais de tendances. Une bibliothèque se construit pour durer, pas pour être vue une saison.",
          'Hablamos de obras, de autores y de transmisión, nunca de tendencias. Una biblioteca se construye para durar, no para ser vista una temporada.',
          'We speak of works, authors and transmission, never of trends. A library is built to last, not to be seen for a season.',
          'Wir sprechen von Werken, Autoren und Weitergabe, nie von Trends. Eine Bibliothek wird gebaut, um zu bleiben, nicht für eine Saison.',
        ) },
      { term: t('La sérénité', 'La serenidad', 'Serenity', 'Die Gelassenheit'),
        cap: t('plutôt que la performance', 'antes que el rendimiento', 'over performance', 'statt Leistung'),
        text: t(
          "Le bon rythme est lent. Nous accompagnons chaque projet sans précipitation, parce qu'une collection juste ne se décrète pas — elle mûrit.",
          'El buen ritmo es lento. Acompañamos cada proyecto sin prisa, porque una colección acertada no se decreta — madura.',
          'The right pace is slow. We accompany each project without haste, because a true collection cannot be decreed — it matures.',
          'Das richtige Tempo ist langsam. Wir begleiten jedes Projekt ohne Hast, denn eine stimmige Sammlung lässt sich nicht verordnen — sie reift.',
        ) },
      { term: t("L'élégance intemporelle", 'La elegancia intemporal', 'Timeless elegance', 'Zeitlose Eleganz'),
        cap: t('plutôt que les tendances', 'antes que las tendencias', 'over trends', 'statt Trends'),
        text: t(
          "Nous préférons ce qui ne se démode pas : la mesure, la matière, le détail juste. Une discrétion qui se remarque sans jamais s'imposer.",
          'Preferimos lo que no pasa de moda: la mesura, la materia, el detalle justo. Una discreción que se nota sin imponerse jamás.',
          'We prefer what does not date: measure, material, the right detail. A discretion that is noticed without ever imposing itself.',
          'Wir bevorzugen, was nicht aus der Mode kommt: Maß, Material, das richtige Detail. Eine Zurückhaltung, die auffällt, ohne sich je aufzudrängen.',
        ) },
    ],
    quote: t(
      "Composer une bibliothèque, c'est dresser le portrait d'un esprit.",
      'Componer una biblioteca es trazar el retrato de un espíritu.',
      'To compose a library is to draw the portrait of a mind.',
      'Eine Bibliothek zusammenzustellen heißt, das Porträt eines Geistes zu zeichnen.',
    ),
    closing: t('Ces principes guident chacun de nos métiers.', 'Estos principios guían cada uno de nuestros oficios.', 'These principles guide each of our crafts.', 'Diese Grundsätze leiten jedes unserer Handwerke.'),
    closingCta: t('Découvrir nos services →', 'Descubrir nuestros servicios →', 'Discover our services →', 'Unsere Leistungen entdecken →'),
  },

  // ---- SERVICES ----
  serv: {
    heroTitle: t('Trois métiers, une même exigence.', 'Tres oficios, una misma exigencia.', 'Three crafts, one standard.', 'Drei Handwerke, ein Anspruch.'),
    heroIntro: t(
      "De la bibliothèque privée à la fondation culturelle, nous accompagnons chaque projet dans sa durée — discrètement, jusqu'au dernier détail.",
      'De la biblioteca privada a la fundación cultural, acompañamos cada proyecto en su duración — discretamente, hasta el último detalle.',
      'From the private library to the cultural foundation, we accompany each project over time — discreetly, down to the last detail.',
      'Von der Privatbibliothek bis zur Kulturstiftung begleiten wir jedes Projekt über die Zeit — diskret, bis ins letzte Detail.',
    ),
    details: [
      { title: t('Bibliothèques privées', 'Bibliotecas privadas', 'Private libraries', 'Privatbibliotheken'),
        text: t(
          "Nous concevons et composons des bibliothèques sur mesure : sélection des ouvrages, architecture des rayonnages, reliures, classement et mise en lumière. Une collection pensée pour celui ou celle qui l'habite.",
          'Concebimos y componemos bibliotecas a medida: selección de obras, arquitectura de estanterías, encuadernaciones, clasificación e iluminación. Una colección pensada para quien la habita.',
          'We design and compose bespoke libraries: selection of works, shelving architecture, bindings, classification and lighting. A collection conceived for the person who inhabits it.',
          'Wir gestalten und komponieren maßgeschneiderte Bibliotheken: Auswahl der Werke, Regalarchitektur, Einbände, Ordnung und Beleuchtung. Eine Sammlung, gedacht für den, der sie bewohnt.',
        ),
        tags: [
          t('Acquisition d’ouvrages', 'Adquisición de obras', 'Acquisition of works', 'Erwerb von Werken'),
          t('Reliure & restauration', 'Encuadernación y restauración', 'Binding & restoration', 'Einband & Restaurierung'),
          t('Classement & scénographie', 'Clasificación y escenografía', 'Classification & scenography', 'Ordnung & Szenografie'),
        ],
        cap: t('Réalisation — voûte historique', 'Realización — bóveda histórica', 'Project — historic vault', 'Projekt — historisches Gewölbe'),
        image: '/literature_cafe.jpg' },
      { title: t('Espaces culturels', 'Espacios culturales', 'Cultural spaces', 'Kulturräume'),
        text: t(
          "Nous imaginons des lieux où une collection prend vie : salons de lecture, fondations, espaces de réception et de transmission. De la programmation à l'aménagement, chaque détail sert l'expérience du visiteur.",
          'Imaginamos lugares donde una colección cobra vida: salones de lectura, fundaciones, espacios de recepción y transmisión. De la programación al acondicionamiento, cada detalle sirve a la experiencia del visitante.',
          'We imagine places where a collection comes to life: reading rooms, foundations, spaces for reception and transmission. From programming to layout, every detail serves the visitor’s experience.',
          'Wir entwerfen Orte, an denen eine Sammlung lebendig wird: Lesesäle, Stiftungen, Räume für Empfang und Weitergabe. Von der Programmgestaltung bis zur Einrichtung dient jedes Detail dem Erlebnis des Besuchers.',
        ),
        tags: [
          t('Salons de lecture', 'Salones de lectura', 'Reading rooms', 'Lesesäle'),
          t('Fondations', 'Fundaciones', 'Foundations', 'Stiftungen'),
          t('Scénographie culturelle', 'Escenografía cultural', 'Cultural scenography', 'Kulturszenografie'),
        ],
        cap: t('photographie — salon de lecture', 'fotografía — salón de lectura', 'photograph — reading room', 'Foto — Lesesaal'),
        soon: true },
      { title: t('Conseil — culture & ONG', 'Asesoría — cultura y ONG', 'Advisory — culture & NGOs', 'Beratung — Kultur & NGOs'),
        text: t(
          "Nous accompagnons institutions culturelles et organisations non gouvernementales dans la constitution, l'organisation et la valorisation de collections patrimoniales — au service d'une mémoire et d'une transmission durables.",
          'Acompañamos a instituciones culturales y organizaciones no gubernamentales en la constitución, organización y valorización de colecciones patrimoniales — al servicio de una memoria y una transmisión duraderas.',
          'We support cultural institutions and non-governmental organisations in building, organising and enhancing heritage collections — in the service of lasting memory and transmission.',
          'Wir begleiten Kulturinstitutionen und Nichtregierungsorganisationen beim Aufbau, der Organisation und der Aufwertung von Sammlungen — im Dienst einer dauerhaften Erinnerung und Weitergabe.',
        ),
        tags: [
          t('Collections patrimoniales', 'Colecciones patrimoniales', 'Heritage collections', 'Sammlungen'),
          t('Inventaire & valorisation', 'Inventario y valorización', 'Inventory & enhancement', 'Inventar & Aufwertung'),
          t('Médiation', 'Mediación', 'Mediation', 'Vermittlung'),
        ],
        cap: t('photographie — fonds patrimonial', 'fotografía — fondo patrimonial', 'photograph — heritage holdings', 'Foto — Sammlungsbestand'),
        soon: true },
    ],
    stepsHeading: t('Une méthode patiente, en quatre temps.', 'Un método paciente, en cuatro tiempos.', 'A patient method, in four movements.', 'Eine geduldige Methode in vier Schritten.'),
    steps: [
      { title: t('Écouter', 'Escuchar', 'Listen', 'Zuhören'), text: t('Comprendre une histoire, un goût, une ambition. Tout commence par une longue conversation.', 'Comprender una historia, un gusto, una ambición. Todo empieza por una larga conversación.', 'Understanding a story, a taste, an ambition. It all begins with a long conversation.', 'Eine Geschichte, einen Geschmack, einen Anspruch verstehen. Alles beginnt mit einem langen Gespräch.') },
      { title: t('Concevoir', 'Concebir', 'Design', 'Entwerfen'), text: t('Dessiner la collection et son espace : axes, ouvrages, architecture, lumière.', 'Diseñar la colección y su espacio: ejes, obras, arquitectura, luz.', 'Drawing the collection and its space: themes, works, architecture, light.', 'Die Sammlung und ihren Raum entwerfen: Achsen, Werke, Architektur, Licht.') },
      { title: t('Composer', 'Componer', 'Compose', 'Komponieren'), text: t('Acquérir, relier, classer, installer — patiemment, jusqu’à la juste mesure.', 'Adquirir, encuadernar, clasificar, instalar — con paciencia, hasta la justa medida.', 'Acquiring, binding, classifying, installing — patiently, to the right measure.', 'Erwerben, binden, ordnen, einrichten — geduldig, bis zum rechten Maß.') },
      { title: t('Accompagner', 'Acompañar', 'Accompany', 'Begleiten'), text: t('Faire vivre la collection dans le temps : enrichissement, entretien, conseil.', 'Hacer vivir la colección en el tiempo: enriquecimiento, mantenimiento, asesoría.', 'Keeping the collection alive over time: enrichment, upkeep, advice.', 'Die Sammlung über die Zeit lebendig halten: Erweiterung, Pflege, Beratung.') },
    ],
    ctaHeading: t('Un projet de bibliothèque ou de collection ?', '¿Un proyecto de biblioteca o de colección?', 'A library or collection project?', 'Ein Bibliotheks- oder Sammlungsprojekt?'),
    ctaText: t('Chaque accompagnement débute par une conversation, sans engagement. Parlons de votre projet.', 'Cada acompañamiento empieza por una conversación, sin compromiso. Hablemos de su proyecto.', 'Every engagement begins with a conversation, with no commitment. Let’s talk about your project.', 'Jede Zusammenarbeit beginnt mit einem Gespräch, unverbindlich. Sprechen wir über Ihr Projekt.') },

  // ---- À PROPOS ----
  about: {
    heroTitle: t('La maison, et la personne derrière.', 'La casa, y la persona detrás.', 'The house, and the person behind it.', 'Das Haus und der Mensch dahinter.'),
    heroIntro: t(
      "NOÊMA n'est pas une entreprise anonyme. C'est le prolongement d'un parcours — la recherche, le voyage, et un attachement ancien aux bibliothèques.",
      'NOÊMA no es una empresa anónima. Es la prolongación de una trayectoria — la investigación, el viaje y un antiguo apego a las bibliotecas.',
      'NOÊMA is not an anonymous company. It is the extension of a journey — research, travel, and a long-held attachment to libraries.',
      'NOÊMA ist kein anonymes Unternehmen. Es ist die Fortsetzung eines Weges — Forschung, Reisen und eine alte Verbundenheit mit Bibliotheken.',
    ),
    portraitCap: t('portrait — la fondatrice', 'retrato — la fundadora', 'portrait — the founder', 'Porträt — die Gründerin'),
    storyEyebrow: t('Mon parcours', 'Mi trayectoria', 'My journey', 'Mein Weg'),
    story: [
      t('Très tôt, les bibliothèques ont été pour moi des refuges autant que des promesses.', 'Desde muy temprano, las bibliotecas fueron para mí refugios tanto como promesas.', 'Early on, libraries were for me refuges as much as promises.', 'Schon früh waren Bibliotheken für mich ebenso Zuflucht wie Versprechen.'),
      t(
        "De mes années de recherche à une vie professionnelle internationale, une même fascination m'a accompagnée : la manière dont une collection de livres dessine, presque à notre insu, le portrait de celui qui la rassemble. J'ai vu des bibliothèques privées, des fonds d'institutions et des collections patrimoniales — et compris qu'elles avaient toutes besoin d'une main attentive.",
        'De mis años de investigación a una vida profesional internacional, una misma fascinación me ha acompañado: la manera en que una colección de libros dibuja, casi sin saberlo, el retrato de quien la reúne. He visto bibliotecas privadas, fondos de instituciones y colecciones patrimoniales — y comprendí que todas necesitaban una mano atenta.',
        'From my years of research to an international professional life, one fascination has stayed with me: the way a collection of books draws, almost unknowingly, the portrait of the one who gathers it. I have seen private libraries, institutional holdings and heritage collections — and understood that they all needed an attentive hand.',
        'Von meinen Forschungsjahren bis zu einem internationalen Berufsleben hat mich dieselbe Faszination begleitet: wie eine Büchersammlung, fast unbemerkt, das Porträt dessen zeichnet, der sie zusammenträgt. Ich habe Privatbibliotheken, institutionelle Bestände und Sammlungen gesehen — und verstanden, dass sie alle eine aufmerksame Hand brauchten.',
      ),
      t(
        "J'ai fondé NOÊMA pour mettre cette attention au service des autres : composer, avec patience et discrétion, des bibliothèques et des espaces culturels qui leur ressemblent vraiment.",
        'Fundé NOÊMA para poner esa atención al servicio de los demás: componer, con paciencia y discreción, bibliotecas y espacios culturales que de verdad se les parezcan.',
        'I founded NOÊMA to put that attention at the service of others: to compose, with patience and discretion, libraries and cultural spaces that truly resemble them.',
        'Ich habe NOÊMA gegründet, um diese Aufmerksamkeit in den Dienst anderer zu stellen: mit Geduld und Diskretion Bibliotheken und Kulturräume zu gestalten, die ihnen wirklich gleichen.',
      ),
    ],
    msHeading: t('Un chemin entre la recherche et le livre.', 'Un camino entre la investigación y el libro.', 'A path between research and the book.', 'Ein Weg zwischen Forschung und Buch.'),
    milestones: [
      { tag: t('Recherche', 'Investigación', 'Research', 'Forschung'), title: t('Une formation intellectuelle', 'Una formación intelectual', 'An intellectual training', 'Eine geistige Ausbildung'), text: t('Des années passées à lire, classer et comprendre — l’apprentissage du temps long.', 'Años dedicados a leer, clasificar y comprender — el aprendizaje del tiempo largo.', 'Years spent reading, classifying and understanding — the apprenticeship of slow time.', 'Jahre des Lesens, Ordnens und Verstehens — die Schule der langen Zeit.') },
      { tag: t('International', 'Internacional', 'International', 'International'), title: t('Une expérience du monde', 'Una experiencia del mundo', 'An experience of the world', 'Eine Welterfahrung'), text: t('Cultures, langues et institutions traversées — un regard ouvert et exigeant.', 'Culturas, lenguas e instituciones recorridas — una mirada abierta y exigente.', 'Cultures, languages and institutions traversed — an open and demanding eye.', 'Durchquerte Kulturen, Sprachen und Institutionen — ein offener, anspruchsvoller Blick.') },
      { tag: t('NOÊMA', 'NOÊMA', 'NOÊMA', 'NOÊMA'), title: t('La maison, aujourd’hui', 'La casa, hoy', 'The house, today', 'Das Haus, heute'), text: t('Mettre cette attention au service de bibliothèques et d’espaces sur mesure.', 'Poner esa atención al servicio de bibliotecas y espacios a medida.', 'Putting that attention at the service of bespoke libraries and spaces.', 'Diese Aufmerksamkeit in den Dienst maßgeschneiderter Bibliotheken und Räume stellen.') },
    ],
    ctaText: t('Faisons connaissance autour d’un projet.', 'Conozcámonos en torno a un proyecto.', 'Let’s get to know each other around a project.', 'Lernen wir uns bei einem Projekt kennen.'),
    ctaBtn: t('Me contacter →', 'Contactarme →', 'Contact me →', 'Kontakt aufnehmen →'),
  },

  // ---- CONTACT ----
  contact: {
    heading: t('Entrons en conversation.', 'Entremos en conversación.', 'Let’s begin a conversation.', 'Treten wir ins Gespräch.'),
    intro: t(
      "Un projet, une question, une simple envie d'échanger ? Écrivez-moi quelques lignes — je vous réponds personnellement.",
      '¿Un proyecto, una pregunta, simples ganas de conversar? Escríbame unas líneas — le respondo personalmente.',
      'A project, a question, a simple wish to talk? Write me a few lines — I reply personally.',
      'Ein Projekt, eine Frage, einfach Lust auf Austausch? Schreiben Sie mir ein paar Zeilen — ich antworte persönlich.',
    ),
    nameLabel: t('Nom', 'Nombre', 'Name', 'Name'),
    emailLabel: t('Courriel', 'Correo', 'Email', 'E-Mail'),
    projectLabel: t('Votre projet', 'Su proyecto', 'Your project', 'Ihr Projekt'),
    options: [
      t('Bibliothèque privée', 'Biblioteca privada', 'Private library', 'Privatbibliothek'),
      t('Espace culturel', 'Espacio cultural', 'Cultural space', 'Kulturraum'),
      t('Conseil — culture & ONG', 'Asesoría — cultura y ONG', 'Advisory — culture & NGOs', 'Beratung — Kultur & NGOs'),
      t('Autre', 'Otro', 'Other', 'Andere'),
    ],
    messageLabel: t('Message', 'Mensaje', 'Message', 'Nachricht'),
    messagePh: t('Dites-moi quelques mots…', 'Dígame unas palabras…', 'Tell me a few words…', 'Sagen Sie mir ein paar Worte…'),
    submit: t('Envoyer le message', 'Enviar el mensaje', 'Send the message', 'Nachricht senden'),
    writeLabel: t('Écrire', 'Escribir', 'Write', 'Schreiben'),
    meetLabel: t('Rencontrer', 'Encontrarse', 'Meet', 'Treffen'),
    meetNote: t('sur rendez-vous', 'con cita previa', 'by appointment', 'nach Vereinbarung'),
    langsLabel: t('Langues', 'Idiomas', 'Languages', 'Sprachen'),
    langsValue: t('Español · English · Français · Deutsch', 'Español · English · Français · Deutsch', 'Español · English · Français · Deutsch', 'Español · English · Français · Deutsch'),
  },
}

const EMAIL = 'bonjour@noema.ch'

// ============ COMPOSITION DES PAGES ============
const layoutFor = (slug: string, l: Locale): any[] => {
  switch (slug) {
    case 'accueil':
      return [
        { blockType: 'hero', variant: 'media', eyebrow: D.home.heroEyebrow[l], heading: D.home.heroTitle[l], intro: D.home.heroIntro[l], ctaLabel: D.rdv[l], ctaHref: `/${l}/contact/` },
        { blockType: 'values', eyebrow: D.home.philoEyebrow[l], heading: D.home.philoHeading[l], intro: D.home.philoIntro[l],
          rows: D.philo.convictions.map((c) => ({ term: c.term[l], caption: c.cap[l] })) },
        { blockType: 'services', eyebrow: D.home.servEyebrow[l], heading: D.home.servHeading[l],
          items: D.metiers.map((m) => ({ title: m.title[l], text: m.text[l] })) },
        { blockType: 'gallery', eyebrow: D.home.galEyebrow[l], heading: D.home.galHeading[l],
          items: [
            { caption: D.home.galCap1[l], imageUrl: '/literature_cafe.jpg' },
            { caption: D.home.galCap2[l], tag: D.home.comingSoon[l] },
          ] },
        { blockType: 'founder', eyebrow: D.home.founderEyebrow[l], quote: D.home.founderQuote[l], signatureName: D.home.founderName[l], role: D.home.founderRole[l] },
      ]
    case 'philosophie':
      return [
        { blockType: 'hero', variant: 'petrol', eyebrow: D.home.philoEyebrow[l], heading: D.home.philoHeading[l], intro: D.philo.heroIntro[l] },
        { blockType: 'statement', eyebrow: D.philo.leadEyebrow[l], lead: D.philo.lead[l], body: rt(D.philo.leadBody.map((p) => p[l])) },
        { blockType: 'manifesto', items: D.philo.convictions.map((c) => ({ term: c.term[l], caption: c.cap[l], text: c.text[l] })) },
        { blockType: 'pullquote', variant: 'petrol', quote: D.philo.quote[l], attribution: 'NOÊMA' },
        { blockType: 'cta', variant: 'inline', heading: D.philo.closing[l], buttonLabel: D.philo.closingCta[l], buttonHref: `/${l}/services/` },
      ]
    case 'services':
      return [
        { blockType: 'hero', variant: 'petrol', eyebrow: D.home.servEyebrow[l], heading: D.serv.heroTitle[l], intro: D.serv.heroIntro[l] },
        { blockType: 'serviceDetail', items: D.serv.details.map((d) => ({
          title: d.title[l], text: d.text[l], tags: d.tags.map((tg) => ({ label: tg[l] })),
          imageCaption: d.cap[l], imageUrl: (d as any).image ?? undefined, comingSoon: (d as any).soon ? D.home.comingSoon[l] : undefined,
        })) },
        { blockType: 'steps', eyebrow: t('(Démarche)', '(Método)', '(Method)', '(Methode)')[l], heading: D.serv.stepsHeading[l],
          items: D.serv.steps.map((s) => ({ title: s.title[l], text: s.text[l] })) },
        { blockType: 'cta', variant: 'petrol', heading: D.serv.ctaHeading[l], text: D.serv.ctaText[l], buttonLabel: D.rdv[l], buttonHref: `/${l}/contact/` },
      ]
    case 'a-propos':
      return [
        { blockType: 'hero', variant: 'petrol', eyebrow: D.title['a-propos'][l], heading: D.about.heroTitle[l], intro: D.about.heroIntro[l], portraitCaption: D.about.portraitCap[l], comingSoon: D.home.comingSoon[l] },
        { blockType: 'story', eyebrow: D.about.storyEyebrow[l], body: rt(D.about.story.map((p) => p[l])), signatureName: D.home.founderName[l], role: D.home.founderRole[l] },
        { blockType: 'milestones', heading: D.about.msHeading[l], items: D.about.milestones.map((m) => ({ tag: m.tag[l], title: m.title[l], text: m.text[l] })) },
        { blockType: 'cta', variant: 'inline', heading: D.about.ctaText[l], buttonLabel: D.about.ctaBtn[l], buttonHref: `/${l}/contact/` },
      ]
    case 'contact':
      return [
        { blockType: 'contactForm',
          eyebrow: D.title.contact[l], heading: D.contact.heading[l], intro: D.contact.intro[l],
          nameLabel: D.contact.nameLabel[l], emailLabel: D.contact.emailLabel[l], projectLabel: D.contact.projectLabel[l],
          projectOptions: D.contact.options.map((o) => ({ label: o[l] })),
          messageLabel: D.contact.messageLabel[l], messagePlaceholder: D.contact.messagePh[l], submitLabel: D.contact.submit[l],
          writeLabel: D.contact.writeLabel[l], meetLabel: D.contact.meetLabel[l], meetLocation: D.settings.location[l], meetNote: D.contact.meetNote[l],
          langsLabel: D.contact.langsLabel[l], langsValue: D.contact.langsValue[l] },
      ]
    default:
      return []
  }
}

const PAGES = ['accueil', 'philosophie', 'services', 'a-propos', 'contact'] as const

const run = async () => {
  const payload = await getPayload({ config })

  for (const l of LOCALES) {
    await payload.updateGlobal({
      slug: 'site-settings', locale: l, depth: 0,
      data: { siteName: 'NOÊMA', tagline: D.settings.tagline[l], contactEmail: EMAIL, domain: 'noema-library.ch', location: D.settings.location[l] },
    })
  }
  payload.logger.info('SiteSettings seedé (fr/es/en/de)')

  for (let i = 0; i < PAGES.length; i++) {
    const slug = PAGES[i]
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, locale: 'fr', depth: 0 })
    let id = found.docs[0]?.id
    if (!id) {
      const created = await payload.create({ collection: 'pages', locale: 'fr', depth: 0, data: { slug, showInNav: true, navOrder: i + 1, title: D.title[slug].fr, layout: layoutFor(slug, 'fr') } })
      id = created.id
    }
    for (const l of LOCALES) {
      await payload.update({ collection: 'pages', id, locale: l, depth: 0, data: { showInNav: true, navOrder: i + 1, title: D.title[slug][l], layout: layoutFor(slug, l) } })
    }
    payload.logger.info(`Page « ${slug} » seedée (fr/es/en/de)`)
  }

  payload.logger.info('Seed NOÊMA terminé.')
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
