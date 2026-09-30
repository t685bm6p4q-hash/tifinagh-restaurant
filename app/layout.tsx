import type { Metadata, Viewport } from 'next'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { WebMcpTools } from '@/components/web-mcp-tools'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { buildSiteMetadata, getI18n, localeMeta } from '@/lib/i18n'
import { siteUrl } from '@/lib/seo'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#d6ad45',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, dictionary } = await getI18n()
  const a11y = getA11yCopy(locale)
  return (
    <html lang={localeMeta[locale].htmlLang}>
      <head>
        <link
          rel="ai-catalog"
          href={new URL('/.well-known/ai-catalog.json', siteUrl).href}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          {a11y.skipToContent}
        </a>
        <RestaurantSchema />
        <WebMcpTools locale={locale} whatsappCopy={dictionary.reservationPage} />
        {children}
      </body>
    </html>
  )
}
