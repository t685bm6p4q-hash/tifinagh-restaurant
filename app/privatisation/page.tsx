import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Privatisation du restaurant à Montmartre',
  description:
    'Privatisez tout ou partie de notre bistrot au 17 avenue Rachel, Paris 18 : anniversaires, séminaires, repas de famille et menus sur mesure.',
  alternates: { canonical: '/privatisation' },
}

export default function Privatisation() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Événements privés"
          title="Privatisation"
          text="Organisez votre événement spécial dans notre restaurant."
        />

        <section className="section">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--foreground)' }}>
              Envie d&apos;organiser un événement privé chez Tifinagh ?
            </h2>

            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '32px', fontSize: '16px' }}>
              Nous vous offrons la possibilité de privatiser tout ou partie de notre établissement
              pour vos occasions spéciales :<br /><br />
              <strong style={{ color: 'var(--foreground)' }}>
                ✦ Anniversaires<br />
                ✦ Soirées en groupe<br />
                ✦ Événements professionnels<br />
                ✦ Séminaires & Team building<br />
                ✦ Repas de famille<br />
                ✦ Mariages & réceptions
              </strong>
            </p>

            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '5px',
                padding: '32px',
                marginBottom: '40px',
              }}
            >
              <h3 style={{ marginBottom: '20px', color: 'var(--gold)', fontSize: '18px' }}>
                Nous contacter pour les modalités
              </h3>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                Pour connaître les tarifs, les menus proposés et organiser votre événement,
                merci de nous contacter directement par téléphone ou en visitant notre restaurant.
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                <a
                  href="tel:+33142942240"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: 'var(--gold)',
                    fontSize: '15px',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gold)',
                    paddingBottom: '4px',
                  }}
                >
                  <Phone size={18} />
                  <strong>01 42 94 22 40</strong>
                </a>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--muted)', fontSize: '15px' }}>
                  <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '4px' }}>
                      Tifinagh Montmartre
                    </strong>
                    17 Avenue Rachel<br />
                    75018 Paris
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--foreground)', fontSize: '18px' }}>
                Nos services
              </h3>
              <ul
                style={{
                  color: 'var(--muted)',
                  lineHeight: '1.9',
                  paddingLeft: '20px',
                  listStyleType: 'none',
                }}
              >
                <li>✓ Privatisation totale ou partielle du restaurant</li>
                <li>✓ Menus personnalisés et à la carte</li>
                <li>✓ Service & équipe dédiés à votre événement</li>
                <li>✓ Ambiance chaleureuse et authentique</li>
                <li>✓ Localisation idéale à Montmartre</li>
              </ul>
            </div>

            <div
              style={{
                background: 'var(--surface-2)',
                borderRadius: '5px',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--muted)', marginBottom: '16px', fontSize: '14px' }}>
                Découvrez notre établissement et discutez de votre projet avec notre équipe !
              </p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  background: '#25d366',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Galerie Privatisation */}
        <section className="section">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--foreground)', textAlign: 'center', marginBottom: '40px', fontSize: '36px' }}>
              Nos espaces de privatisation
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              <Image
                src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg"
                alt="Salle restaurant Tifinagh Montmartre avec décoration rouge et bois"
                width={600}
                height={450}
                style={{ borderRadius: '5px', objectFit: 'cover' }}
              />
              <Image
                src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2436_gqgbkp.jpg"
                alt="Salle restaurant privée Tifinagh rouge intérieur élégant"
                width={600}
                height={450}
                style={{ borderRadius: '5px', objectFit: 'cover' }}
              />
              <Image
                src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2437_gkrxlq.jpg"
                alt="Salle privatisation Tifinagh avec tables nappe vichy bistro"
                width={600}
                height={450}
                style={{ borderRadius: '5px', objectFit: 'cover' }}
              />
              <Image
                src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2441_yrctak.jpg"
                alt="Salle privatisation événement Tifinagh Montmartre restaurant privé"
                width={600}
                height={450}
                style={{ borderRadius: '5px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
