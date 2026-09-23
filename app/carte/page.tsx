import type { Metadata } from 'next'
import Image from 'next/image'
import { BreadcrumbJsonLd } from '@/components/breadcrumb-json-ld'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { siteUrl } from '@/lib/seo'
import { MenuCrossLink } from '@/components/menu-cross-link'
import { MenuSection } from '@/src/components/organisms/menu-section'
import { cloudinaryImage } from '@/lib/cloudinary'
import { getI18n, localizeMenu } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('carte')
}

export default async function Carte() {
  const { dictionary, locale } = await getI18n()
  const menu = localizeMenu(dictionary)
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: dictionary.carte.title, path: '/carte' },
  ]
  const a11y = getA11yCopy(locale)

  return (
    <>
      <BreadcrumbJsonLd siteUrl={siteUrl} items={breadcrumbItems} />
      <Header />
      <MainContent>
        <div className="page-breadcrumb-wrap">
          <BreadcrumbNav items={breadcrumbItems} ariaLabel={a11y.breadcrumbNav} />
        </div>
        <PageIntro
          eyebrow={dictionary.carte.eyebrow}
          title={dictionary.carte.title}
          text={dictionary.carte.text}
        />

        {/* Hero Banner - Terrasse ambiance */}
        <section
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={cloudinaryImage('v1787938623/terasse-tifinagh-restaurant-pigalle_a6a58q.jpg', 900)}
            alt={dictionary.carte.terraceAlt}
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
                {dictionary.carte.bannerTitle}
              </h2>
              <p style={{ fontSize: '18px', margin: '0', color: 'rgba(255, 255, 255, 0.9)' }}>
                {dictionary.carte.bannerText}
              </p>
            </div>
          </div>
        </section>

        <MenuCrossLink
          eyebrow={dictionary.carte.dailyInviteEyebrow}
          title={dictionary.carte.dailyInviteTitle}
          text={dictionary.carte.dailyInviteText}
          href="/menu-du-jour"
          cta={dictionary.carte.dailyInviteCta}
          variant="to-daily"
        />

        <section className="menu-page section">
          {menu.map((section) => (
            <MenuSection key={section.title} title={section.title} items={section.items} />
          ))}
        </section>

        <MenuCrossLink
          eyebrow={dictionary.carte.drinksInviteEyebrow}
          title={dictionary.carte.drinksInviteTitle}
          text={dictionary.carte.drinksInviteText}
          href="/carte/boissons"
          cta={dictionary.carte.drinksInviteCta}
          variant="to-drinks"
        />

        <MenuCrossLink
          eyebrow={dictionary.carte.dailyInviteEyebrow}
          title={dictionary.carte.dailyInviteTitle}
          text={dictionary.carte.dailyInviteText}
          href="/menu-du-jour"
          cta={dictionary.carte.dailyInviteCta}
          variant="to-daily"
        />
      </MainContent>
      <Footer />
    </>
  )
}
