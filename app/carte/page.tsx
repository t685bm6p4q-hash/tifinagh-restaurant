import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuPdfButton } from '@/components/menu-pdf-button'
import { MenuSection } from '@/src/components/organisms/menu-section'
import { menuSections } from '@/lib/restaurant-data'
import { cloudinaryImage } from '@/lib/cloudinary'

export const metadata: Metadata = {
  title: 'Carte permanente — plats français maison à Montmartre',
  description:
    'Carte permanente du bistrot Tifinagh : foie gras, confit de canard, escargots de Bourgogne et desserts maison, au 17 avenue Rachel, Paris 18.',
  alternates: { canonical: '/carte' },
}

export default function Carte() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="À table"
          title="La carte permanente"
          text="Notre carte de bistrot français, renouvelée au fil des saisons — distincte du menu du jour PDF."
        />

        {/* Hero Banner - Terrasse ambiance */}
        <section
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            marginBottom: '40px',
          }}
        >
          <Image
            src={cloudinaryImage('v1787938623/terasse-tifinagh-restaurant-pigalle_a6a58q.jpg', 900)}
            alt="Terrasse Tifinagh Montmartre avec clients heureux sous parasol rouge"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 800px"
            quality={60}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(17, 18, 16, 0.4) 0%, rgba(17, 18, 16, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: '600px', color: '#fff' }}>
              <h2 style={{ fontSize: '48px', margin: '0 0 16px', fontFamily: 'Georgia, serif', fontWeight: '300' }}>
                Des saveurs d&apos;authenticité
              </h2>
              <p style={{ fontSize: '18px', margin: '0', color: 'rgba(255, 255, 255, 0.9)' }}>
                Une sélection de plats généreux, préparés chaque jour avec les meilleurs produits.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '16px', fontSize: '14px' }}>
              Vous préférez une version PDF ? Téléchargez notre menu du jour avec les spécialités fraîches du jour.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MenuPdfButton variant="primary" size="medium" label="👁️ Consulter le menu du jour" viewOnly />
              <Link
                href="/menu-du-jour"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--gold)',
                  borderBottom: '1px solid var(--gold)',
                  paddingBottom: '4px',
                  textDecoration: 'none',
                }}
              >
                Page menu du jour
              </Link>
            </div>
          </div>
        </section>

        <section className="menu-page section">
          {menuSections.map((section) => (
            <MenuSection key={section.title} title={section.title} items={section.items} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
