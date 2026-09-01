import type { Metadata } from 'next'
import { Footer, Header, PageIntro } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Mentions légales et confidentialité',
  description:
    'Mentions légales et politique de confidentialité du restaurant Tifinagh Montmartre : éditeur, hébergeur, données personnelles, WhatsApp et droits RGPD.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
}

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Informations"
          title="Mentions légales"
          text="Éditeur, hébergement, données personnelles et droits des utilisateurs."
        />
        <section className="legal-page section">
          <article className="legal-card">
            <h2>Éditeur du site</h2>
            <p>
              Tifinagh Montmartre
              <br />
              17 avenue Rachel
              <br />
              75018 Paris, France
              <br />
              Téléphone : 01 42 94 22 40
            </p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis. Les fichiers médias peuvent être stockés via Vercel Blob et Cloudinary.
            </p>

            <h2>Données personnelles — finalités</h2>
            <p>
              Les informations saisies dans les formulaires de réservation (nom, téléphone, date,
              heure, nombre de personnes, message) sont utilisées uniquement pour traiter votre
              demande de table ou de contact. Elles ne sont ni vendues ni cédées à des fins
              commerciales.
            </p>

            <h2>Base légale et durée de conservation</h2>
            <p>
              Le traitement repose sur l&apos;exécution de mesures précontractuelles à votre
              demande (art. 6.1.b du RGPD) et, le cas échéant, sur notre intérêt légitime à répondre
              à vos messages. Les données échangées via WhatsApp sont conservées dans l&apos;historique
              de la conversation côté restaurant le temps nécessaire au suivi de la réservation,
              puis archivées ou supprimées selon les pratiques internes (en principe sous 12 mois
              hors obligation légale contraire).
            </p>

            <h2>WhatsApp (Meta)</h2>
            <p>
              Les demandes de réservation sont transmises via WhatsApp (service de Meta Platforms
              Ireland Ltd. / Meta Platforms, Inc.). En envoyant le formulaire, vous acceptez que
              les informations renseignées soient communiquées à WhatsApp afin que notre équipe
              puisse vous répondre. Meta peut traiter ces données hors de l&apos;Union européenne
              selon ses propres conditions et politiques de confidentialité.
            </p>

            <h2>Cookies et mesure d&apos;audience</h2>
            <p>
              Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs de mesure
              d&apos;audience tiers. Des cookies techniques strictement nécessaires au
              fonctionnement (session, sécurité, hébergeur) peuvent être déposés.
            </p>

            <h2>Vos droits (RGPD)</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, d&apos;opposition et de portabilité sur vos données,
              dans les conditions prévues par la loi. Pour exercer ces droits ou poser une question
              relative à vos données, contactez-nous au 01 42 94 22 40. Vous pouvez également
              introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              Les textes, photographies et éléments graphiques du site sont réservés à Tifinagh
              Montmartre, sauf mention contraire.
            </p>

            <p className="legal-note">
              Pour toute question concernant vos données : 01 42 94 22 40 — 17 avenue Rachel, 75018
              Paris.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
