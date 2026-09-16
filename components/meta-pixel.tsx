'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { META_PIXEL_ID, isMetaPixelConfigured } from '@/lib/analytics-config'
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  hasAnalyticsConsent,
} from '@/lib/cookie-consent'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

function revokeMetaPixelCookies(): void {
  if (typeof document === 'undefined') return
  window.fbq?.('consent', 'revoke')
  const hostname = window.location.hostname
  document.cookie.split(';').forEach((part) => {
    const name = part.trim().split('=')[0]?.trim()
    if (!name || (name !== '_fbp' && name !== '_fbc')) return
    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}`
  })
}

export function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consented, setConsented] = useState(false)
  const previousPath = useRef<string | null>(null)

  const refreshConsent = useCallback(() => {
    setConsented(hasAnalyticsConsent())
  }, [])

  useEffect(() => {
    if (!isMetaPixelConfigured) return
    refreshConsent()
    const onRevoke = () => {
      revokeMetaPixelCookies()
      previousPath.current = null
      setConsented(false)
    }
    window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refreshConsent)
    window.addEventListener('tifinagh:consent:revoked', onRevoke)
    return () => {
      window.removeEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refreshConsent)
      window.removeEventListener('tifinagh:consent:revoked', onRevoke)
    }
  }, [refreshConsent])

  useEffect(() => {
    if (!consented) {
      previousPath.current = null
      return
    }
    const pagePath = searchParams.toString() ? `${pathname}?${searchParams}` : pathname
    const isSpaNavigation = previousPath.current !== null && previousPath.current !== pagePath
    previousPath.current = pagePath
    if (!isSpaNavigation || !window.fbq) return
    window.fbq('track', 'PageView')
  }, [consented, pathname, searchParams])

  if (!isMetaPixelConfigured || !consented) return null

  return (
    <Script id="tifinagh-meta-pixel" strategy="lazyOnload">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent','grant');
        fbq('init','${META_PIXEL_ID}');
        fbq('track','PageView');
      `}
    </Script>
  )
}
