import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { restaurant } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Restaurant à Pigalle — bistrot français près du Moulin Rouge',
  description:
    'Restaurant Tifinagh à deux pas de Pigalle : cuisine française maison, terrasse calme avenue Rachel, idéal avant un spectacle au Moulin Rouge ou dans les théâtres du quartier.',
  keywords: [
    'restaurant Pigalle',
    'bistrot Pigalle',
    'restaurant près Moulin Rouge',
    'dîner Pigalle',
    'Tifinagh',
  ],
  alternates: { canonical: '/restaurant-pigalle' },
}

export default function RestaurantPigalle() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Paris 18 · Pigalle"
          title="Restaurant à Pigalle"
          text="Un bistrot français calme, à quelques minutes à pied de Pigalle et du Moulin Rouge."
        />

        <section className="local-page section">
          <article className="local-card">
            <h2>Pourquoi dîner près de Pigalle chez Tifinagh</h2>
            <p>
              Pigalle attire chaque soir des visiteurs pour ses spectacles, ses théâtres et son
              énergie. Beaucoup cherchent ensuite une table{' '}
              <strong>vraiment française</strong>, sans la foule des artères touristiques. Tifinagh
              se trouve au <strong>17 avenue Rachel</strong>, dans une impasse calme au pied de
              Montmartre — assez proche de Pigalle pour y venir à pied, assez éloigné pour
              profiter d&apos;un dîner posé.
            </p>

            <h2>Idéal avant ou après un spectacle</h2>
            <p>
              Moulin Rouge, salles de concert et théâtres du quartier sont à distance de marche.
              Notre équipe connaît le rythme des soirs de représentation : service attentif,
              cuisine maison préparée le jour même, et possibilité de réserver pour arriver
              sereinement avant le lever de rideau.
            </p>

            <h2>Ce que vous trouvez sur place</h2>
            <ul>
              <li>Cuisine traditionnelle française, 100&nbsp;% maison</li>
              <li>Carte courte de saison + menu du jour en PDF</li>
              <li>Terrasse ombragée quand le temps le permet</li>
              <li>Ouvert tous les jours · {restaurant.openingHours.labelHours}</li>
              <li>Métro Pigalle (lignes 2 et 12) à deux pas</li>
            </ul>

            <h2>Comment venir depuis Pigalle</h2>
            <p>
              Depuis la place Pigalle, descendez vers le cimetière de Montmartre / avenue Rachel :
              le restaurant est au calme, loin du bruit des grands axes. Besoin d&apos;un
              itinéraire ? La page contact et Google Maps indiquent le point exact.
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte">
                Voir la carte
              </Link>
              <Link className="text-link" href="/contact">
                Accès &amp; contact
              </Link>
            </div>

            <BookingChannels title="Réserver depuis Pigalle" />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
