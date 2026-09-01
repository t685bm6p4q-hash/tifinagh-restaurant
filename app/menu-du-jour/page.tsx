import type { Metadata } from 'next'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuPdfViewer } from '@/components/menu-pdf-viewer'

export const metadata: Metadata = {
  title: 'Menu du jour PDF — formules fraîches à Montmartre',
  description:
    'Formules et suggestions du jour en PDF : plats frais de saison préparés le matin par la brigade Tifinagh, bistrot français à Montmartre.',
  alternates: { canonical: '/menu-du-jour' },
}

export default function MenuDuJour() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Sélection du jour"
          title="Menu du jour"
          text="Formules du jour mises à jour chaque matin — lisez le menu directement ci-dessous."
        />

        <section className="section menu-pdf-section" aria-label="Menu du jour en PDF">
          <MenuPdfViewer />
        </section>

        <section className="section menu-jour-info">
          <div className="menu-jour-info-inner">
            <p className="menu-jour-info-note">
              Les quantités sont limitées — nous vous conseillons de réserver pour garantir votre place.
            </p>
            <a
              href={`https://wa.me/33679045460?text=${encodeURIComponent('Bonjour, j\'aimerais réserver une table chez Tifinagh.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-whatsapp"
            >
              Réserver maintenant
            </a>
          </div>
        </section>

        <section className="section menu-jour-hours">
          <div className="menu-jour-hours-inner">
            <h2>Horaires d&apos;ouverture</h2>
            <p>
              <strong>Tous les jours :</strong> 10h – 00h
            </p>
            <p className="menu-jour-phone">
              Tél. : <a href="tel:+33142942240">01 42 94 22 40</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
