import type { Metadata } from 'next'
import { LocalizedLink } from '@/components/localized-link'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { getI18n } from '@/lib/i18n'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'restaurantMontmartre')
}

export default async function RestaurantMontmartre() {
  const { dictionary, locale } = await getI18n()
  const p = dictionary.pages.montmartre
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: p.introTitle, path: '/restaurant-montmartre' },
  ]

  return (
    <>
      <Header />
      <MainContent>
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />

        <section className="local-page section">
          <article className="local-card">
            <LocalQuartierDetails dictionary={dictionary} />

            <h2>{p.distinguishTitle}</h2>
            <ul>
              {p.distinguishItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>{p.privatisationTitle}</h2>
            <p>{p.privatisationText}</p>

            <div className="local-actions">
              <LocalizedLink className="button button-primary" href="/reservation" locale={locale}>
                {dictionary.home.bookTable}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/carte" locale={locale}>
                {dictionary.home.fullMenuLink}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/galerie" locale={locale}>
                {p.photosLink}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/autour-de-nous" locale={locale}>
                {p.aroundLink}
              </LocalizedLink>
              <LocalizedLink className="text-link" href="/contact" locale={locale}>
                {p.accessContact}
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
