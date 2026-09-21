'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  hasAnalyticsConsent,
} from '@/lib/cookie-consent'
import { isGaConfigured } from '@/lib/analytics-config'
import { trackOutboundConversion } from '@/lib/analytics-events'

/** Enregistre les clics tel / WhatsApp / Google Reserve après consentement analytics. */
export function ConversionTracking() {
  const [active, setActive] = useState(false)

  const refresh = useCallback(() => {
    setActive(isGaConfigured && hasAnalyticsConsent())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refresh)
    window.addEventListener('tifinagh:consent:revoked', refresh)
    return () => {
      window.removeEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, refresh)
      window.removeEventListener('tifinagh:consent:revoked', refresh)
    }
  }, [refresh])

  useEffect(() => {
    if (!active) return

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return
      trackOutboundConversion(href)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [active])

  return null
}
