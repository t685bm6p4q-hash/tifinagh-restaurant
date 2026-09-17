'use client'

import { FormEvent } from 'react'
import { whatsappLink } from '@/lib/restaurant-data'
import type { Dictionary } from '@/lib/i18n/types'

function MessageCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function ReservationWhatsAppForm({
  copy,
}: {
  copy: Dictionary['reservationPage']
}) {
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
      `${copy.whatsappIntro}` +
      `${copy.whatsappName} : ${nom}\n${copy.whatsappPhone} : ${telephone}\n${copy.whatsappDate} : ${date}\n${copy.whatsappTime} : ${heure}` +
      `\n${copy.whatsappGuests} : ${personnes}` +
      (message ? `\n${copy.whatsappMessage} : ${message}` : '')
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {copy.nameLabel}
        <input name="nom" required placeholder={copy.namePlaceholder} />
      </label>
      <label>
        {copy.phoneLabel}
        <input name="telephone" required type="tel" placeholder={copy.phonePlaceholder} />
      </label>
      <div className="form-row">
        <label>
          {copy.dateLabel}
          <input name="date" required type="date" />
        </label>
        <label>
          {copy.timeLabel}
          <input name="heure" required type="time" />
        </label>
      </div>
      <label>
        {copy.guestsLabel}
        <select name="personnes" defaultValue={copy.guestOptions[0]}>
          {copy.guestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        {copy.messageLabel}{' '}
        <span className="optional">{copy.messageOptional}</span>
        <textarea name="message" rows={4} placeholder={copy.messagePlaceholder} />
      </label>
      <button className="button button-whatsapp" type="submit">
        <MessageCircleIcon />
        {copy.submitButton}
      </button>
    </form>
  )
}
