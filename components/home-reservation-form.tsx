import { submitHomeReservation } from '@/lib/reservation-action'

function MessageCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function HomeReservationForm() {
  return (
    <form className="home-reservation-form" action={submitHomeReservation}>
      <div className="form-row">
        <label>
          Nom
          <input name="nom" required placeholder="Votre nom" />
        </label>
        <label>
          Téléphone
          <input name="telephone" required type="tel" placeholder="06 00 00 00 00" />
        </label>
      </div>
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
        <textarea name="message" rows={3} placeholder="Une occasion particulière ?" />
      </label>
      <button className="button button-whatsapp" type="submit">
        <MessageCircleIcon /> Réserver sur WhatsApp
      </button>
    </form>
  )
}
