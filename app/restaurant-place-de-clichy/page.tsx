import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { restaurant } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Restaurant Place de Clichy — bistrot français Paris 17/18',
  description:
    'Restaurant Tifinagh près de la Place de Clichy : bistrot français traditionnel, plats faits maison, accès métro lignes 2 et 13, au calme de l’avenue Rachel.',
  keywords: [
    'restaurant Place de Clichy',
    'bistrot Place de Clichy',
    'restaurant Paris 17',
    'restaurant Paris 18 Clichy',
    'Tifinagh',
  ],
  alternates: { canonical: '/restaurant-place-de-clichy' },
}

export default function RestaurantPlaceDeClichy() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Paris 17 / 18 · Place de Clichy"
          title="Restaurant Place de Clichy"
          text="Un bistrot de quartier authentique, à quelques minutes à pied de la Place de Clichy."
        />

        <section className="local-page section">
          <article className="local-card">
            <h2>Un bistrot français à sortie de métro Clichy</h2>
            <p>
              La Place de Clichy est un carrefour pratique entre le 17<sup>e</sup> et le
              18<sup>e</sup>. Pour un déjeuner ou un dîner sans traverser tout Montmartre,
              Tifinagh offre une adresse de{' '}
              <strong>cuisine française traditionnelle</strong> au{' '}
              <strong>17 avenue Rachel</strong> : produits frais, plats généreux, ambiance de
              vrai bistrot — pas une table générique de place touristique.
            </p>

            <h2>Accès simple depuis Clichy</h2>
            <p>
              Métro <strong>Place de Clichy (lignes 2 et 13)</strong> : quelques minutes à pied
              jusqu&apos;à l&apos;avenue Rachel. La Fourche (ligne 13) et Blanche (ligne 2) sont
              également très proches. L&apos;impasse est calme : idéal pour un repas d&apos;affaires
              en journée ou un dîner en famille le soir.
            </p>

            <h2>Pour qui ?</h2>
            <ul>
              <li>Habitués du 17<sup>e</sup> / 18<sup>e</sup> qui veulent du fait maison</li>
              <li>Déjeuners professionnels sans perte de temps</li>
              <li>Dîners en couple ou entre amis hors des flux de Pigalle</li>
              <li>Groupes et privatisations (partielle dès 15, totale jusqu&apos;à 40)</li>
            </ul>

            <h2>Horaires &amp; réservation</h2>
            <p>
              Ouvert <strong>tous les jours</strong>, {restaurant.openingHours.labelHours}.
              Réservez par téléphone, Google Reserve ou WhatsApp — surtout le week-end et les
              soirs de spectacle dans le quartier.
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte">
                Voir la carte
              </Link>
              <Link className="text-link" href="/privatisation">
                Privatiser
              </Link>
            </div>

            <BookingChannels title="Réserver depuis Place de Clichy" />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
