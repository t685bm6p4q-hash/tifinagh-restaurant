import {
  googleMapsUrl,
  googleReserveUrl,
  pagesJaunesUrl,
  phoneDisplay,
  phoneTel,
  whatsappLink,
} from '@/lib/restaurant-data'
import { PagesJaunesIcon } from '@/components/icons'

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

/** "G" Google en SVG inline — zero requete reseau, zero impact LCP. */
function GoogleGIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

type BookingChannelsProps = {
  /** Affiche un titre court au-dessus des boutons. */
  title?: string
  className?: string
}

/**
 * 3 canaux de reservation — 100 % serveur, aucun JS, aucun asset externe.
 */
export function BookingChannels({
  title = 'Réservez en quelques secondes',
  className = '',
}: BookingChannelsProps) {
  return (
    <div className={`booking-channels ${className}`.trim()}>
      {title ? <p className="booking-channels-title">{title}</p> : null}
      <div className="booking-channels-row">
        <a className="booking-chip booking-chip-phone" href={phoneTel}>
          <PhoneIcon />
          Appeler · {phoneDisplay}
        </a>
        <a
          className="booking-chip booking-chip-google"
          href={googleReserveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleGIcon />
          Réserver avec Google
        </a>
        <a
          className="booking-chip booking-chip-whatsapp"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export function GoogleReviewsBadge() {
  return (
    <a
      className="google-reviews-badge"
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir les avis Google de Tifinagh Montmartre"
    >
      <GoogleGIcon size={18} />
      <span className="google-reviews-badge-text">
        <strong>Avis Google</strong>
        <span>Voir sur Google Maps</span>
      </span>
    </a>
  )
}

export function PagesJaunesReviewsBadge() {
  return (
    <a
      className="google-reviews-badge pagesjaunes-reviews-badge"
      href={pagesJaunesUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir la fiche PagesJaunes de Tifinagh Montmartre"
    >
      <PagesJaunesIcon size={22} variant="wordmark" />
    </a>
  )
}
