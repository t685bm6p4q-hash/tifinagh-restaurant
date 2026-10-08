import type { Metadata } from 'next'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

/**
 * page.tsx est un Client Component (formulaire WhatsApp) et ne peut donc pas
 * exporter de metadata : elle est portee par ce layout.
 */
export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'reservation')
}

export default function ReservationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
