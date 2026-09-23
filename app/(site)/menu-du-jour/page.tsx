import type { Metadata } from 'next'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { MenuPdfViewer } from '@/components/menu-pdf-viewer'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

/** Menu servi depuis Blob — pas de cache HTML statique. */
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('menuDuJour')
}

export default async function MenuDuJour() {
  const { dictionary, locale } = await getI18n()
  const d = dictionary.dailyMenuPage
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: d.introTitle, path: '/menu-du-jour' },
  ]

  return (
    <>
      <Header />
      <MainContent>
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro eyebrow={d.introEyebrow} title={d.introTitle} text={d.introText} />

        <MenuCrossLink
          eyebrow={dictionary.dailyMenuPage.carteInviteEyebrow}
          title={dictionary.dailyMenuPage.carteInviteTitle}
          text={dictionary.dailyMenuPage.carteInviteText}
          href="/carte"
          cta={dictionary.dailyMenuPage.carteInviteCta}
          variant="to-carte"
        />

        <section className="section menu-pdf-section" aria-label={d.introTitle}>
          <MenuPdfViewer />
        </section>

        <section className="section menu-jour-info">
          <div className="menu-jour-info-inner">
            <p className="menu-jour-info-note">{d.limitedNote}</p>
            <a
              href={`https://wa.me/33679045460?text=${encodeURIComponent(d.whatsappReserveMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-whatsapp"
            >
              {d.bookNow}
            </a>
          </div>
        </section>

        <section className="section menu-jour-hours">
          <div className="menu-jour-hours-inner">
            <h2>{d.hoursTitle}</h2>
            <p>
              <strong>{dictionary.contact.hoursDays} :</strong> {dictionary.common.hoursRange}
            </p>
            <p className="menu-jour-phone">
              {d.phoneLabel} <a href="tel:+33142942240">01 42 94 22 40</a>
            </p>
          </div>
        </section>

        <MenuCrossLink
          eyebrow={dictionary.dailyMenuPage.carteInviteEyebrow}
          title={dictionary.dailyMenuPage.carteInviteTitle}
          text={dictionary.dailyMenuPage.carteInviteText}
          href="/carte"
          cta={dictionary.dailyMenuPage.carteInviteCta}
          variant="to-carte"
        />
      </MainContent>
      <Footer />
    </>
  )
}
