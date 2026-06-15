import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'

// Pages éditoriales localisées (FR/ES/EN/DE), lecture publique → front Astro (SSG).
// Contenu = page-builder à blocs (`layout`, FEAT-004). Les champs `excerpt`/`content`
// restent comme repli pour les pages sans blocs (compat seed FEAT-003).
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
  // Site à éditrice unique → pas de verrouillage de document (évite le « Edit » bloqué).
  lockDocuments: false,
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
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
      localized: true,
      admin: {
        description: 'Composition de la page par blocs (en-tête, texte, citation, index, signature, appel à l’action).',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Chapô / résumé court (repli si la page n’a pas de blocs).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Contenu de repli (utilisé seulement si « layout » est vide).',
      },
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
