import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { cloudinaryImage } from '@/lib/cloudinary'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

const AROUND_BANNER_PATH =
  'v1788266025/bandeau-image-autour-de-nous-pigalle-montmartre-tifinagh_rqhety.png'

const AROUND_BANNER_SRC = cloudinaryImage(AROUND_BANNER_PATH, 640)
const AROUND_BANNER_SRCSET = [
  `${cloudinaryImage(AROUND_BANNER_PATH, 640)} 640w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 960)} 960w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 1200)} 1200w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 1600)} 1600w`,
].join(', ')

const localPageLinks = [
  { href: '/restaurant-montmartre', key: 'montmartre' as const },
  { href: '/restaurant-pigalle', key: 'pigalle' as const },
  { href: '/restaurant-place-de-clichy', key: 'clichy' as const },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('autourDeNous')
}

export default async function AutourDeNous() {
  const { dictionary } = await getI18n()
  const p = dictionary.pages.around

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />

        <section className="page-banner" aria-label={p.bannerAria}>
          <img
            className="page-banner__image"
            src={AROUND_BANNER_SRC}
            srcSet={AROUND_BANNER_SRCSET}
            sizes="100vw"
            alt={p.bannerAlt}
            width={1600}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="local-page section">
          <article className="local-card">
            <h2>{p.neighborhoodsTitle}</h2>
            <p>
              {p.neighborhoodsIntro1}
              <strong>{p.neighborhoodsIntroStrong}</strong>
              {p.neighborhoodsIntro2}
            </p>

            <ul className="around-links">
              {localPageLinks.map((page) => {
                const link = p.localLinks[page.key]
                return (
                  <li key={page.href}>
                    <Link href={page.href} className="around-link-card">
                      <strong>{link.title}</strong>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <LocalQuartierDetails dictionary={dictionary} />

            <p>
              {p.openPrefix}
              <strong>{p.openEveryDay}</strong>, {dictionary.common.hoursRange}.{' '}
              <Link href="/contact" className="text-link">
                {p.accessPlan}
              </Link>
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                {dictionary.home.bookTable}
              </Link>
              <Link className="text-link" href="/carte">
                {dictionary.home.fullMenuLink}
              </Link>
            </div>

            <BookingChannels title={p.contactUs} />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
