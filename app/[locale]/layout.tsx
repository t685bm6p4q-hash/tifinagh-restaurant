import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { WebMcpTools } from '@/components/web-mcp-tools'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { bindPageLocale } from '@/lib/i18n/bind-page-locale'
import { buildSiteMetadata, localeDirection, localeMeta } from '@/lib/i18n'
import { getDictionary } from '@/lib/i18n/get-locale'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { SiteLocaleProvider } from '@/lib/i18n/site-locale'
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

  const locale = raw as Locale
  setRequestLocale(locale)
  const dictionary = getDictionary(locale)
  const a11y = getA11yCopy(locale)

  return (
    <html lang={localeMeta[locale].htmlLang} dir={localeDirection(locale)}>
      <head>
        <link
          rel="ai-catalog"
          href={new URL('/.well-known/ai-catalog.json', siteUrl).href}
        />
      </head>
      <body>
        <SiteLocaleProvider locale={locale}>
          <a className="skip-link" href="#main-content">
            {a11y.skipToContent}
          </a>
          <RestaurantSchema />
          <WebMcpTools locale={locale} whatsappCopy={dictionary.reservationPage} />
          {children}
        </SiteLocaleProvider>
      </body>
    </html>
  )
}
