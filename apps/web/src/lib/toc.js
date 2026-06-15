// Construit le sommaire (table des matières) d'une page à partir de ses blocs.
// Chaque bloc portant un `sectionTitle` devient une entrée numérotée (folio).
export function buildToc(blocks = []) {
  let folio = 0
  const toc = []
  blocks.forEach((b, i) => {
    if (b?.sectionTitle) {
      folio++
      toc.push({ id: `section-${i}`, title: b.sectionTitle, folio })
    }
  })
  return toc
}

// Numéro de folio d'un bloc (ou null s'il n'ouvre pas de section).
export function folioFor(blocks = [], index = 0) {
  if (!blocks[index]?.sectionTitle) return null
  let folio = 0
  for (let i = 0; i <= index; i++) if (blocks[i]?.sectionTitle) folio++
  return folio
}

// Folio formaté sur 2 chiffres : 1 → « 01 ».
export const fmtFolio = (n) => (n == null ? '' : String(n).padStart(2, '0'))
