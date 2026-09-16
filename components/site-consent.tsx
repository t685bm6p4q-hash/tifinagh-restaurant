'use client'

import { Suspense } from 'react'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'

/** Bandeau RGPD + GA4 (afterInteractive) — bundle client isolé, hors chemin critique. */
export function SiteConsent() {
  return (
    <>
      <CookieConsentBanner />
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  )
}
