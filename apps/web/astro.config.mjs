import { defineConfig } from 'astro/config'

// Front statique (SSG) — léger pour Avignon (8 Go RAM).
// i18n : toutes les langues préfixées (/fr /es /en /de), FR par défaut.
// Architecture scalable vers l'arabe (RTL) — FEAT-006.
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'http://localhost',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'es', 'en', 'de'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
})
