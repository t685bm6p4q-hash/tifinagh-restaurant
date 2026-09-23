import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('restaurantMontmartre')
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
              <Link className="button button-primary" href="/reservation">
                {dictionary.home.bookTable}
              </Link>
              <Link className="text-link" href="/carte">
                {dictionary.home.fullMenuLink}
              </Link>
              <Link className="text-link" href="/galerie">
                {p.photosLink}
              </Link>
              <Link className="text-link" href="/autour-de-nous">
                {p.aroundLink}
              </Link>
              <Link className="text-link" href="/contact">
                {p.accessContact}
              </Link>
            </div>

            <BookingChannels title={p.bookingTitle} />
          </article>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
