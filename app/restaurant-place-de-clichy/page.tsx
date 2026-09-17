import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('restaurantPlaceDeClichy')
}

export default async function RestaurantPlaceDeClichy() {
  const { dictionary } = await getI18n()
  const p = dictionary.pages.clichy

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />

        <section className="local-page section">
          <article className="local-card">
            <h2>{p.metroTitle}</h2>
            <p>
              {p.metroP1Before}
              <strong>{p.metroStrong1}</strong>
              {p.metroP1After}
            </p>

            <h2>{p.accessTitle}</h2>
            <p>{p.accessText}</p>

            <h2>{p.audienceTitle}</h2>
            <ul>
              {p.audienceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>{p.hoursTitle}</h2>
            <p>
              {p.hoursTextBefore}
              <strong>{p.hoursEveryDay}</strong>
              {p.hoursTextAfter}
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                {dictionary.home.bookTable}
              </Link>
              <Link className="text-link" href="/carte">
                {dictionary.home.fullMenuLink}
              </Link>
              <Link className="text-link" href="/privatisation">
                {p.privatizeLink}
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
