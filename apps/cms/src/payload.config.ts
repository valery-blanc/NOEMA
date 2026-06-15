import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Déclenche un rebuild du site statique via le service `publisher`.
// target = 'public' (site de prod) | 'preview' (site d'aperçu).
const triggerBuild = async (target: 'public' | 'preview') => {
  const base = process.env.PUBLISHER_URL || 'http://publisher:9000'
  const res = await fetch(`${base}/build/${target}`, {
    method: 'POST',
    headers: { 'x-token': process.env.PUBLISH_TOKEN || '' },
  })
  if (!res.ok) throw new Error(`publisher ${res.status}`)
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // Boutons « Aperçu » et « Publier » dans l'en-tête de l'admin.
      actions: ['/components/AdminActions#PreviewButton', '/components/AdminActions#PublishButton'],
    },
  },
  collections: [Users, Media, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || undefined,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // En dev : Payload synchronise le schéma automatiquement (pas de migration manuelle).
    // En prod : passer à des migrations versionnées (FEAT ultérieur).
    push: process.env.PAYLOAD_DB_PUSH !== 'false',
  }),
  sharp,
  // i18n : FR par défaut, architecture scalable (arabe/RTL prévu plus tard — FEAT-006).
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'es', label: 'Español' },
      { code: 'en', label: 'English' },
      { code: 'de', label: 'Deutsch' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  // Endpoints déclenchant les rebuilds (réservés aux admins connectés).
  endpoints: [
    {
      path: '/publish',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 403 })
        await triggerBuild('public')
        return Response.json({ ok: true })
      },
    },
    {
      path: '/preview',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 403 })
        await triggerBuild('preview')
        return Response.json({ ok: true, url: process.env.PREVIEW_SITE_URL })
      },
    },
  ],
  plugins: [],
})
