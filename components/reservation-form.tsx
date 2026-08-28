'use client'

import { FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/restaurant-data'

export function ReservationForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Bonjour, je souhaite réserver une table chez Tifinagh Montmartre.\n\nNom : ${data.get('nom')}\nTéléphone : ${data.get('telephone')}\nDate : ${data.get('date')}\nHeure : ${data.get('heure')}\nNombre de personnes : ${data.get('personnes')}${data.get('message') ? `\nMessage : ${data.get('message')}` : ''}`
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="home-reservation-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Nom<input name="nom" required placeholder="Votre nom" /></label>
        <label>Téléphone<input name="telephone" required type="tel" placeholder="06 00 00 00 00" /></label>
      </div>
      <div className="form-row">
        <label>Date<input name="date" required type="date" /></label>
        <label>Heure<input name="heure" required type="time" /></label>
      </div>
      <label>Nombre de personnes<select name="personnes" defaultValue="2 personnes"><option>2 personnes</option><option>3 personnes</option><option>4 personnes</option><option>5 personnes ou plus</option></select></label>
      <label>Message <span className="optional">(facultatif)</span><textarea name="message" rows={3} placeholder="Une occasion particulière ?" /></label>
      <button className="button button-whatsapp" type="submit"><MessageCircle size={18} aria-hidden="true" /> Réserver sur WhatsApp</button>
    </form>
  )
}
