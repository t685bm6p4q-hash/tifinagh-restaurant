import type { Metadata } from 'next'
import { LocalizedLink } from '@/components/localized-link'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { getI18n } from '@/lib/i18n'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'restaurantPlaceDeClichy')
}

export default async function RestaurantPlaceDeClichy() {
  const { dictionary, locale } = await getI18n()
  const p = dictionary.pages.clichy
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: p.introTitle, path: '/restaurant-place-de-clichy' },
  ]

  return (
    <>
      <Header />
      <MainContent>
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
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
              <LocalizedLink className="button button-primary" href="/reservation" locale={locale}>
                {dictionary.home.bookTable}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/carte" locale={locale}>
                {dictionary.home.fullMenuLink}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/privatisation" locale={locale}>
                {p.privatizeLink}
              </LocalizedLink>
            </div>

            <BookingChannels title={p.bookingTitle} />
          </article>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
