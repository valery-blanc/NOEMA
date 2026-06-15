import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  lockDocuments: false,
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
