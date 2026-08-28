'use client'

import { FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { whatsappLink } from '@/lib/restaurant-data'

export default function Reservation() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nom = data.get('nom')
    const telephone = data.get('telephone')
    const date = data.get('date')
    const heure = data.get('heure')
    const personnes = data.get('personnes')
    const message = data.get('message')
    const text =
      `Bonjour, je souhaite réserver une table chez Tifinagh Montmartre.%0A%0A` +
      `Nom : ${nom}%0ATéléphone : ${telephone}%0ADate : ${date}%0AHeure : ${heure}` +
      `%0ANombre de personnes : ${personnes}` +
      (message ? `%0AMessage : ${message}` : '')
    window.open(whatsappLink(decodeURIComponent(text)), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Votre table"
          title="Réserver"
          text="Indiquez-nous vos envies, nous vous répondrons rapidement sur WhatsApp."
        />
        <section className="form-wrap section">
          <form onSubmit={handleSubmit}>
            <label>
              Nom
              <input name="nom" required placeholder="Votre nom" />
            </label>
            <label>
              Téléphone
              <input name="telephone" required type="tel" placeholder="06 00 00 00 00" />
            </label>
            <div className="form-row">
              <label>
                Date
                <input name="date" required type="date" />
              </label>
              <label>
                Heure
                <input name="heure" required type="time" />
              </label>
            </div>
            <label>
              Nombre de personnes
              <select name="personnes" defaultValue="2 personnes">
                <option>2 personnes</option>
                <option>3 personnes</option>
                <option>4 personnes</option>
                <option>5 personnes ou plus</option>
              </select>
            </label>
            <label>
              Message <span className="optional">(facultatif)</span>
              <textarea name="message" rows={4} placeholder="Une occasion particulière ?" />
            </label>
            <button className="button button-whatsapp" type="submit">
              <MessageCircle size={18} aria-hidden="true" />
              Réserver sur WhatsApp
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
