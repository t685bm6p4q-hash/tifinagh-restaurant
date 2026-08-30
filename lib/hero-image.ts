const HERO_PUBLIC_ID = 'v1787938428/489A1930_p9tklu'

/** Hero LCP : CDN Cloudinary direct (evite le proxy /_next/image). */
export function heroImageUrl(width: number) {
  return `https://res.cloudinary.com/dc9xmxpvv/image/upload/f_auto,q_auto:eco,w_${width}/${HERO_PUBLIC_ID}.jpg`
}

export const HERO_IMAGE_DEFAULT = heroImageUrl(828)

export const HERO_IMAGE_SRCSET = [640, 828, 1080]
  .map((width) => `${heroImageUrl(width)} ${width}w`)
  .join(', ')
