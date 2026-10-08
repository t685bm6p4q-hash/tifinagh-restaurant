import Link from 'next/link'
import type { BreadcrumbItem } from '@/components/breadcrumb-json-ld'
import { localeHref, type Locale } from '@/lib/i18n'

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
  ariaLabel: string
  locale: Locale
}

export function BreadcrumbNav({ items, ariaLabel, locale }: BreadcrumbNavProps) {
  if (items.length === 0) return null

  return (
    <nav className="breadcrumb-nav" aria-label={ariaLabel}>
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.path}-${index}`} className="breadcrumb-item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={localeHref(item.path, locale)} prefetch={index === 0}>
                    {item.name}
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
