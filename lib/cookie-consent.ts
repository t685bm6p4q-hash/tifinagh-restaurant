export const COOKIE_CONSENT_STORAGE_KEY = 'tifinagh_cookie_consent'

export type CookieConsentStatus = 'accepted' | 'rejected'

export const COOKIE_CONSENT_ACCEPTED_EVENT = 'tifinagh:consent:accepted'
export const COOKIE_CONSENT_OPEN_EVENT = 'tifinagh:consent:open'

export function getCookieConsent(): CookieConsentStatus | null {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === 'accepted'
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))
}
