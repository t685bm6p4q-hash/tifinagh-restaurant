import type { Metadata, Viewport } from 'next'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { SeoDocumentSyncServer } from '@/components/seo-document-sync-server'
import { SiteConsent } from '@/components/site-consent'
import { StickyCallBar } from '@/components/sticky-call-bar'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { buildSiteMetadata, getI18n, localeMeta } from '@/lib/i18n'
import './globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffeb01',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale } = await getI18n()
  const a11y = getA11yCopy(locale)
  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body>
        <a className="skip-link" href="#main-content">
          {a11y.skipToContent}
        </a>
        <RestaurantSchema />
        <SeoDocumentSyncServer />
        {children}
        <StickyCallBar />
        <SiteConsent />
      </body>
    </html>
  )
}
