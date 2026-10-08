import { headers } from 'next/headers'
import { serializeJsonLd } from '@/lib/json-ld'

export type BreadcrumbItem = {
  name: string
  path: string
}

type BreadcrumbJsonLdProps = {
  siteUrl: string
  items: BreadcrumbItem[]
}

export async function BreadcrumbJsonLd({ siteUrl, items }: BreadcrumbJsonLdProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
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
