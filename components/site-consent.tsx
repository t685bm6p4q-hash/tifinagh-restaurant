'use client'

import { Suspense } from 'react'
import { ConversionTracking } from '@/components/conversion-tracking'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { MetaPixel } from '@/components/meta-pixel'

/** Bandeau RGPD + GA4 / Meta Pixel — scripts hors chemin critique, uniquement après consentement. */
export function SiteConsent() {
  return (
    <>
      <CookieConsentBanner />
      <Suspense fallback={null}>
        <GoogleAnalytics />
        <MetaPixel />
        <ConversionTracking />
      </Suspense>
    </>
  )
}
