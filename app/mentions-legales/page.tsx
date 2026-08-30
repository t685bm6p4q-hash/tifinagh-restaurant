import type { Metadata } from 'next'
import { Footer, Header, PageIntro } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Mentions légales et informations',
  description:
    'Mentions légales du restaurant Tifinagh Montmartre : éditeur du site, hébergeur, propriété intellectuelle et traitement des données personnelles.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
}

export default function MentionsLegales() {
  return <>
    <Header />
    <main>
      <PageIntro eyebrow="Informations" title="Mentions légales" text="Les informations essentielles concernant Tifinagh Montmartre." />
      <section className="legal-page section">
        <article className="legal-card">
          <h2>Éditeur du site</h2>
          <p>Tifinagh Montmartre<br />17 Av. Rachel<br />75018 Paris<br />Téléphone : 01 42 94 22 40</p>
          <h2>Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
          <h2>Données personnelles</h2>
          <p>Les informations transmises via les formulaires sont utilisées uniquement pour répondre à votre demande de contact ou de réservation. Elles ne sont ni vendues ni cédées à des tiers.</p>
          <h2>Propriété intellectuelle</h2>
          <p>Les textes, photographies et éléments graphiques du site sont réservés à Tifinagh Montmartre, sauf mention contraire.</p>
          <p className="legal-note">Pour toute question concernant vos données, contactez-nous au 01 42 94 22 40.</p>
        </article>
      </section>
    </main>
    <Footer />
  </>
}
