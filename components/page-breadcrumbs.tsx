import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import type { BreadcrumbItem } from '@/lib/breadcrumb-item'
import type { Locale } from '@/lib/i18n/config'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'

export type { BreadcrumbItem }

type PageBreadcrumbsProps = {
  locale: Locale
  items: BreadcrumbItem[]
}

export function PageBreadcrumbs({ locale, items }: PageBreadcrumbsProps) {
  const a11y = getA11yCopy(locale)
  return (
    <div className="page-breadcrumb-wrap">
      <BreadcrumbNav items={items} ariaLabel={a11y.breadcrumbNav} locale={locale} />
    </div>
  )
}
