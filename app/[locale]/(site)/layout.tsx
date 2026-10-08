import { SiteConsentLazy } from '@/components/site-consent-lazy'
import { StickyCallBar } from '@/components/sticky-call-bar'

/** Pages marketing (hors /menu-du-jour) : régénération au plus toutes les heures si le runtime le permet. */
export const revalidate = 3600

/** Pages publiques : CTA mobile + consentement (pas sur /admin). */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <StickyCallBar />
      <SiteConsentLazy />
    </>
  )
}
