import { localeMeta, type Locale } from '@/lib/i18n/config'

const RESERVATION_DAYS_AHEAD = 60

/** Date minimale pour une réservation (jour courant à Paris, format HTML date). */
export function minReservationDateParis(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' })
}

/** Dernière date réservable (à partir d’aujourd’hui à Paris). */
export function maxReservationDateParis(): string {
  return addDaysToIso(minReservationDateParis(), RESERVATION_DAYS_AHEAD - 1)
}

export const reservationTimeMin = '10:00'
export const reservationTimeMax = '23:30'
/** Créneaux de 30 minutes (attribut HTML `step` en secondes). */
export const reservationTimeStepSeconds = 30 * 60

function addDaysToIso(iso: string, days: number): string {
  const parts = iso.split('-')
  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])
  const dt = new Date(y, m - 1, d + days)
  const yy = dt.getFullYear()
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

/** Libellé lisible pour le message WhatsApp. */
export function formatReservationDateLabel(isoDate: string, locale: Locale): string {
  const parts = isoDate.split('-')
  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])
  const dt = new Date(y, m - 1, d)
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dt)
}

export function formatReservationTimeLabel(hhmm: string, locale: Locale): string {
  const [hourPart, minutePart] = hhmm.split(':')
  const hour = Number(hourPart)
  const minute = Number(minutePart)
  if (locale === 'fr' || locale === 'zgh' || locale === 'de') {
    return minute === 0 ? `${hour}h` : `${hour}h${String(minute).padStart(2, '0')}`
  }
  const date = new Date(2000, 0, 1, hour, minute)
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
