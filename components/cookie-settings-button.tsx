'use client'

import { openCookieSettings } from '@/lib/cookie-consent'

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="footer-link"
      onClick={() => openCookieSettings()}
    >
      {label}
    </button>
  )
}
