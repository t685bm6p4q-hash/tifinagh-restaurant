import { headers } from 'next/headers'
import { serializeJsonLd } from '@/lib/json-ld'
import { absoluteLocalizedUrl } from '@/lib/i18n/language-alternates'
import type { Locale } from '@/lib/i18n/config'

export type BreadcrumbItem = {
  name: string
  path: string
}

type BreadcrumbJsonLdProps = {
  locale: Locale
  items: BreadcrumbItem[]
}

export async function BreadcrumbJsonLd({ locale, items }: BreadcrumbJsonLdProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteLocalizedUrl(item.path, locale),
    })),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}
