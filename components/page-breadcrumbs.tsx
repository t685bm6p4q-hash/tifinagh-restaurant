import { BreadcrumbJsonLd } from '@/components/breadcrumb-json-ld'
import type { BreadcrumbItem } from '@/components/breadcrumb-json-ld'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import type { Locale } from '@/lib/i18n/config'
import { getA11yCopy } from '@/lib/i18n/a11y-copy'
import { siteUrl } from '@/lib/seo'

type PageBreadcrumbsProps = {
  locale: Locale
  items: BreadcrumbItem[]
}

export function PageBreadcrumbs({ locale, items }: PageBreadcrumbsProps) {
  const a11y = getA11yCopy(locale)
  return (
    <>
      <BreadcrumbJsonLd siteUrl={siteUrl} items={items} />
      <div className="page-breadcrumb-wrap">
        <BreadcrumbNav items={items} ariaLabel={a11y.breadcrumbNav} />
      </div>
    </>
  )
}
