const CLOUDINARY_BASE = 'https://res.cloudinary.com/dc9xmxpvv/image/upload'

/** URL Cloudinary redimensionnee a la source pour limiter le poids cote Next/Image. */
export function cloudinaryImage(path: string, width: number) {
  return `${CLOUDINARY_BASE}/w_${width},q_auto,f_auto/${path}`
}
