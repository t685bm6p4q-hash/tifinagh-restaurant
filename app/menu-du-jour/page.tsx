import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuPdfButton } from '@/components/menu-pdf-button'
import { menuSections } from '@/lib/restaurant-data'
import { cloudinaryImage } from '@/lib/cloudinary'

const MENU_JOUR_IMAGE = cloudinaryImage('v1787946633/489A2475_u2q4on.jpg', 900)

export const metadata: Metadata = {
  title: 'Menu du jour — suggestions de saison',
  description:
    'Chaque jour, notre chef compose une sélection de plats frais et de saison. Découvrez le menu du jour de notre bistrot français à Montmartre.',
  alternates: { canonical: '/menu-du-jour' },
}

export default function MenuDuJour() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Sélection du jour"
          title="Menu du Jour"
          text="Découvrez nos spécialités fraîches du jour, préparées avec les meilleurs produits de saison."
        />

        <section className="section menu-jour-highlight">
          <div className="menu-jour-highlight__media" aria-hidden="true">
            <Image
              src={MENU_JOUR_IMAGE}
              alt=""
              fill
              className="menu-jour-highlight__image"
              sizes="(max-width: 768px) 100vw, 900px"
              quality={60}
            />
          </div>
          <div className="menu-jour-highlight__veil" aria-hidden="true" />

          <div className="menu-jour-highlight__content">
            <div className="menu-jour-highlight__eyebrow">
              <Sparkles size={20} color="var(--gold)" aria-hidden="true" />
              <span>Aujourd&apos;hui à la carte</span>
              <Sparkles size={20} color="var(--gold)" aria-hidden="true" />
            </div>

            <h2 className="menu-jour-highlight__title">Nos sélections du jour</h2>

            <p className="menu-jour-highlight__copy">
              Notre chef prépare chaque jour une sélection spéciale mettant en avant les meilleurs
              produits du marché. Fruits, légumes, viandes et poissons – tout est frais et de saison.
            </p>

            <div className="menu-jour-highlight__actions">
              <MenuPdfButton variant="primary" size="medium" label="Consulter le menu du jour" viewOnly />
              <Link href="/carte" className="menu-jour-link">
                Voir la carte complète <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aperçu des sections de menu */}
        <section className="section">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h3
                    style={{
                      color: 'var(--gold)',
                      fontSize: '20px',
                      marginBottom: '16px',
                      borderBottom: '1px solid var(--line)',
                      paddingBottom: '12px',
                    }}
                  >
                    {section.title}
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {section.items.slice(0, 3).map((item) => (
                      <div key={item.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                          <strong style={{ color: 'var(--foreground)', fontSize: '14px' }}>
                            {item.name}
                          </strong>
                          <span style={{ color: 'var(--gold)', whiteSpace: 'nowrap', fontWeight: '500' }}>
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <span style={{ color: 'var(--muted)', fontSize: '12px', display: 'block', marginTop: '2px' }}>
                            {item.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
                Les quantités sont limitées – nous vous conseillons de réserver pour garantir votre place !
              </p>
              <a
                href={`https://wa.me/33679045460?text=${encodeURIComponent('Bonjour, j\'aimerais réserver une table chez Tifinagh.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-whatsapp"
                style={{ padding: '14px 32px', fontSize: '14px' }}
              >
                Réserver maintenant
              </a>
            </div>
          </div>
        </section>

        {/* Info pratique */}
        <section
          className="section"
          style={{
            background: 'var(--surface)',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--foreground)', marginBottom: '16px' }}>Horaires d&apos;ouverture</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.8' }}>
              <strong>Lundi – Jeudi :</strong> 19h – 23h30<br />
              <strong>Vendredi – Samedi :</strong> 19h – 00h<br />
              <strong>Dimanche :</strong> 12h – 15h / 19h – 23h
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
              Tél. : <strong>01 42 94 22 40</strong>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
