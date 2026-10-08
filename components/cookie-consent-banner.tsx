'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentStatus,
} from '@/lib/cookie-consent'
import { localeHref } from '@/lib/i18n/locale-path'
import { localeFromHtmlLang } from '@/lib/i18n/locale-from-html-lang'
import { cookieBannerCopyForHtmlLang } from '@/lib/i18n/cookie-banner-copy'

/**
 * Bandeau non modal : la page reste utilisable, donc pas de piège à focus.
 * Ouvert à la demande (« Gérer les cookies »), il prend le focus et le rend à la fermeture.
 * Jamais rendu côté serveur (`dismissed` vaut true jusqu'au premier effet), d'où l'accès à `document`.
 */
export function CookieConsentBanner() {
  const [status, setStatus] = useState<CookieConsentStatus | null>(null)
  const [dismissed, setDismissed] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [openRequest, setOpenRequest] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as CookieConsentStatus | null
    if (stored === 'accepted' || stored === 'rejected') {
      setStatus(stored)
    } else {
      const t = window.setTimeout(() => setDismissed(false), 800)
      return () => window.clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const open = () => {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      setDismissed(false)
      setShowDetails(true)
      setOpenRequest((n) => n + 1)
    }
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
  }, [])

  useEffect(() => {
    if (openRequest === 0) return
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
  }, [openRequest])

  const close = () => {
    setDismissed(true)
    const target = returnFocusRef.current
    returnFocusRef.current = null
    if (target?.isConnected) target.focus({ preventScroll: true })
  }

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted')
    setStatus('accepted')
    close()
    window.dispatchEvent(new Event(COOKIE_CONSENT_ACCEPTED_EVENT))
  }

  const reject = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'rejected')
    setStatus('rejected')
    close()
    window.dispatchEvent(new CustomEvent('tifinagh:consent:revoked'))
  }

  if (dismissed) return null

  const copy = cookieBannerCopyForHtmlLang(document.documentElement.lang)
  const legalHref = localeHref(
    '/mentions-legales',
    localeFromHtmlLang(document.documentElement.lang),
  )

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner__panel" ref={panelRef}>
        <p className="cookie-banner__title" id="cookie-banner-title">
          {copy.title}
        </p>
        <p className="cookie-banner__text">
          {copy.text}{' '}
          <Link href={legalHref} className="cookie-banner__link">
            {copy.learnMore}
          </Link>
        </p>

        {showDetails && (
          <div className="cookie-banner__details" id="cookie-banner-details">
            <p>
              <strong>{copy.essentials}</strong> — {copy.essentialsText}
            </p>
            <p>
              <strong>{copy.analytics}</strong> — {copy.analyticsText}
            </p>
            <p>
              <strong>{copy.meta}</strong> — {copy.metaText}
            </p>
            {status && (
              <p className="cookie-banner__muted">
                {copy.currentChoice} {status === 'accepted' ? copy.accepted : copy.rejected}
              </p>
            )}
          </div>
        )}

        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__btn cookie-banner__btn--primary" onClick={accept}>
            {copy.accept}
          </button>
          <button type="button" className="cookie-banner__btn" onClick={reject}>
            {copy.reject}
          </button>
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--ghost"
            aria-expanded={showDetails}
            aria-controls="cookie-banner-details"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? copy.hide : copy.details}
          </button>
        </div>
      </div>
    </div>
  )
}
