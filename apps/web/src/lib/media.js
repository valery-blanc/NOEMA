// Résout l'URL publique d'un média téléversé (Payload upload) pour le site statique.
// Les fichiers du CMS sont copiés dans /media/ du site (volume partagé) → on référence
// /media/<filename>. Repli sur une URL directe (champ texte) sinon.
export function mediaUrl(upload, fallback = null) {
  if (upload && typeof upload === 'object' && upload.filename) {
    return `/media/${upload.filename}`
  }
  return fallback
}
