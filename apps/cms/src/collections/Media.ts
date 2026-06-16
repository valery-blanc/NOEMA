import type { CollectionConfig } from 'payload'
import path from 'path'

// Médias téléversés depuis l'admin. Stockés dans /app/media (volume persistant `media_data`,
// monté aussi en lecture seule dans le service `publisher` → copiés dans le site statique).
export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      localized: true,
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
  },
}
