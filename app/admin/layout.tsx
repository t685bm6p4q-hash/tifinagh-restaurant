import type { Metadata } from 'next'
import { Header, Footer } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Administration menu du jour',
  description: 'Espace privé — mise à jour du menu PDF.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/admin/menu-setup' },
}

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
