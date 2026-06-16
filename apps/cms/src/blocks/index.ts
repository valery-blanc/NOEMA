import type { Block } from 'payload'

// Blocs du page-builder NOÊMA (charte Claude Design).
// `layout` (Pages) est localisé → un jeu de blocs par langue ; champs internes non localisés.

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: { fr: 'Hero (image)' }, plural: { fr: 'Heros' } },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Sur-titre mono (lieu / mention).' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text', admin: { description: 'Lien du bouton (ex. /fr/contact/).' } },
  ],
}

export const Values: Block = {
  slug: 'values',
  labels: { singular: { fr: 'Valeurs / philosophie' }, plural: { fr: 'Valeurs' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'rows',
      type: 'array',
      labels: { singular: { fr: 'Ligne' }, plural: { fr: 'Lignes' } },
      fields: [
        { name: 'term', type: 'text', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

export const Services: Block = {
  slug: 'services',
  labels: { singular: { fr: 'Services (bande pétrole)' }, plural: { fr: 'Services' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      labels: { singular: { fr: 'Service' }, plural: { fr: 'Services' } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  labels: { singular: { fr: 'Réalisations' }, plural: { fr: 'Réalisations' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      labels: { singular: { fr: 'Réalisation' }, plural: { fr: 'Réalisations' } },
      fields: [
        { name: 'caption', type: 'text', required: true },
        { name: 'tag', type: 'text', admin: { description: 'Mention (ex. « à venir »). Optionnel.' } },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text', admin: { description: 'URL d’image directe (ex. /literature_cafe.jpg) si pas d’upload.' } },
      ],
    },
  ],
}

export const Founder: Block = {
  slug: 'founder',
  labels: { singular: { fr: 'Fondatrice' }, plural: { fr: 'Fondatrices' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'signatureName', type: 'text', admin: { description: 'Nom en script (signature).' } },
    { name: 'role', type: 'text' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
  ],
}

export const Prose: Block = {
  slug: 'prose',
  labels: { singular: { fr: 'Texte' }, plural: { fr: 'Textes' } },
  fields: [
    { name: 'sectionTitle', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'note', type: 'textarea', admin: { description: 'Note de marge. Optionnel.' } },
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

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: { fr: 'Appel à l’action' }, plural: { fr: 'Appels' } },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonHref', type: 'text' },
  ],
}

export const pageBlocks = [Hero, Values, Services, Gallery, Founder, Prose, PullQuote, CallToAction]
