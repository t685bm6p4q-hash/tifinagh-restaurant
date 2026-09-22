import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { googleMapsUrl } from '@/lib/restaurant-data'
import { getI18n, localizeMetro, localizeSeoLinks } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('contact')
}

export default async function Contact() {
  const { dictionary } = await getI18n()
  const metroStations = localizeMetro(dictionary)
  const seoLinks = localizeSeoLinks(dictionary)

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow={dictionary.contact.eyebrow}
          title={dictionary.contact.title}
          text={dictionary.contact.text}
        />

        <section className="contact-grid section">
          <div className="contact-card">
            <MapPin size={22} />
            <h2>{dictionary.contact.address}</h2>
            <p>17 Av. Rachel<br />75018 Paris</p>
            <Link
              className="text-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.common.directions} <ArrowRight size={12} />
            </Link>
          </div>

          <div className="contact-card">
            <Phone size={22} />
            <h2>{dictionary.contact.phone}</h2>
            <p>01 42 94 22 40</p>
            <p>{dictionary.contact.phoneNote}</p>
          </div>

          <div className="contact-card">
            <Clock size={22} />
            <h2>{dictionary.contact.hours}</h2>
            <p>
              {dictionary.contact.hoursDays}<br />
              {dictionary.common.hoursRange}
            </p>
          </div>

          <div className="contact-card contact-transit">
            <MapPin size={22} />
            <h2>{dictionary.contact.nearbyMetro}</h2>
            <ul className="contact-metro-list">
              {metroStations.map((station) => (
                <li key={station.name}>
                  <span aria-hidden="true">🚇</span>
                  <span>
                    {station.name} ({station.lines}) : {station.note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="contact-local-links">
              {seoLinks.map((link, index) => (
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
          <div className="map-section-copy">
            <p className="eyebrow">{dictionary.contact.mapEyebrow}</p>
            <h2>{dictionary.contact.mapTitle}</h2>
            <p className="map-section-lead">{dictionary.contact.mapText}</p>
            <p className="map-section-address">
              <span className="map-section-address-label">{dictionary.contact.address}</span>
              17 Av. Rachel
              <br />
              75018 Paris
            </p>
            <a
              className="map-section-cta text-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.common.directions} <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <iframe
            className="map-frame"
            title={dictionary.contact.mapIframeTitle}
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
