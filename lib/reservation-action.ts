'use server'

import { redirect } from 'next/navigation'
import { whatsappLink } from '@/lib/restaurant-data'

export async function submitHomeReservation(formData: FormData) {
  const nom = String(formData.get('nom') ?? '')
  const telephone = String(formData.get('telephone') ?? '')
  const date = String(formData.get('date') ?? '')
  const heure = String(formData.get('heure') ?? '')
  const personnes = String(formData.get('personnes') ?? '')
  const message = String(formData.get('message') ?? '')

  const text =
    `Bonjour, je souhaite réserver une table chez Tifinagh Montmartre.\n\n` +
    `Nom : ${nom}\nTéléphone : ${telephone}\nDate : ${date}\nHeure : ${heure}\n` +
    `Nombre de personnes : ${personnes}` +
    (message ? `\nMessage : ${message}` : '')

  redirect(whatsappLink(text))
}
