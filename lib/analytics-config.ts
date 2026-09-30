/** ID de mesure GA4 — `NEXT_PUBLIC_GA_MEASUREMENT_ID` sur Vercel / `.env.local` */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim()

export const isGaConfigured =
  GA_MEASUREMENT_ID.length > 0 &&
  GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
  /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)

/** Meta Pixel — chiffres uniquement (tolère « ID » ou retours ligne dans la variable Vercel). */
function normalizeMetaPixelId(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 20 ? digits : ''
}

/** Meta Pixel — `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel / `.env.local` */
export const META_PIXEL_ID = normalizeMetaPixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '')

export const isMetaPixelConfigured =
  META_PIXEL_ID.length > 0 && META_PIXEL_ID !== '000000000000000'
