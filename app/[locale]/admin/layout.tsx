import type { Metadata } from 'next'
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
  return <>{children}</>
}
