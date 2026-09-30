import type { Dictionary } from '@/lib/i18n/types'

export type WhatsAppReservationFields = {
  nom: string
  telephone: string
  date: string
  heure: string
  personnes: string
  message?: string
}

type WhatsAppReservationCopy = Pick<
  Dictionary['reservationPage'],
  | 'whatsappIntro'
  | 'whatsappName'
  | 'whatsappPhone'
  | 'whatsappDate'
  | 'whatsappTime'
  | 'whatsappGuests'
  | 'whatsappMessage'
>

export function buildWhatsAppReservationMessage(
  copy: WhatsAppReservationCopy,
  fields: WhatsAppReservationFields,
): string {
  const message = fields.message?.trim()
  return (
    `${copy.whatsappIntro}` +
    `${copy.whatsappName} : ${fields.nom}\n${copy.whatsappPhone} : ${fields.telephone}\n${copy.whatsappDate} : ${fields.date}\n${copy.whatsappTime} : ${fields.heure}` +
    `\n${copy.whatsappGuests} : ${fields.personnes}` +
    (message ? `\n${copy.whatsappMessage} : ${message}` : '')
  )
}
