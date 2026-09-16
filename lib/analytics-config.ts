/** ID de mesure GA4 — `NEXT_PUBLIC_GA_MEASUREMENT_ID` sur Vercel / `.env.local` */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim()

export const isGaConfigured =
  GA_MEASUREMENT_ID.length > 0 &&
  GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
  /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)

/** Meta Pixel — `NEXT_PUBLIC_META_PIXEL_ID` sur Vercel / `.env.local` */
export const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '').trim()

export const isMetaPixelConfigured =
  META_PIXEL_ID.length > 0 &&
  META_PIXEL_ID !== '000000000000000' &&
  /^\d{10,20}$/.test(META_PIXEL_ID)
