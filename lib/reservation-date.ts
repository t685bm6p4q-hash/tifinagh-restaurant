/** Date minimale pour une réservation (jour courant à Paris, format HTML date). */
export function minReservationDateParis(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' })
}
