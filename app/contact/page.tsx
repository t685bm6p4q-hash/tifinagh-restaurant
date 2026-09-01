import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { localSeoLinks, nearbyMetroStations } from '@/lib/restaurant-data'

export const metadata: Metadata = {
  title: 'Contact, adresse et accès à Montmartre',
  description:
    'Tifinagh Montmartre, 17 avenue Rachel, 75018 Paris. Téléphone, horaires et accès par les métros Blanche, Pigalle et Place de Clichy.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Nous trouver"
          title="Contact"
          text="Au cœur des Abbesses, à quelques pas du Sacré-Cœur."
        />

        <section className="contact-grid section">
          <div className="contact-card">
            <MapPin size={22} />
            <h2>Adresse</h2>
            <p>17 Av. Rachel<br />75018 Paris</p>
            <Link
              className="text-link"
              href="https://maps.google.com/?q=17+Av.+Rachel+75018+Paris"
              target="_blank"
              rel="noreferrer"
            >
              Voir l&apos;itinéraire <ArrowRight size={12} />
            </Link>
          </div>

          <div className="contact-card">
            <Phone size={22} />
            <h2>Téléphone</h2>
            <p>01 42 94 22 40</p>
            <p>Réponse du lundi au dimanche</p>
          </div>

          <div className="contact-card">
            <Clock size={22} />
            <h2>Horaires</h2>
            <p>
              Tous les jours<br />
              10h – 00h
            </p>
          </div>

          <div className="contact-card contact-transit">
            <MapPin size={22} />
            <h2>Stations de métro à proximité</h2>
            <ul className="contact-metro-list">
              {nearbyMetroStations.map((station) => (
                <li key={station.name}>
                  <span aria-hidden="true">🚇</span>
                  <span>
                    {station.name} (lignes {station.lines}) : {station.note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="contact-local-links">
              {localSeoLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? (
                    <span className="contact-local-sep" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <Link className="text-link" href={link.href}>
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="map-section section">
          <div>
            <p className="eyebrow">Le quartier</p>
            <h2>Nous trouver à Montmartre</h2>
            <p>À deux pas de Pigalle et du Cimetière de Montmartre.</p>
          </div>
          <iframe
            className="map-frame"
            title="Localisation de Tifinagh Montmartre"
            src="https://www.google.com/maps?q=17+Av.+Rachel,+75018+Paris&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
