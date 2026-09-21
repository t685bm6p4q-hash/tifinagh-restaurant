import type { Locale } from '@/lib/i18n/config'

export const RESERVATION_GUEST_MIN = 1
export const RESERVATION_GUEST_MAX = 16

export function reservationGuestCounts(): number[] {
  return Array.from(
    { length: RESERVATION_GUEST_MAX - RESERVATION_GUEST_MIN + 1 },
    (_, index) => RESERVATION_GUEST_MIN + index,
  )
}

/** Libellé d’une option « nombre de convives » pour les formulaires de réservation. */
export function formatReservationGuests(locale: Locale, count: number): string {
  switch (locale) {
    case 'fr':
      return count === 1 ? '1 personne' : `${count} personnes`
    case 'en':
      return count === 1 ? '1 guest' : `${count} guests`
    case 'es':
      return count === 1 ? '1 persona' : `${count} personas`
    case 'it':
      return count === 1 ? '1 persona' : `${count} persone`
    case 'de':
      return count === 1 ? '1 Person' : `${count} Personen`
    case 'pt':
      return count === 1 ? '1 pessoa' : `${count} pessoas`
    case 'ru':
      if (count === 1) return '1 гость'
      if (count >= 2 && count <= 4) return `${count} гостя`
      return `${count} гостей`
    case 'sv':
      return count === 1 ? '1 gäst' : `${count} gäster`
    case 'zh':
      return `${count} 人`
    case 'zgh':
      return count === 1 ? '1 ⵉⵎⵙⵙⵏⵉ' : `${count} ⵉⵎⵙⵙⵏⵉ`
    default:
      return count === 1 ? '1 personne' : `${count} personnes`
  }
}
