import { isGaConfigured } from '@/lib/analytics-config'
import { hasAnalyticsConsent } from '@/lib/cookie-consent'
import { googleReserveUrl, phoneTel, whatsappNumber } from '@/lib/restaurant-data'

export function trackGaEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!isGaConfigured || !hasAnalyticsConsent() || typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}

export function trackOutboundConversion(href: string): void {
  if (href.startsWith(phoneTel) || href.startsWith('tel:')) {
    trackGaEvent('click_call', { link_url: href, method: 'phone' })
    return
  }
  if (href.includes(`wa.me/${whatsappNumber}`) || href.includes('api.whatsapp.com')) {
    trackGaEvent('click_whatsapp', { link_url: href, method: 'whatsapp' })
    return
  }
  if (href.startsWith(googleReserveUrl) || href.includes('google.com/maps/reserve')) {
    trackGaEvent('click_google_reserve', { link_url: href, method: 'google_reserve' })
  }
}
