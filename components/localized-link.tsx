import Link from 'next/link'
import type { ComponentProps } from 'react'
import { localeHref, type Locale } from '@/lib/i18n'

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  locale: Locale
}

/** Lien interne avec préfixe de locale (/en/…, français sans préfixe). */
export function LocalizedLink({ href, locale, ...rest }: LocalizedLinkProps) {
  return <Link href={localeHref(href, locale)} {...rest} />
}
