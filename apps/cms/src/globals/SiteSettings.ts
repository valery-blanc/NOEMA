import type { GlobalConfig } from 'payload'

// Réglages globaux du site, lisibles publiquement (titre, baseline, contact).
// Localisés pour FR/ES/EN/DE. Sert de preuve de chaîne CMS → API → front.
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { fr: 'Réglages du site', en: 'Site settings', es: 'Ajustes', de: 'Einstellungen' },
  lockDocuments: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'NOÊMA',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Baseline affichée sous le nom (ex. « Maison intellectuelle »).',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
  ],
}
