import Link from 'next/link'
import { Header, Footer, MainContent } from '@/components/site-shell'
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
import { googleMapsEmbedUrl, googleMapsUrl } from '@/lib/restaurant-data'
import { getI18n, getUxExtra, localizeMenu, localizeTestimonials } from '@/lib/i18n'

export async function HomeTemplate() {
  const { dictionary, locale } = await getI18n()
  const ux = getUxExtra(locale)
  const menu = localizeMenu(dictionary)
  const reviews = localizeTestimonials(dictionary)

  return (
    <>
      <Header />
      <MainContent>

        {/* ── Hero (LCP) — avant le bandeau info pour decouverte HTML prioritaire ── */}
        <section className="hero">
          <picture>
            <source media="(min-width: 769px)" srcSet="/images/hero-salle.webp" type="image/webp" />
            <source media="(max-width: 768px)" srcSet="/images/hero-salle-480.avif" type="image/avif" />
            <source media="(max-width: 768px)" srcSet="/images/hero-salle-480.webp" type="image/webp" />
            <img
              className="hero-image"
              src="/images/hero-salle-480.webp"
              alt={dictionary.home.heroImageAlt}
              width={480}
              height={320}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{dictionary.home.heroEyebrow}</p>
            <h1>
              {dictionary.home.heroTitle}<br />
              <em>{dictionary.home.heroTitleEm}</em>
            </h1>
            <p className="hero-copy">
              {dictionary.home.heroCopy}
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/reservation" prefetch={false}>
                <MessageCircleIcon size={16} />
                {dictionary.home.bookTable}
              </Link>
              <div className="hero-menu-links">
                <Link className="text-link" href="/carte" prefetch={false}>
                  {dictionary.home.discoverMenu}
                </Link>
                <span className="hero-menu-links-sep" aria-hidden="true">·</span>
                <Link className="text-link" href="/carte/boissons" prefetch={false}>
                  {ux.homeDiscoverDrinks}
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-note">
            {dictionary.hours.full}
          </div>
        </section>

        <TonightStrip />

        {/* ── L'esprit Tifinagh ─────────────────────────── */}
        <section className="story section">
          <div className="story-image">
            <img
              src="/images/tifinagh-dish.webp"
              alt={dictionary.home.dishAlt}
              width={800}
              height={560}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">{dictionary.home.storyEyebrow}</p>
            <h2>{dictionary.home.storyTitle}</h2>
            <p>
              {dictionary.home.storyP1}
            </p>
            <p>
              {dictionary.home.storyP2}
            </p>
            <div className="feature-list">
              <div>
                <ChefHatIcon size={20} />
                <strong>{dictionary.home.homemadeTitle}</strong>
                <span>{dictionary.home.homemadeText}</span>
              </div>
              <div>
                <WineIcon size={20} />
                <strong>{dictionary.home.wineTitle}</strong>
                <span>{dictionary.home.wineText}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bandeau Carte ─────────────────────────────── */}
        <section className="home-banner">
          <div className="home-banner-overlay">
            <div className="home-banner-content">
              <h2>{dictionary.home.bannerTitle}</h2>
              <Link className="text-link home-banner-link" href="/carte" prefetch={false}>
                {dictionary.home.bannerLink} <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Aperçu de la carte ────────────────────────── */}
        <section className="menu-preview section section-dark">
          <SectionHeading
            eyebrow={dictionary.home.menuEyebrow}
            title={dictionary.home.menuTitle}
            text={dictionary.home.menuText}
          />
          <div className="menu-columns">
            {menu.slice(0, 2).map((section) => (
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
            <Link
              href="/menu-du-jour"
              prefetch={false}
              className="menu-pdf-link menu-pdf-link-secondary"
              aria-label={dictionary.home.dailyMenuAria}
            >
              📋 {dictionary.home.dailyMenuLink}
            </Link>
            <Link className="text-link" href="/carte" prefetch={false}>
              {dictionary.home.fullMenuLink} <ArrowRightIcon size={14} />
            </Link>
          </div>
        </section>

        {/* ── Avis clients ──────────────────────────────── */}
        <ReviewsSection reviews={reviews} />

        {/* ── Réservation ───────────────────────────────── */}
        <section className="reservation-banner section">
          <div>
            <CalendarDaysIcon size={24} />
            <p className="eyebrow">{dictionary.home.reserveEyebrow}</p>
            <h2>{dictionary.home.reserveTitle}</h2>
            <p>
              {dictionary.home.reserveText}
            </p>
            <BookingChannels title={dictionary.booking.title} />
          </div>
        </section>

        {/* ── Plan ──────────────────────────────────────── */}
        <section className="map-section section">
          <div className="map-section-copy">
            <p className="eyebrow">{dictionary.home.mapEyebrow}</p>
            <h2>{dictionary.home.mapTitle}</h2>
            <p className="map-section-lead">{dictionary.home.mapText}</p>
            <p className="map-section-address">
              <span className="map-section-address-label">{dictionary.contact.address}</span>
              17 Av. Rachel
              <br />
              75018 Paris
            </p>
            <a
              className="map-section-cta text-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.common.directions} <ArrowRightIcon size={14} />
            </a>
          </div>
          <div className="map-section-map map-frame">
            <iframe
              className="map-section-iframe"
              title={dictionary.home.mapAria}
              src={googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

      </MainContent>
      <Footer />
    </>
  )
}
