import { headers } from 'next/headers'
import { HeaderShell } from '@/components/header-nav'
import { getI18n } from '@/lib/i18n'

export async function Header() {
  const pathname = (await headers()).get('x-pathname') ?? '/'
  const { locale, dictionary } = await getI18n()
  return <HeaderShell pathname={pathname} locale={locale} dictionary={dictionary} />
}
