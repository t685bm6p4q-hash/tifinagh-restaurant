import type { Metadata, Viewport } from 'next'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { SeoDocumentSyncServer } from '@/components/seo-document-sync-server'
import { SiteConsent } from '@/components/site-consent'
import { StickyCallBar } from '@/components/sticky-call-bar'
import { buildSiteMetadata, getI18n, localeMeta } from '@/lib/i18n'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#181a17',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale } = await getI18n()
  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body>
        <RestaurantSchema />
        <SeoDocumentSyncServer />
        {children}
        <StickyCallBar />
        <SiteConsent />
      </body>
    </html>
  )
}
