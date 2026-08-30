const HERO_PUBLIC_ID = 'v1787938428/489A1930_p9tklu'

/** Image LCP servie directement depuis le CDN Cloudinary (sans proxy /_next/image). */
export function heroImageUrl(width: number) {
  return `https://res.cloudinary.com/dc9xmxpvv/image/upload/f_auto,q_auto:good,w_${width}/${HERO_PUBLIC_ID}.jpg`
}

export const HERO_IMAGE_MOBILE = heroImageUrl(828)

export const HERO_IMAGE_SRCSET = [640, 828, 1080, 1920]
  .map((width) => `${heroImageUrl(width)} ${width}w`)
  .join(', ')
