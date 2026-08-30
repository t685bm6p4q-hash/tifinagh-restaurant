import Link from 'next/link'
import { whatsappLink } from '@/lib/restaurant-data'

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MessageCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            Tifinagh Montmartre
          </Link>
          <p>
            <MapPinIcon />
            17 Av. Rachel, 75018 Paris
          </p>
          <p>
            <PhoneIcon />
            01 42 94 22 40
          </p>
        </div>

        <div>
          <h2>Horaires d&apos;ouverture</h2>
          <span className="opening-days">Du lundi au dimanche</span>
          <span className="opening-hours">10h – 00h</span>
        </div>

        <div>
          <h2>Nous suivre</h2>
          <div className="social-links">
            <a
              href="https://instagram.com/tifinagh_restaurant"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Tifinagh"
            >
              <span className="instagram-mark" aria-hidden="true">◎</span>
            </a>
            <a
              href="https://facebook.com/profile.php?id=100068081029708"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Tifinagh"
            >
              <span className="facebook-mark" aria-hidden="true">f</span>
            </a>
          </div>
          <Link href={whatsappLink()} className="footer-link footer-link-inline">
            <MessageCircleIcon />
            Réserver sur WhatsApp
          </Link>
          <Link href="/mentions-legales" className="footer-link">
            Mentions légales
          </Link>
        </div>
      </div>

      <div className="copyright">
        © 2026 Tifinagh Montmartre. Bistro chic &amp; cuisine authentique.
      </div>
    </footer>
  )
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}
