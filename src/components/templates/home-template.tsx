import Link from 'next/link'
import { Header, Footer } from '@/components/site-shell'
import { TonightStrip } from '@/components/tonight-strip'
import { BookingChannels } from '@/components/booking-channels'
import { SectionHeading } from '@/src/components/molecules/section-heading'
import { ReviewsSection } from '@/src/components/organisms/reviews-section'
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ChefHatIcon,
  MessageCircleIcon,
  WineIcon,
} from '@/components/icons'
import { menuSections, testimonials } from '@/lib/restaurant-data'
import { restaurant } from '@/lib/seo'

export function HomeTemplate() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero (LCP) — avant le bandeau info pour decouverte HTML prioritaire ── */}
        <section className="hero">
          <picture>
            <source media="(min-width: 769px)" srcSet="/images/hero-salle.webp" type="image/webp" />
            <source media="(max-width: 768px)" srcSet="/images/hero-salle-480.avif" type="image/avif" />
            <source media="(max-width: 768px)" srcSet="/images/hero-salle-480.webp" type="image/webp" />
            <img
              className="hero-image"
              src="/images/hero-salle-480.webp"
              alt="Salle du restaurant Tifinagh à Montmartre"
              width={480}
              height={320}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
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
              <Link className="button button-primary" href="/reservation" prefetch={false}>
                <MessageCircleIcon size={16} />
                Réserver une table
              </Link>
              <Link className="text-link" href="/carte" prefetch={false}>
                Découvrir la carte
              </Link>
            </div>
          </div>
          <div className="hero-note">
            {restaurant.openingHours.labelFull}
          </div>
        </section>

        <TonightStrip />

        {/* ── L'esprit Tifinagh ─────────────────────────── */}
        <section className="story section">
          <div className="story-image">
            <img
              src="/images/tifinagh-dish.webp"
              alt="Plat de canard confit servi au restaurant"
              width={800}
              height={560}
              loading="lazy"
              decoding="async"
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
                <ChefHatIcon size={20} />
                <strong>Fait maison</strong>
                <span>Des produits bruts, une cuisine sincère.</span>
              </div>
              <div>
                <WineIcon size={20} />
                <strong>Vins vivants</strong>
                <span>Une sélection de vignerons indépendants.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bandeau Carte ─────────────────────────────── */}
        <section className="home-banner">
          <picture>
            <source media="(min-width: 769px)" srcSet="/images/home-banner-600.webp" />
            <img
              className="home-banner-image"
              src="/images/home-banner-640.webp"
              alt="Terrasse Tifinagh avec clients heureux découvrant la cuisine française"
              width={640}
              height={300}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="home-banner-overlay">
            <div className="home-banner-content">
              <h2>Notre sélection du jour</h2>
              <Link className="text-link home-banner-link" href="/carte" prefetch={false}>
                Découvrir la carte complète <ArrowRightIcon size={14} />
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
          <div className="menu-preview-actions">
            <a
              href="/api/menu-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-pdf-link menu-pdf-link-secondary"
              aria-label="Consulter le menu du jour"
            >
              📋 Consulter le menu du jour
            </a>
            <Link className="text-link" href="/carte" prefetch={false}>
              Voir toute la carte <ArrowRightIcon size={14} />
            </Link>
          </div>
        </section>

        {/* ── Avis clients ──────────────────────────────── */}
        <ReviewsSection reviews={testimonials} />

        {/* ── Réservation ───────────────────────────────── */}
        <section className="reservation-banner section">
          <div>
            <CalendarDaysIcon size={24} />
            <p className="eyebrow">Une table vous attend</p>
            <h2>Réservez votre moment</h2>
            <p>
              Pour un dîner à deux, une grande tablée, un événement privé ou un repas
              d&apos;entreprise, notre équipe vous accueille avec plaisir.
            </p>
            <BookingChannels />
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
            <a
              className="text-link"
              href="https://maps.google.com/?q=17+Av.+Rachel+75018+Paris"
              target="_blank"
              rel="noreferrer"
            >
              Voir l&apos;itinéraire <ArrowRightIcon size={14} />
            </a>
          </div>
          <a
            className="map-frame map-frame-link"
            href="https://maps.google.com/?q=17+Av.+Rachel+75018+Paris"
            target="_blank"
            rel="noreferrer"
            aria-label="Ouvrir Tifinagh sur Google Maps"
          >
            <img
              src="/images/tifinagh-facade.webp"
              alt="Façade du restaurant Tifinagh, 17 avenue Rachel à Montmartre"
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
            />
          </a>
        </section>

      </main>
      <Footer />
    </>
  )
}
