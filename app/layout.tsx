import type { Metadata, Viewport } from 'next'
import { RestaurantSchema } from '@/components/restaurant-schema'
import { defaultKeywords, restaurant, siteUrl } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: '/icon.webp', type: 'image/webp' }],
    shortcut: ['/icon.webp'],
  },
  title: {
    default: 'Tifinagh | Restaurant & Bistrot Traditionnel Français à Montmartre',
    template: '%s | Tifinagh',
  },
  description:
    'Découvrez le restaurant Tifinagh à Montmartre : cuisine traditionnelle française, plats faits maison, produits frais et ambiance bistrot authentique.',
  keywords: defaultKeywords,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: restaurant.name,
    title: 'Tifinagh | Restaurant & Bistrot Traditionnel Français à Montmartre',
    description:
      'Cuisine traditionnelle française, plats faits maison et ambiance bistrot au pied de Montmartre.',
    images: [{ url: restaurant.image, width: 1200, height: 630, alt: 'Salle du restaurant Tifinagh' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tifinagh | Restaurant & Bistrot Traditionnel Français',
    description:
      'Cuisine traditionnelle française, plats faits maison et ambiance bistrot au pied de Montmartre.',
    images: [restaurant.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#181a17',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <RestaurantSchema />
        {children}
      </body>
    </html>
  )
}
