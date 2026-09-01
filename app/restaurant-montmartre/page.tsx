import type { Metadata } from 'next'
import Link from 'next/link'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { restaurant } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Restaurant Montmartre — bistrot français au pied de la butte',
  description:
    'Restaurant Tifinagh à Montmartre : bistrot français traditionnel, cuisine maison, terrasse calme avenue Rachel, à deux pas du Sacré-Cœur, Pigalle et du cimetière de Montmartre.',
  keywords: [
    'restaurant Montmartre',
    'bistrot Montmartre',
    'restaurant Paris 18 Montmartre',
    'restaurant Abbesses',
    'restaurant avenue Rachel',
    'Tifinagh',
  ],
  alternates: { canonical: '/restaurant-montmartre' },
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
            <h2>Un bistrot authentique au pied de la butte</h2>
            <p>
              Montmartre attire des millions de visiteurs chaque année. Beaucoup cherchent une
              table de <strong>cuisine française traditionnelle</strong>, faite maison, sans
              l&apos;ambiance des chaînes touristiques. Tifinagh se trouve au{' '}
              <strong>17 avenue Rachel</strong>, dans une impasse paisible entre le cimetière de
              Montmartre et les Abbesses — assez proche du Sacré-Cœur pour en profiter, assez
              éloigné pour dîner sereinement.
            </p>

            <h2>Ce qui nous distingue</h2>
            <ul>
              <li>Plats 100&nbsp;% maison, préparés chaque matin avec des produits frais</li>
              <li>Carte courte de saison + menu du jour en PDF mis à jour</li>
              <li>Terrasse ombragée avec parasols rouges quand le temps le permet</li>
              <li>Ambiance bistrot parisien : bois, nappes vichy, service chaleureux</li>
              <li>Ouvert tous les jours · {restaurant.openingHours.labelHours}</li>
            </ul>

            <h2>Accès depuis Montmartre</h2>
            <p>
              Métro <strong>Blanche</strong> (ligne 2) et <strong>Pigalle</strong> (lignes 2 et 12)
              : quelques minutes à pied. <strong>Abbesses</strong> (ligne 12) est également
              proche en descendant vers l&apos;avenue Rachel. L&apos;adresse est facile à trouver
              sur Google Maps — le restaurant est au calme, sans bruit de voiture.
            </p>

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
                Galerie photos
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
