/** ID de mesure GA4 — `NEXT_PUBLIC_GA_MEASUREMENT_ID` sur Vercel / `.env.local` */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim()

export const isGaConfigured =
  GA_MEASUREMENT_ID.length > 0 &&
  GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
  /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)

/**
 * Meta Pixel — identifiant numérique uniquement.
 * Tolère copier-coller depuis Events Manager (« ID » + retour ligne, espaces, guillemets).
 */
export function normalizeMetaPixelId(raw: string): string {
  const trimmed = raw.replace(/\uFEFF/g, '').trim()
  if (!trimmed) return ''

  const digitsOnly = trimmed.replace(/\D/g, '')
  if (digitsOnly.length >= 15 && digitsOnly.length <= 20) {
    return digitsOnly
  }

  const sequences = trimmed.match(/\d{10,20}/g)
  if (!sequences?.length) return ''
  return sequences.reduce((longest, part) => (part.length > longest.length ? part : longest), '')
}

/** Meta Pixel — `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel / `.env.local` */
export const META_PIXEL_ID = normalizeMetaPixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '')

export const isMetaPixelConfigured =
  META_PIXEL_ID.length >= 15 && META_PIXEL_ID.length <= 20 && META_PIXEL_ID !== '000000000000000'
