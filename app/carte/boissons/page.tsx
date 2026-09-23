import type { Metadata } from 'next'
import Image from 'next/image'
import './drinks.css'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { DrinksMenuGrid } from '@/src/components/organisms/drinks-menu-grid'
import { cloudinaryImage } from '@/lib/cloudinary'
import { DRINKS_BANNER_CLOUDINARY_PATH } from '@/lib/drinks-banner'
import { getI18n, localizeDrinks } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('carteBoissons')
}

export default async function CarteBoissonsPage() {
  const { dictionary } = await getI18n()
  const drinks = localizeDrinks(dictionary)
  const d = dictionary.drinks.page

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={d.eyebrow} title={d.title} text={d.text} />

        <section className="drinks-banner" aria-label={d.bannerAlt}>
          <Image
            className="drinks-banner-image"
            src={cloudinaryImage(DRINKS_BANNER_CLOUDINARY_PATH, 1200)}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={60}
            loading="lazy"
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
          href="/carte"
          cta={d.backCta}
          variant="to-carte"
        />
      </main>
      <Footer />
    </>
  )
}
