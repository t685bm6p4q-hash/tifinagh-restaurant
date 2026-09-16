'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentStatus,
} from '@/lib/cookie-consent'

export function CookieConsentBanner() {
  const [status, setStatus] = useState<CookieConsentStatus | null>(null)
  const [dismissed, setDismissed] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

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
      setDismissed(false)
      setShowDetails(true)
    }
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted')
    setStatus('accepted')
    setDismissed(true)
    window.dispatchEvent(new Event(COOKIE_CONSENT_ACCEPTED_EVENT))
  }

  const reject = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'rejected')
    setStatus('rejected')
    setDismissed(true)
    window.dispatchEvent(new CustomEvent('tifinagh:consent:revoked'))
  }

  if (dismissed) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="true"
      aria-label="Consentement cookies"
    >
      <div className="cookie-banner__panel">
        <p className="cookie-banner__title">Cookies & audience</p>
        <p className="cookie-banner__text">
          Les cookies essentiels permettent la navigation et la réservation. Google Analytics et
          le pixel Meta ne sont activés qu&apos;avec votre accord.{' '}
          <Link href="/mentions-legales" className="cookie-banner__link">
            En savoir plus
          </Link>
        </p>

        {showDetails && (
          <div className="cookie-banner__details">
            <p>
              <strong>Essentiels</strong> — langue, sécurité, hébergeur. Toujours actifs.
            </p>
            <p>
              <strong>Analytiques (GA4)</strong> — chargés uniquement après « Accepter » (13 mois max.,
              CNIL).
            </p>
            <p>
              <strong>Meta Pixel</strong> — Facebook / Instagram, uniquement après « Accepter ».
            </p>
            {status && (
              <p className="cookie-banner__muted">
                Choix actuel : {status === 'accepted' ? 'analytiques acceptés' : 'analytiques refusés'}
              </p>
            )}
          </div>
        )}

        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__btn cookie-banner__btn--primary" onClick={accept}>
            Accepter
          </button>
          <button type="button" className="cookie-banner__btn" onClick={reject}>
            Refuser
          </button>
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--ghost"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? 'Masquer' : 'Détails'}
          </button>
        </div>
      </div>
    </div>
  )
}
