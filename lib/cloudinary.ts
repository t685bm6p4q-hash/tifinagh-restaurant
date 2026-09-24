const CLOUDINARY_BASE = 'https://res.cloudinary.com/dc9xmxpvv/image/upload'

/** URL Cloudinary redimensionnee a la source pour limiter le poids cote Next/Image. */
export function cloudinaryImage(path: string, width: number) {
  return `${CLOUDINARY_BASE}/w_${width},q_auto,f_auto/${path}`
}

/** Galerie : recadrage fixe (grille harmonisee), WebP/AVIF via f_auto. */
export function cloudinaryGalleryImage(path: string, width: number, height: number) {
  return `${CLOUDINARY_BASE}/c_fill,w_${width},h_${height},g_auto,q_auto,f_auto/${path}`
}
