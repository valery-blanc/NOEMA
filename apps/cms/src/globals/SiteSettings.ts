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
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Baseline (footer) — ex. « Maison de bibliothèques privées… ».',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'domain',
      type: 'text',
      admin: { description: 'Domaine affiché (ex. noema-library.ch).' },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      admin: { description: 'Lieu (ex. Genève, Suisse).' },
    },
  ],
}
