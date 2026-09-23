import Link from 'next/link'
import { Header, Footer, MainContent } from '@/components/site-shell'
import { SiteConsentLazy } from '@/components/site-consent-lazy'
import { StickyCallBar } from '@/components/sticky-call-bar'
import { getI18n } from '@/lib/i18n'
import { getNotFoundCopy } from '@/lib/i18n/not-found-copy'

export default async function NotFound() {
  const { locale } = await getI18n()
  const copy = getNotFoundCopy(locale)

  return (
    <>
      <Header />
      <MainContent>
        <section className="page-intro not-found-page">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.text}</p>
          <div className="local-actions not-found-actions">
            <Link className="button button-primary" href="/">
              {copy.home}
            </Link>
            <Link className="text-link" href="/carte">
              {copy.carte}
            </Link>
            <Link className="text-link" href="/carte/boissons">
              {copy.drinks}
            </Link>
            <Link className="text-link" href="/reservation">
              {copy.reserve}
            </Link>
            <Link className="text-link" href="/contact">
              {copy.contact}
            </Link>
          </div>
        </section>
      </MainContent>
      <Footer />
      <StickyCallBar />
      <SiteConsentLazy />
    </>
  )
}
