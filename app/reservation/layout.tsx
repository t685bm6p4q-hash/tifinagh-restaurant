import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

/**
 * page.tsx est un Client Component (formulaire WhatsApp) et ne peut donc pas
 * exporter de metadata : elle est portee par ce layout.
 */
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('reservation')
}

export default function ReservationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
