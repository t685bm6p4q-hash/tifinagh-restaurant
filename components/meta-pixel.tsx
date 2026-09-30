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
    <Script
      id="tifinagh-meta-pixel"
      src="/analytics/meta-pixel-init.js"
      data-pixel-id={META_PIXEL_ID}
      strategy="lazyOnload"
    />
  )
}
