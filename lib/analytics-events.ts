import { isGaConfigured } from '@/lib/analytics-config'
import { hasAnalyticsConsent } from '@/lib/cookie-consent'
import { phoneTel, whatsappNumber } from '@/lib/restaurant-data'

const ONLINE_BOOKING_HOST = 'booking.ureserve.co'

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
  if (href.includes(ONLINE_BOOKING_HOST)) {
    trackGaEvent('click_online_booking', { link_url: href, method: 'ureserve' })
  }
}
