import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { MenuPdfButton } from '@/components/menu-pdf-button'
import { menuSections } from '@/lib/restaurant-data'

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

        {/* Section Hero - Spécialité du Jour */}
        <section
          className="section"
          style={{
            background: 'var(--surface)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={20} color="var(--gold)" />
              <span
                style={{
                  color: 'var(--gold)',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Aujourd&apos;hui à la carte
              </span>
              <Sparkles size={20} color="var(--gold)" />
            </div>

            <h2 style={{ color: 'var(--foreground)', marginBottom: '20px', fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Nos sélections du jour
            </h2>

            <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '16px', lineHeight: '1.8' }}>
              Notre chef prépare chaque jour une sélection spéciale mettant en avant les meilleurs produits du marché.
              Fruits, légumes, viandes et poissons – tout est frais et de saison.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MenuPdfButton variant="primary" size="medium" label="👁️ Consulter le menu du jour" viewOnly />
              <Link
                href="/carte"
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
                Voir la carte complète <ArrowRight size={14} />
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#25d366',
                  color: '#fff',
                  padding: '14px 32px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
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
