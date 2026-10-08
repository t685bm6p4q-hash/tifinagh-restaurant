import type { Metadata } from 'next'
import Image from 'next/image'
import './drinks.css'
import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { DrinksMenuGrid } from '@/src/components/organisms/drinks-menu-grid'
import { cloudinaryImage } from '@/lib/cloudinary'
import { DRINKS_BANNER_CLOUDINARY_PATH } from '@/lib/drinks-banner'
import { initPageI18n, localeHref, localizeDrinks } from '@/lib/i18n'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'carteBoissons')
}

export default async function CarteBoissonsPage({ params }: LocalePageParams) {
  const { dictionary, locale } = await initPageI18n(params)
  const drinks = localizeDrinks(dictionary)
  const d = dictionary.drinks.page
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: dictionary.nav.carte, path: '/carte' },
    { name: d.title, path: '/carte/boissons' },
  ]
  return (
    <>
      <Header />
      <MainContent>
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro eyebrow={d.eyebrow} title={d.title} text={d.text} />

        <section className="drinks-banner" aria-label={d.bannerAlt}>
          <Image
            className="drinks-banner-image"
            src={cloudinaryImage(DRINKS_BANNER_CLOUDINARY_PATH, 1200)}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            unoptimized
            priority
          />
          <div className="drinks-banner-overlay" />
          <div className="drinks-banner-content">
            <h2 className="drinks-banner-title">{d.bannerTitle}</h2>
            <p className="drinks-banner-text">{d.bannerText}</p>
          </div>
        </section>

        <section className="drinks-page section">
          <p className="drinks-grid-lead">{d.gridLead}</p>
          <DrinksMenuGrid sections={drinks} columns={dictionary.drinks.columns} />
        </section>

        <MenuCrossLink
          eyebrow={d.backEyebrow}
          title={d.backTitle}
          text={d.backText}
          href={localeHref('/carte', locale)}
          cta={d.backCta}
          variant="to-carte"
        />

        <MenuCrossLink
          eyebrow={dictionary.carte.dailyInviteEyebrow}
          title={dictionary.carte.dailyInviteTitle}
          text={dictionary.carte.dailyInviteText}
          href={localeHref('/menu-du-jour', locale)}
          cta={dictionary.carte.dailyInviteCta}
          variant="to-daily"
        />
      </MainContent>
      <Footer />
    </>
  )
}
