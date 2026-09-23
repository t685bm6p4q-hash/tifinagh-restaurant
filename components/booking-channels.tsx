import {
  googleMapsUrl,
  googleReserveUrl,
  pagesJaunesUrl,
  phoneDisplay,
  phoneTel,
  whatsappLink,
} from '@/lib/restaurant-data'
import { PagesJaunesIcon } from '@/components/pagesjaunes-logo'
import { getI18n, getUxExtra } from '@/lib/i18n'

const CHIP_ICON_SIZE = 20

function PhoneIcon({ size = CHIP_ICON_SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

/** Logo WhatsApp (rempli) — lisible sur fond vert. */
function WhatsAppIcon({ size = CHIP_ICON_SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/** "G" Google en SVG inline — zero requete reseau, zero impact LCP. */
function GoogleGIcon({ size = CHIP_ICON_SIZE }: { size?: number }) {
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
export async function BookingChannels({
  title,
  className = '',
}: BookingChannelsProps) {
  const { dictionary, locale } = await getI18n()
  const ux = getUxExtra(locale)
  const heading = title ?? dictionary.booking.title

  return (
    <div className={`booking-channels ${className}`.trim()}>
      {heading ? <p className="booking-channels-title">{heading}</p> : null}
      <p className="booking-channels-guide">{ux.bookingGuide}</p>
      <div className="booking-channels-row">
        <a className="booking-chip booking-chip-phone" href={phoneTel}>
          <span className="booking-chip-icon" aria-hidden="true">
            <PhoneIcon />
          </span>
          <span className="booking-chip-label">
            {dictionary.booking.call} · {phoneDisplay}
          </span>
        </a>
        <a
          className="booking-chip booking-chip-google"
          href={googleReserveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="booking-chip-icon" aria-hidden="true">
            <GoogleGIcon />
          </span>
          <span className="booking-chip-label">{dictionary.booking.google}</span>
        </a>
        <a
          className="booking-chip booking-chip-whatsapp"
          href={whatsappLink(dictionary.booking.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="booking-chip-icon" aria-hidden="true">
            <WhatsAppIcon />
          </span>
          <span className="booking-chip-label">{dictionary.booking.whatsapp}</span>
        </a>
      </div>
    </div>
  )
}

export async function GoogleReviewsBadge() {
  const { dictionary } = await getI18n()

  return (
    <a
      className="google-reviews-badge"
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dictionary.home.googleReviewsAria}
    >
      <GoogleGIcon size={18} />
      <span className="google-reviews-badge-text">
        <strong>{dictionary.home.googleReviewsTitle}</strong>
        <span>{dictionary.home.googleReviewsSubtitle}</span>
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
      <PagesJaunesIcon size={26} variant="wordmark" />
    </a>
  )
}
