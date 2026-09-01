import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { phoneDisplay, phoneTel, whatsappLink } from '@/lib/restaurant-data'
import { cloudinaryImage } from '@/lib/cloudinary'

const PRIVATISATION_BANNER_PATH = 'v1787946633/489A2441_yrctak.jpg'

const PRIVATISATION_BANNER_SRC = cloudinaryImage(PRIVATISATION_BANNER_PATH, 640)
const PRIVATISATION_BANNER_SRCSET = [
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 640)} 640w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 960)} 960w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 1200)} 1200w`,
  `${cloudinaryImage(PRIVATISATION_BANNER_PATH, 1600)} 1600w`,
].join(', ')

export const metadata: Metadata = {
  title: 'Privatisation du restaurant à Montmartre',
  description:
    'Privatisez Tifinagh Montmartre : partielle dès 15 couverts, totale jusqu’à 40. Anniversaires, entreprises, familles — sur devis.',
  alternates: { canonical: '/privatisation' },
}

export default function Privatisation() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Événements privés"
          title="Privatisation"
          text="Des chiffres clairs, des formats concrets, une salle prête pour votre soirée."
        />

        <section className="page-banner" aria-label="Salle privatisable Tifinagh Montmartre">
          <img
            className="page-banner__image"
            src={PRIVATISATION_BANNER_SRC}
            srcSet={PRIVATISATION_BANNER_SRCSET}
            sizes="100vw"
            alt="Salle d'événement privé élégante et spacieuse au restaurant Tifinagh Montmartre"
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
                <strong>15+</strong>
                <span>Privatisation partielle<br />dès 15 couverts</span>
              </div>
              <div className="privatisation-stat">
                <strong>40</strong>
                <span>Privatisation totale<br />jusqu&apos;à 40 couverts</span>
              </div>
              <div className="privatisation-stat">
                <strong>Sur devis</strong>
                <span>Menus &amp; budget<br />selon votre brief</span>
              </div>
            </div>

            <h2 style={{ marginBottom: '16px', color: 'var(--foreground)', fontWeight: 400 }}>
              Formats les plus demandés
            </h2>
            <ul className="privatisation-formats">
              <li>Anniversaires &amp; fêtes entre amis</li>
              <li>Repas d&apos;entreprise / afterwork</li>
              <li>Séminaires &amp; team building</li>
              <li>Repas de famille &amp; réunions</li>
              <li>Avant-spectacle (Pigalle / Moulin Rouge)</li>
              <li>Réceptions &amp; événements privés</li>
            </ul>

            <div className="privatisation-photos">
              <Image
                src={cloudinaryImage('v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg', 800)}
                alt="Salle privatisable du restaurant Tifinagh à Montmartre"
                width={560}
                height={360}
                sizes="(max-width: 768px) 100vw, 440px"
                quality={60}
                loading="lazy"
              />
              <Image
                src={cloudinaryImage('v1787946632/489A2436_gqgbkp.jpg', 800)}
                alt="Espace privatisation Tifinagh — salle intérieure élégante"
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
                Comment ça se passe ?
              </h3>
              <p style={{ color: 'var(--muted)', margin: '0 0 18px', lineHeight: 1.7 }}>
                Appelez-nous ou écrivez-nous avec la date, le nombre de convives et le type
                d&apos;événement. Nous revenons avec une proposition (menu, service, privatisation
                partielle ou totale) — <strong style={{ color: 'var(--foreground)' }}>toujours sur devis</strong>.
              </p>
              <p style={{ margin: 0 }}>
                <a href={phoneTel} style={{ color: 'var(--gold)' }}>
                  {phoneDisplay}
                </a>
                {' · '}
                <Link href={whatsappLink('Bonjour, je souhaite un devis de privatisation chez Tifinagh.')} style={{ color: 'var(--gold)' }}>
                  WhatsApp
                </Link>
              </p>
            </div>

            <BookingChannels title="Parler de votre événement" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
