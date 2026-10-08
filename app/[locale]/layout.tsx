import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { WebMcpTools } from '@/components/web-mcp-tools'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { bindPageLocale } from '@/lib/i18n/bind-page-locale'
import { buildSiteMetadata, localeDirection, localeMeta } from '@/lib/i18n'
import { getDictionary } from '@/lib/i18n/get-locale'
import { isLocale, locales } from '@/lib/i18n/config'
import { setRequestLocale } from '@/lib/i18n/request-locale'
import { siteUrl } from '@/lib/seo'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#d6ad45',
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  bindPageLocale((await params).locale)
  return buildSiteMetadata()
}

export default async function LocaleRootLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  setRequestLocale(raw)
  const dictionary = getDictionary(raw)
  const a11y = getA11yCopy(raw)

  return (
    <html lang={localeMeta[raw].htmlLang} dir={localeDirection(raw)}>
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
        <WebMcpTools locale={raw} whatsappCopy={dictionary.reservationPage} />
        {children}
      </body>
    </html>
  )
}
