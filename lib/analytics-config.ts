/** ID de mesure GA4 — `NEXT_PUBLIC_GA_MEASUREMENT_ID` sur Vercel / `.env.local` */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim()

export const isGaConfigured =
  GA_MEASUREMENT_ID.length > 0 &&
  GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
  /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)
