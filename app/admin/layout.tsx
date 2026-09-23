import type { Metadata } from 'next'
import { Header, Footer } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Administration menu du jour',
  description: 'Espace privé — mise à jour du menu PDF, JPEG ou PNG.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/admin/menu-setup' },
}

/** Hors groupe `(site)` : pas de bandeau cookies ni analytics (layout racine minimal). */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
