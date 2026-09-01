import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { restaurant } from '@/lib/seo'

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
