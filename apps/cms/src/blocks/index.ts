import type { Block } from 'payload'

// Blocs du page-builder NOÊMA (charte Claude Design — home + pages Philosophie/Services/À propos/Contact).
// `layout` (Pages) est localisé → un jeu de blocs par langue ; champs internes non localisés.

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: { fr: 'Hero / bandeau' }, plural: { fr: 'Heros' } },
  fields: [
    { name: 'variant', type: 'select', defaultValue: 'cream', options: [
      { label: 'Crème', value: 'cream' }, { label: 'Pétrole', value: 'petrol' }, { label: 'Image plein écran', value: 'media' },
    ] },
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading', type: 'text', required: true,
      admin: { description: 'Titre. Tags autorisés : <i>italique</i>, <b>gras</b>, <small>plus petit</small>, <br/> (saut de ligne). Ex. citation : <i>« … »</i><br/><small>Auteur</small>' },
    },
    { name: 'intro', type: 'textarea', admin: { description: 'Tags autorisés : <i>, <b>, <small>, <br/>.' } },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Image de fond (hero plein écran, variante « media » — ex. accueil).' } },
    { name: 'imageUrl', type: 'text', admin: { description: 'URL d’image de fond directe si pas d’upload (ex. /literature_cafe.jpg).' } },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'portraitUrl', type: 'text', admin: { description: 'URL d’image directe si pas d’upload.' } },
    { name: 'portraitCaption', type: 'text' },
    { name: 'comingSoon', type: 'text', admin: { description: 'Étiquette « à venir » sur l’emplacement photo. Optionnel.' } },
  ],
}

export const Statement: Block = {
  slug: 'statement',
  labels: { singular: { fr: 'Conviction (texte)' }, plural: { fr: 'Convictions' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'lead', type: 'textarea', admin: { description: 'Phrase forte (grande serif).' } },
    { name: 'body', type: 'richText' },
  ],
}

export const Manifesto: Block = {
  slug: 'manifesto',
  labels: { singular: { fr: 'Manifeste (I·II·III·IV)' }, plural: { fr: 'Manifestes' } },
  fields: [
    {
      name: 'items', type: 'array',
      labels: { singular: { fr: 'Conviction' }, plural: { fr: 'Convictions' } },
      fields: [
        { name: 'term', type: 'text', required: true },
        { name: 'caption', type: 'text' },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

export const Values: Block = {
  slug: 'values',
  labels: { singular: { fr: 'Valeurs (home)' }, plural: { fr: 'Valeurs' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'rows', type: 'array', fields: [
      { name: 'term', type: 'text', required: true },
      { name: 'caption', type: 'text' },
    ] },
  ],
}

export const Services: Block = {
  slug: 'services',
  labels: { singular: { fr: 'Services (bande, home)' }, plural: { fr: 'Services' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'items', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
    ] },
  ],
}

export const ServiceDetail: Block = {
  slug: 'serviceDetail',
  labels: { singular: { fr: 'Services détaillés (lignes)' }, plural: { fr: 'Services détaillés' } },
  fields: [
    {
      name: 'items', type: 'array',
      labels: { singular: { fr: 'Métier' }, plural: { fr: 'Métiers' } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        { name: 'tags', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
        { name: 'imageCaption', type: 'text' },
        { name: 'imageUrl', type: 'text' },
        { name: 'comingSoon', type: 'text' },
      ],
    },
  ],
}

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: { fr: 'Démarche (étapes)' }, plural: { fr: 'Démarches' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'items', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
    ] },
  ],
}

export const Milestones: Block = {
  slug: 'milestones',
  labels: { singular: { fr: 'Jalons (parcours)' }, plural: { fr: 'Jalons' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'items', type: 'array', fields: [
      { name: 'tag', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
    ] },
  ],
}

export const Story: Block = {
  slug: 'story',
  labels: { singular: { fr: 'Récit (parcours)' }, plural: { fr: 'Récits' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'signatureName', type: 'text' },
    { name: 'role', type: 'text' },
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  labels: { singular: { fr: 'Réalisations' }, plural: { fr: 'Réalisations' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'items', type: 'array', fields: [
      { name: 'caption', type: 'text', required: true },
      { name: 'tag', type: 'text' },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'imageUrl', type: 'text' },
    ] },
  ],
}

export const Founder: Block = {
  slug: 'founder',
  labels: { singular: { fr: 'Fondatrice (home)' }, plural: { fr: 'Fondatrices' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'signatureName', type: 'text' },
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
    { name: 'note', type: 'textarea' },
  ],
}

export const PullQuote: Block = {
  slug: 'pullquote',
  labels: { singular: { fr: 'Citation' }, plural: { fr: 'Citations' } },
  fields: [
    { name: 'variant', type: 'select', defaultValue: 'cream', options: [
      { label: 'Crème', value: 'cream' }, { label: 'Pétrole', value: 'petrol' },
    ] },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
  ],
}

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: { fr: 'Appel à l’action' }, plural: { fr: 'Appels' } },
  fields: [
    { name: 'variant', type: 'select', defaultValue: 'petrol', options: [
      { label: 'Pétrole', value: 'petrol' }, { label: 'Crème (ligne)', value: 'inline' },
    ] },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonHref', type: 'text' },
  ],
}

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: { singular: { fr: 'Contact (formulaire)' }, plural: { fr: 'Contacts' } },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'nameLabel', type: 'text' },
    { name: 'emailLabel', type: 'text' },
    { name: 'projectLabel', type: 'text' },
    { name: 'projectOptions', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'messageLabel', type: 'text' },
    { name: 'messagePlaceholder', type: 'text' },
    { name: 'submitLabel', type: 'text' },
    { name: 'writeLabel', type: 'text' },
    { name: 'meetLabel', type: 'text' },
    { name: 'meetLocation', type: 'text' },
    { name: 'meetNote', type: 'text' },
    { name: 'langsLabel', type: 'text' },
    { name: 'langsValue', type: 'text' },
  ],
}

export const pageBlocks = [
  Hero, Statement, Manifesto, Values, Services, ServiceDetail, Steps, Milestones,
  Story, Gallery, Founder, Prose, PullQuote, CallToAction, ContactForm,
]
