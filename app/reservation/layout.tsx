import type { Metadata } from 'next'

/**
 * page.tsx est un Client Component (formulaire WhatsApp) et ne peut donc pas
 * exporter de metadata : elle est portee par ce layout.
 */
export const metadata: Metadata = {
  title: 'Réserver une table par WhatsApp',
  description:
    'Réservez votre table chez Tifinagh Montmartre en quelques secondes par WhatsApp. Bistrot français traditionnel au 17 avenue Rachel, Paris 18.',
  alternates: { canonical: '/reservation' },
}

export default function ReservationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
