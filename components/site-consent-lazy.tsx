'use client'

import dynamic from 'next/dynamic'

const SiteConsent = dynamic(
  () => import('@/components/site-consent').then((mod) => mod.SiteConsent),
  { ssr: false },
)

/** RGPD + analytics — chargé après hydratation (hors chemin critique mobile). */
export function SiteConsentLazy() {
  return <SiteConsent />
}
