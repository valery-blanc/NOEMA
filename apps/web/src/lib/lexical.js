// Sérialiseur minimal Lexical (Payload richText) → HTML.
// Couvre paragraphes, titres, listes, citations, liens, gras/italique/souligné.
// (Le rendu riche complet viendra avec le page-builder à blocs — FEAT-004.)
function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
}

function renderText(n) {
  let t = esc(n.text)
  const f = n.format || 0
  if (f & 1) t = `<strong>${t}</strong>`
  if (f & 2) t = `<em>${t}</em>`
  if (f & 8) t = `<u>${t}</u>`
  return t
}

function renderChildren(n) {
  return (n.children || []).map(renderNode).join('')
}

function renderNode(n) {
  switch (n.type) {
    case 'text':
      return renderText(n)
    case 'linebreak':
      return '<br>'
    case 'paragraph': {
      const c = renderChildren(n)
      return c ? `<p>${c}</p>` : ''
    }
    case 'heading':
      return `<${n.tag || 'h2'}>${renderChildren(n)}</${n.tag || 'h2'}>`
    case 'quote':
      return `<blockquote>${renderChildren(n)}</blockquote>`
    case 'list':
      return `<${n.listType === 'number' ? 'ol' : 'ul'}>${renderChildren(n)}</${n.listType === 'number' ? 'ol' : 'ul'}>`
    case 'listitem':
      return `<li>${renderChildren(n)}</li>`
    case 'link':
      return `<a href="${esc(n.fields?.url || '#')}">${renderChildren(n)}</a>`
    default:
      return renderChildren(n)
  }
}

export function lexicalToHtml(value) {
  const root = value?.root || value
  if (!root || !root.children) return ''
  return root.children.map(renderNode).join('')
}

// Rendu INLINE (sans <p>) : pour un titre/citation mis en forme.
// Les paragraphes sont séparés par un retour à la ligne (<br>), le gras/italique conservés.
export function lexicalToInlineHtml(value) {
  const root = value?.root || value
  if (!root || !root.children) return ''
  return root.children
    .map((n) => (n.type === 'paragraph' ? renderChildren(n) : renderNode(n)))
    .filter(Boolean)
    .join('<br>')
}

// Vrai si le richText contient au moins un texte non vide.
export function lexicalHasContent(value) {
  return lexicalToInlineHtml(value).replace(/<[^>]*>/g, '').trim().length > 0
}
