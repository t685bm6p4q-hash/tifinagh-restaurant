import type { Metadata } from 'next'
import './drinks.css'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { DrinksMenuGrid } from '@/src/components/organisms/drinks-menu-grid'
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

        <section className="drinks-page section">
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
