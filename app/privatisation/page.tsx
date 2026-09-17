import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { phoneDisplay, phoneTel, whatsappLink } from '@/lib/restaurant-data'
import { cloudinaryImage } from '@/lib/cloudinary'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

const PRIVATISATION_BANNER_PATH = 'v1787946632/489A2436_gqgbkp.jpg'

const PRIVATISATION_BANNER_SRC = cloudinaryImage(PRIVATISATION_BANNER_PATH, 640)
const PRIVATISATION_BANNER_SRCSET = [
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 640)} 640w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 960)} 960w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 1200)} 1200w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 1600)} 1600w`,
].join(', ')

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('privatisation')
}

export default async function Privatisation() {
  const { dictionary } = await getI18n()
  const p = dictionary.pages.privatisation

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />

        <section className="page-banner" aria-label={p.bannerAria}>
          <img
            className="page-banner__image"
            src={PRIVATISATION_BANNER_SRC}
            srcSet={PRIVATISATION_BANNER_SRCSET}
            sizes="100vw"
            alt={p.bannerAlt}
            width={1600}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="section">
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div className="privatisation-stats">
              <div className="privatisation-stat">
                <strong>{p.statPartialValue}</strong>
                <span style={{ whiteSpace: 'pre-line' }}>{p.statPartialLabel}</span>
              </div>
              <div className="privatisation-stat">
                <strong>{p.statTotalValue}</strong>
                <span style={{ whiteSpace: 'pre-line' }}>{p.statTotalLabel}</span>
              </div>
              <div className="privatisation-stat">
                <strong>{p.statQuoteValue}</strong>
                <span style={{ whiteSpace: 'pre-line' }}>{p.statQuoteLabel}</span>
              </div>
            </div>

            <h2 style={{ marginBottom: '16px', color: 'var(--foreground)', fontWeight: 400 }}>
              {p.formatsTitle}
            </h2>
            <ul className="privatisation-formats">
              {p.formats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="privatisation-photos">
              <Image
                src={cloudinaryImage('v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg', 800)}
                alt={p.photoAlts[0]}
                width={560}
                height={360}
                sizes="(max-width: 768px) 100vw, 440px"
                quality={60}
                loading="lazy"
              />
              <Image
                src={cloudinaryImage('v1787946632/489A2436_gqgbkp.jpg', 800)}
                alt={p.photoAlts[1]}
                width={560}
                height={360}
                sizes="(max-width: 768px) 100vw, 440px"
                quality={60}
                loading="lazy"
              />
            </div>

            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '5px',
                padding: '28px',
                marginBottom: '28px',
              }}
            >
              <h3 style={{ margin: '0 0 12px', color: 'var(--gold)', fontSize: '18px', fontWeight: 400 }}>
                {p.howTitle}
              </h3>
              <p style={{ color: 'var(--muted)', margin: '0 0 18px', lineHeight: 1.7 }}>
                {p.howText}
                <strong style={{ color: 'var(--foreground)' }}>{p.howStrong}</strong>.
              </p>
              <p style={{ margin: 0 }}>
                <a href={phoneTel} style={{ color: 'var(--gold)' }}>
                  {phoneDisplay}
                </a>
                {' · '}
                <Link
                  href={whatsappLink(p.whatsappQuoteMessage)}
                  style={{ color: 'var(--gold)' }}
                >
                  WhatsApp
                </Link>
              </p>
            </div>

            <BookingChannels title={p.bookingTitle} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
