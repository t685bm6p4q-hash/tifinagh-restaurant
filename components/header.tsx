import { HeaderShell } from '@/components/header-nav'
import { getI18n } from '@/lib/i18n/get-locale'

export function Header() {
  const { locale, dictionary } = getI18n()
  return <HeaderShell locale={locale} dictionary={dictionary} />
}
