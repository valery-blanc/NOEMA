import type { CollectionConfig } from 'payload'

// Collection minimale de pages éditoriales, localisée (FR/ES/EN/DE).
// Lecture publique → consommée par le front Astro (SSG) au build.
// Le modèle de contenu complet (blocs, SEO…) arrive en FEAT-004.
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { fr: 'Page', en: 'Page', es: 'Página', de: 'Seite' },
    plural: { fr: 'Pages', en: 'Pages', es: 'Páginas', de: 'Seiten' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Identifiant d'URL, ex. « accueil », « philosophie ».",
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Chapô / résumé court affiché en tête de page.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Afficher cette page dans le menu de navigation.',
        position: 'sidebar',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Ordre dans le menu (croissant).',
        position: 'sidebar',
      },
    },
  ],
}
