'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { GA_MEASUREMENT_ID, isGaConfigured } from '@/lib/analytics-config'
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  hasAnalyticsConsent,
} from '@/lib/cookie-consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function revokeGaCookies(): void {
  if (typeof document === 'undefined') return
  const hostname = window.location.hostname
  document.cookie.split(';').forEach((part) => {
    const name = part.trim().split('=')[0]?.trim()
    if (!name || (!name.startsWith('_ga') && !name.startsWith('_gid'))) return
    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}`
  })
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consented, setConsented] = useState(false)

  const refreshConsent = useCallback(() => {
    setConsented(hasAnalyticsConsent())
  }, [])

  useEffect(() => {
    if (!isGaConfigured) return
    refreshConsent()
    window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refreshConsent)
    window.addEventListener('tifinagh:consent:revoked', () => {
      revokeGaCookies()
      setConsented(false)
    })
    return () => {
      window.removeEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refreshConsent)
    }
  }, [refreshConsent])

  useEffect(() => {
    if (!consented || !isGaConfigured || !window.gtag) return
    const query = searchParams.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [consented, pathname, searchParams])

  if (!isGaConfigured || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="tifinagh-ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}
