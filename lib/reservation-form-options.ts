import { localeMeta, type Locale } from '@/lib/i18n/config'
import { minReservationDateParis } from '@/lib/reservation-date'

const RESERVATION_DAYS_AHEAD = 60
const OPEN_HOUR = 10
const LAST_HOUR = 23

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

export type ReservationSelectOption = { value: string; label: string }

export function reservationDateChoices(locale: Locale): ReservationSelectOption[] {
  const start = minReservationDateParis()
  const htmlLang = localeMeta[locale].htmlLang
  const formatter = new Intl.DateTimeFormat(htmlLang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return Array.from({ length: RESERVATION_DAYS_AHEAD }, (_, index) => {
    const value = addDaysToIso(start, index)
    const label = formatter.format(new Date(`${value}T12:00:00`))
    return { value, label }
  })
}

function formatTimeLabel(locale: Locale, hour: number, minute: number): string {
  if (locale === 'fr' || locale === 'zgh' || locale === 'de') {
    return minute === 0 ? `${hour}h` : `${hour}h${String(minute).padStart(2, '0')}`
  }
  const date = new Date(2000, 0, 1, hour, minute)
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/** Créneaux toutes les 30 min (10h – 23h30), alignés sur l’ouverture du bistrot. */
export function reservationTimeChoices(locale: Locale): ReservationSelectOption[] {
  const options: ReservationSelectOption[] = []
  for (let hour = OPEN_HOUR; hour <= LAST_HOUR; hour++) {
    for (const minute of [0, 30]) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      options.push({ value, label: formatTimeLabel(locale, hour, minute) })
    }
  }
  return options
}
