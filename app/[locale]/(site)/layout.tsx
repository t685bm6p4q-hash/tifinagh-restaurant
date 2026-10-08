import { SiteConsentLazy } from '@/components/site-consent-lazy'
import { StickyCallBar } from '@/components/sticky-call-bar'
import { bindPageLocale } from '@/lib/i18n/bind-page-locale'

/** Pages marketing (hors /menu-du-jour) : régénération au plus toutes les heures si le runtime le permet. */
export const revalidate = 3600

type SiteLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

/** Pages publiques : CTA mobile + consentement (pas sur /admin). */
export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  bindPageLocale((await params).locale)
  return (
    <>
      {children}
      <StickyCallBar />
      <SiteConsentLazy />
    </>
  )
}
