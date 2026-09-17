import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('restaurantPigalle')
}

export default async function RestaurantPigalle() {
  const { dictionary } = await getI18n()
  const p = dictionary.pages.pigalle

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />

        <section className="local-page section">
          <article className="local-card">
            <h2>{p.whyTitle}</h2>
            <p>
              {p.whyP1Before}
              <strong>{p.whyStrong1}</strong>
              {p.whyP1Mid}
              <strong>{p.whyStrong2}</strong>
              {p.whyP1After}
            </p>

            <h2>{p.showTitle}</h2>
            <p>{p.showText}</p>

            <h2>{p.onSiteTitle}</h2>
            <ul>
              {p.onSiteItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>{p.directionsTitle}</h2>
            <p>{p.directionsText}</p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                {dictionary.home.bookTable}
              </Link>
              <Link className="text-link" href="/carte">
                {dictionary.home.fullMenuLink}
              </Link>
              <Link className="text-link" href="/contact">
                {p.accessContact}
              </Link>
            </div>

            <BookingChannels title={p.bookingTitle} />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
