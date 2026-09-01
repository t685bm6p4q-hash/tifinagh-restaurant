import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { cloudinaryImage } from '@/lib/cloudinary'
import { restaurant } from '@/lib/seo'

const AROUND_BANNER_PATH =
  'v1788266025/bandeau-image-autour-de-nous-pigalle-montmartre-tifinagh_rqhety.png'

const AROUND_BANNER_SRC = cloudinaryImage(AROUND_BANNER_PATH, 640)
const AROUND_BANNER_SRCSET = [
  `${cloudinaryImage(AROUND_BANNER_PATH, 640)} 640w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 960)} 960w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 1200)} 1200w`,
  `${cloudinaryImage(AROUND_BANNER_PATH, 1600)} 1600w`,
].join(', ')

const localPages = [
  {
    href: '/restaurant-montmartre',
    title: 'Montmartre & Sacré-Cœur',
    text: 'Au pied de la butte, au calme de l’avenue Rachel — loin du tumulte touristique direct.',
  },
  {
    href: '/restaurant-pigalle',
    title: 'Pigalle & Moulin Rouge',
    text: 'À quelques minutes à pied de Pigalle : idéal avant ou après un spectacle.',
  },
  {
    href: '/restaurant-place-de-clichy',
    title: 'Place de Clichy',
    text: 'Sortie métro lignes 2 et 13 : un repas fait maison sans traverser tout Montmartre.',
  },
] as const

export const metadata: Metadata = {
  title: 'Autour de nous — Montmartre, théâtres, cinémas et métro',
  description:
    'Tifinagh au 17 avenue Rachel : près du cimetière de Montmartre, théâtres, cinémas Pathé Wepler, métros Clichy, Blanche et Pigalle. Pause gourmande au calme.',
  alternates: { canonical: '/autour-de-nous' },
}

export default function AutourDeNous() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Paris 18"
          title="Autour de nous"
          text="Un bistrot de quartier au 17 avenue Rachel — entre Montmartre, Pigalle et la Place de Clichy."
        />

        <section className="page-banner" aria-label="Montmartre, Pigalle et le quartier">
          <img
            className="page-banner__image"
            src={AROUND_BANNER_SRC}
            srcSet={AROUND_BANNER_SRCSET}
            sizes="100vw"
            alt="Panorama de nuit : Sacré-Cœur, Moulin Rouge, théâtres et rues de Montmartre et Pigalle"
            width={1600}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="local-page section">
          <article className="local-card">
            <h2>Nos quartiers</h2>
            <p>
              Tifinagh se situe dans une impasse calme, à distance de marche des grands axes du
              18<sup>e</sup>. Que vous veniez de Montmartre, Pigalle ou Clichy, vous trouvez ici une{' '}
              <strong>cuisine française traditionnelle</strong>, 100&nbsp;% maison.
            </p>

            <ul className="around-links">
              {localPages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="around-link-card">
                    <strong>{page.title}</strong>
                    <span>{page.text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <LocalQuartierDetails />

            <p>
              Ouvert <strong>tous les jours</strong>, {restaurant.openingHours.labelHours}.{' '}
              <Link href="/contact" className="text-link">
                Accès &amp; plan
              </Link>
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte">
                Voir la carte
              </Link>
            </div>

            <BookingChannels title="Nous contacter" />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
