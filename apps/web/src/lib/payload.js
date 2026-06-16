// Client minimal de l'API REST Payload, utilisé au build (SSG).
// CMS_INTERNAL_URL : URL interne du CMS (ex. http://cms:3000 dans Docker).
const CMS = process.env.CMS_INTERNAL_URL || 'http://localhost:3000'

async function getJSON(path) {
  const res = await fetch(`${CMS}${path}`)
  if (!res.ok) throw new Error(`CMS ${res.status} sur ${path}`)
  return res.json()
}

export function getSiteSettings(locale) {
  return getJSON(`/api/globals/site-settings?locale=${locale}&depth=0`)
}

// Pages du menu (showInNav), triées par navOrder croissant.
export async function getNavPages(locale) {
  const data = await getJSON(
    `/api/pages?where[showInNav][equals]=true&sort=navOrder&locale=${locale}&depth=0&limit=100`,
  )
  return data.docs ?? []
}

export async function getPageBySlug(slug, locale) {
  const data = await getJSON(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&locale=${locale}&depth=1&limit=1`,
  )
  return data.docs?.[0] ?? null
}

// Items du méga-menu Services : dérivés du 1er bloc `services` de la page « services ».
export async function getServicesItems(locale) {
  try {
    const page = await getPageBySlug('services', locale)
    const block = (page?.layout ?? []).find((b) => b.blockType === 'services')
    return (block?.items ?? []).map((it) => ({ title: it.title, text: it.text }))
  } catch {
    return []
  }
}
