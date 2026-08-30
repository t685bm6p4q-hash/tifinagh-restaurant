import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight, CalendarDays, ChefHat, MessageCircle, Wine } from 'lucide-react'
import { Header, Footer } from '@/components/site-shell'
import { SectionHeading } from '@/src/components/molecules/section-heading'
import { menuSections, testimonials } from '@/lib/restaurant-data'
import { cloudinaryImage } from '@/lib/cloudinary'

const ReviewsSection = dynamic(() =>
  import('@/src/components/organisms/reviews-section').then((m) => m.ReviewsSection),
)

const ReservationForm = dynamic(() =>
  import('@/components/reservation-form').then((m) => m.ReservationForm),
)

const MenuPdfButton = dynamic(() =>
  import('@/components/menu-pdf-button').then((m) => m.MenuPdfButton),
)

export function HomeTemplate() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="hero">
          <Image
            className="hero-image"
            src="/images/hero-salle.webp"
            alt="Salle du restaurant Tifinagh à Montmartre"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 828px"
            quality={60}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Montmartre, Paris</p>
            <h1>
              Le goût de Paris,<br />
              <em>sans détour.</em>
            </h1>
            <p className="hero-copy">
              Une cuisine française généreuse, des produits frais de saison
              et l&apos;âme d&apos;un vrai bistrot de quartier.
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/reservation">
                <MessageCircle size={16} />
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte">
                Découvrir la carte
              </Link>
            </div>
          </div>
          <div className="hero-note">
            Ouvert du lundi au dimanche <span>·</span> Service du soir dès 19h
          </div>
        </section>

        {/* ── L'esprit Tifinagh ─────────────────────────── */}
        <section className="story section">
          <div className="story-image">
            <Image
              src="/images/tifinagh-dish.webp"
              alt="Plat de canard confit servi au restaurant"
              fill
              quality={60}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">L&apos;esprit Tifinagh</p>
            <h2>L&apos;authenticité française au pied de Montmartre et de Pigalle</h2>
            <p>
              Restaurant français traditionnel niché entre la Place de Clichy,
              Pigalle et le Moulin Rouge, au pied de Montmartre, près du cimetière
              où repose Dalida, au calme d&apos;une impasse. Profitez de notre terrasse
              ombragée et des théâtres à proximité.
            </p>
            <p>
              Une cuisine française authentique et 100&nbsp;% maison, préparée chaque
              matin avec des produits frais et de saison. En couple, entre amis ou
              en famille, pensez à réserver pour vos soirs de spectacle et vos week-ends.
            </p>
            <div className="feature-list">
              <div>
                <ChefHat size={20} />
                <strong>Fait maison</strong>
                <span>Des produits bruts, une cuisine sincère.</span>
              </div>
              <div>
                <Wine size={20} />
                <strong>Vins vivants</strong>
                <span>Une sélection de vignerons indépendants.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bandeau Carte ─────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            height: '300px',
            overflow: 'hidden',
            marginBottom: '0',
          }}
        >
          <Image
            src={cloudinaryImage('v1787938623/terasse-tifinagh-restaurant-pigalle_a6a58q.jpg', 900)}
            alt="Terrasse Tifinagh avec clients heureux découvrant la cuisine française"
            fill
            quality={60}
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(17, 18, 16, 0.5) 0%, rgba(17, 18, 16, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: '500px', color: '#fff' }}>
              <h2 style={{ fontSize: '40px', margin: '0 0 12px', fontFamily: 'Georgia, serif', fontWeight: '300' }}>
                Notre sélection du jour
              </h2>
              <Link className="text-link" href="/carte" style={{ borderColor: '#fff', color: '#fff' }}>
                Découvrir la carte complète <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Aperçu de la carte ────────────────────────── */}
        <section className="menu-preview section section-dark">
          <SectionHeading
            eyebrow="La carte"
            title="Le marché dans l'assiette"
            text="Une carte courte, renouvelée au fil des saisons."
          />
          <div className="menu-columns">
            {menuSections.slice(0, 2).map((section) => (
              <div className="menu-group" key={section.title}>
                <h3>{section.title}</h3>
                {section.items.slice(0, 3).map((item) => (
                  <div className="menu-item" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.description}</span>
                    </div>
                    <b>{item.price}</b>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
            <MenuPdfButton variant="secondary" label="📋 Consulter le menu du jour" viewOnly />
            <Link className="text-link" href="/carte">
              Voir toute la carte <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── Avis clients ──────────────────────────────── */}
        <ReviewsSection reviews={testimonials} />

        {/* ── Réservation ───────────────────────────────── */}
        <section className="reservation-banner section">
          <div>
            <CalendarDays size={24} />
            <p className="eyebrow">Une table vous attend</p>
            <h2>Réservez votre moment</h2>
            <p>
              Pour un dîner à deux, une grande tablée, un événement privé ou un repas
              d&apos;entreprise, notre équipe vous accueille avec plaisir.
            </p>
            <ReservationForm />
          </div>
        </section>

        {/* ── Plan ──────────────────────────────────────── */}
        <section className="map-section section">
          <div>
            <p className="eyebrow">Le quartier</p>
            <h2>Le Tifinagh au cœur de Paris&nbsp;18</h2>
            <p>
              Retrouvez-nous au 17 avenue Rachel, entre Pigalle,
              la Place de Clichy et le Cimetière de Montmartre.
            </p>
            <Link
              className="text-link"
              href="https://maps.google.com/?q=17+Av.+Rachel+75018+Paris"
              target="_blank"
              rel="noreferrer"
            >
              Voir l&apos;itinéraire <ArrowRight size={14} />
            </Link>
          </div>
          <iframe
            className="map-frame"
            title="Plan et localisation de Tifinagh Montmartre"
            src="https://www.google.com/maps?q=17+Av.+Rachel,+75018+Paris&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

      </main>
      <Footer />
    </>
  )
}
