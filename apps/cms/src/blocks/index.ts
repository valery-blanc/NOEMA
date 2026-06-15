import type { Block } from 'payload'

// Blocs du page-builder NOÊMA (FEAT-004).
// Le champ `layout` de Pages est localisé → chaque langue a son propre jeu de blocs
// (structure + texte). Les champs internes ne portent donc PAS `localized`.
// `sectionTitle` (quand présent) alimente le folio + le sommaire vivant dans le rail.

const sectionTitle: Block['fields'][number] = {
  name: 'sectionTitle',
  type: 'text',
  admin: { description: 'Titre de section (apparaît dans le sommaire + folio en marge). Optionnel.' },
}

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: { fr: 'En-tête (hero)' }, plural: { fr: 'En-têtes' } },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Sur-titre court (capitales).' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
  ],
}

export const Prose: Block = {
  slug: 'prose',
  labels: { singular: { fr: 'Texte' }, plural: { fr: 'Textes' } },
  fields: [
    sectionTitle,
    { name: 'body', type: 'richText' },
    {
      name: 'note',
      type: 'textarea',
      admin: { description: 'Note de marge (marginalia) affichée à côté du texte. Optionnel.' },
    },
  ],
}

export const PullQuote: Block = {
  slug: 'pullquote',
  labels: { singular: { fr: 'Citation' }, plural: { fr: 'Citations' } },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
  ],
}

export const IndexList: Block = {
  slug: 'indexList',
  labels: { singular: { fr: 'Index / piliers' }, plural: { fr: 'Index' } },
  fields: [
    sectionTitle,
    {
      name: 'entries',
      type: 'array',
      labels: { singular: { fr: 'Entrée' }, plural: { fr: 'Entrées' } },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

export const Signature: Block = {
  slug: 'signature',
  labels: { singular: { fr: 'Signature fondatrice' }, plural: { fr: 'Signatures' } },
  fields: [
    sectionTitle,
    { name: 'name', type: 'text' },
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'textarea' },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait (optionnel ; emplacement réservé en attendant la séance photo).' },
    },
  ],
}

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: { fr: 'Appel à l’action' }, plural: { fr: 'Appels à l’action' } },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonHref', type: 'text', admin: { description: 'Lien (ex. /fr/contact/ ou mailto:).' } },
  ],
}

export const pageBlocks = [Hero, Prose, PullQuote, IndexList, Signature, CallToAction]
