import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { LocalQuartierDetails } from '@/components/local-quartier-details'
import { restaurant } from '@/lib/seo'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('restaurantMontmartre')
}

export default function RestaurantMontmartre() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Paris 18 · Montmartre"
          title="Restaurant à Montmartre"
          text="Un vrai bistrot de quartier, au calme de l’avenue Rachel — loin du tumulte des artères touristiques."
        />

        <section className="local-page section">
          <article className="local-card">
            <LocalQuartierDetails />

            <h2>Ce qui nous distingue</h2>
            <ul>
              <li>Plats 100&nbsp;% maison, préparés chaque matin avec des produits frais</li>
              <li>Carte courte de saison + menu du jour en PDF mis à jour</li>
              <li>Terrasse ombragée avec parasols rouges quand le temps le permet</li>
              <li>Ambiance bistrot parisien : bois, nappes vichy, service chaleureux</li>
              <li>Ouvert tous les jours · {restaurant.openingHours.labelHours}</li>
            </ul>

            <h2>Privatisation &amp; groupes</h2>
            <p>
              Anniversaires, repas d&apos;entreprise ou événements privés : privatisation partielle
              dès 15 personnes, salle entière jusqu&apos;à 40 couverts. Devis sur demande par
              téléphone ou WhatsApp.
            </p>

            <div className="local-actions">
              <Link className="button button-primary" href="/reservation">
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte">
                Voir la carte
              </Link>
              <Link className="text-link" href="/galerie">
                Photos
              </Link>
              <Link className="text-link" href="/autour-de-nous">
                Autour de nous
              </Link>
              <Link className="text-link" href="/contact">
                Accès &amp; contact
              </Link>
            </div>

            <BookingChannels title="Réserver à Montmartre" />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
