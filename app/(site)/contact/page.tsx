import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@/components/icons'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { googleMapsEmbedUrl, googleMapsUrl } from '@/lib/restaurant-data'
import { getI18n, getUxExtra, localizeMetro, localizeSeoLinks } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('contact')
}

export default async function Contact() {
  const { dictionary, locale } = await getI18n()
  const ux = getUxExtra(locale)
  const metroStations = localizeMetro(dictionary)
  const seoLinks = localizeSeoLinks(dictionary)
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: dictionary.contact.title, path: '/contact' },
  ]

  return (
    <>
      <Header />
      <MainContent>
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro
          eyebrow={dictionary.contact.eyebrow}
          title={dictionary.contact.title}
          text={dictionary.contact.text}
        />

        <section className="contact-grid section">
          <div className="contact-card">
            <MapPinIcon size={22} />
            <h2>{dictionary.contact.address}</h2>
            <p>17 Av. Rachel<br />75018 Paris</p>
            <Link
              className="text-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.common.directions} <ArrowRightIcon size={12} />
            </Link>
          </div>

          <div className="contact-card">
            <PhoneIcon size={22} />
            <h2>{dictionary.contact.phone}</h2>
            <p>01 42 94 22 40</p>
            <p>{dictionary.contact.phoneNote}</p>
          </div>

          <div className="contact-card">
            <ClockIcon size={22} />
            <h2>{dictionary.contact.hours}</h2>
            <p>
              {dictionary.contact.hoursDays}<br />
              {dictionary.common.hoursRange}
            </p>
          </div>

          <div className="contact-card contact-transit">
            <MapPinIcon size={22} />
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

        <section className="section contact-practical" aria-labelledby="contact-practical-title">
          <div className="contact-practical-inner">
            <h2 id="contact-practical-title">{ux.practical.title}</h2>
            <ul className="contact-practical-list">
              {ux.practical.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
              {dictionary.common.directions} <ArrowRightIcon size={14} />
            </a>
          </div>
          <div className="map-section-map map-frame">
            <iframe
              className="map-section-iframe"
              title={dictionary.contact.mapIframeTitle}
              src={googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
