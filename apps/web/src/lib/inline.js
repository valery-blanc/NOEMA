// Rendu d'un texte court avec un PETIT jeu de tags autorisés, sûr (allowlist).
// Autorisés : <i> <em> <b> <strong> <small> <u> <br> (et </…>, <br/>).
// Tout le reste est échappé (pas d'injection HTML). Les retours à la ligne réels → <br>.
const ALLOWED = 'i|em|b|strong|small|u|br'

export function inlineTags(input) {
  if (input == null) return ''
  let s = String(input)
  // échapper tout
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // restaurer uniquement les tags autorisés (ouvrants, fermants, auto-fermants)
  const re = new RegExp(`&lt;(/?)(${ALLOWED})\\s*/?&gt;`, 'gi')
  s = s.replace(re, (_m, slash, tag) => `<${slash}${tag.toLowerCase()}>`)
  // retours à la ligne réels saisis dans le champ → <br>
  s = s.replace(/\r?\n/g, '<br>')
  return s
}

// Vrai si le texte contient un des tags autorisés (utile si besoin).
export function hasTags(input) {
  return new RegExp(`<(/?)(${ALLOWED})\\s*/?>`, 'i').test(String(input ?? ''))
}
