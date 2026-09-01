import type { Metadata } from 'next'

/**
 * page.tsx est un Client Component (formulaire WhatsApp) et ne peut donc pas
 * exporter de metadata : elle est portee par ce layout.
 */
export const metadata: Metadata = {
  title: 'Réserver une table — appel, Google ou WhatsApp',
  description:
    'Réservez chez Tifinagh Montmartre en quelques secondes : téléphone, Google Reserve ou WhatsApp. 17 avenue Rachel, Paris 18.',
  alternates: { canonical: '/reservation' },
}

export default function ReservationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
