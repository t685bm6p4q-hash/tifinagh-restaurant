import Link from 'next/link'
import type { BreadcrumbItem } from '@/lib/breadcrumb-item'
import { absoluteLocalizedUrl } from '@/lib/i18n/language-alternates'
import { localeHref } from '@/lib/i18n/locale-path'
import type { Locale } from '@/lib/i18n/config'

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
  ariaLabel: string
  locale: Locale
}

export function BreadcrumbNav({ items, ariaLabel, locale }: BreadcrumbNavProps) {
  if (items.length === 0) return null

  return (
    <nav
      className="breadcrumb-nav"
      aria-label={ariaLabel}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const position = index + 1
          return (
            <li
              key={`${item.path}-${index}`}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(position)} />
              {isLast ? (
                <>
                  <span itemProp="name" aria-current="page">
                    {item.name}
                  </span>
                  <meta itemProp="item" content={absoluteLocalizedUrl(item.path, locale)} />
                </>
              ) : (
                <>
                  <Link
                    href={localeHref(item.path, locale)}
                    prefetch={index === 0}
                    itemProp="item"
                    itemScope
                    itemType="https://schema.org/WebPage"
                    itemID={absoluteLocalizedUrl(item.path, locale)}
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
