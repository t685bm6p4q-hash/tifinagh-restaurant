import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { MenuPdfViewer } from '@/components/menu-pdf-viewer'
import { phoneDisplay, phoneTel } from '@/lib/restaurant-data'
import {
  resolveDailyMenuIntroDisplay,
  resolveDailyMenuIntroText,
} from '@/lib/daily-menu-intro-text'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

/** Menu servi depuis Blob — pas de cache HTML statique. */
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary, locale } = await getI18n()
  const description = await resolveDailyMenuIntroText(locale, dictionary.dailyMenuPage)
  return buildPageMetadata('menuDuJour', undefined, { description })
}

export default async function MenuDuJour() {
  const { dictionary, locale } = await getI18n()
  const d = dictionary.dailyMenuPage
  const introDisplay = await resolveDailyMenuIntroDisplay(locale, d)
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: d.introTitle, path: '/menu-du-jour' },
  ]

  return (
    <>
      <Header />
      <MainContent className="menu-jour-page">
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro
          className="page-intro--menu-jour"
          eyebrow={d.introEyebrow}
          title={d.introTitle}
          belowTitle={
            introDisplay.kind === 'updated' ? (
              <p className="menu-jour-updated-at">{introDisplay.line}</p>
            ) : (
              <p>{introDisplay.line}</p>
            )
          }
        />

        <section className="section menu-pdf-section" aria-label={d.introTitle}>
          <MenuPdfViewer />
        </section>

        <section className="section menu-jour-info">
          <div className="menu-jour-info-inner">
            <p className="menu-jour-info-note">{d.limitedNote}</p>
            <Link className="button button-primary" href="/reservation" prefetch={false}>
              {d.bookNow}
            </Link>
          </div>
        </section>

        <MenuCrossLink
          eyebrow={d.carteInviteEyebrow}
          title={d.carteInviteTitle}
          text={d.carteInviteText}
          href="/carte"
          cta={d.carteInviteCta}
          variant="to-carte"
        />

        <MenuCrossLink
          eyebrow={dictionary.carte.drinksInviteEyebrow}
          title={dictionary.carte.drinksInviteTitle}
          text={dictionary.carte.drinksInviteText}
          href="/carte/boissons"
          cta={dictionary.carte.drinksInviteCta}
          variant="to-drinks"
        />

        <section className="section menu-jour-hours">
          <div className="menu-jour-hours-inner">
            <h2>{d.hoursTitle}</h2>
            <p>
              <strong>{dictionary.contact.hoursDays} :</strong> {dictionary.common.hoursRange}
            </p>
            <p className="menu-jour-phone">
              {d.phoneLabel}{' '}
              <a className="contact-phone-link" href={phoneTel}>
                {phoneDisplay}
              </a>
            </p>
          </div>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
