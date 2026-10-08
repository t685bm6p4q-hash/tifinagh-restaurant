import { HeaderShell } from '@/components/header-nav'
import { getDictionary } from '@/lib/i18n/get-locale'
import { getRequestLocale } from '@/lib/i18n/request-locale'

export async function Header() {
  const locale = getRequestLocale()
  const dictionary = getDictionary(locale)
  return <HeaderShell locale={locale} dictionary={dictionary} />
}
