import { SiteConsentLazy } from '@/components/site-consent-lazy'
import { StickyCallBar } from '@/components/sticky-call-bar'

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
