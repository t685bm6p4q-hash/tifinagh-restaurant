import type { Metadata } from 'next'
import { Header, Footer } from '@/components/site-shell'
import { defaultLocale } from '@/lib/i18n/config'
import { setRequestLocale } from '@/lib/i18n/request-locale'

export const metadata: Metadata = {
  title: 'Administration menu du jour',
  description: 'Espace privé — mise à jour du menu PDF, JPEG ou PNG.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
}

/** Hors groupe `(site)` : pas de bandeau cookies ni analytics. */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  setRequestLocale(defaultLocale)
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
