import type { Metadata } from 'next'
import { bindPageLocale } from '@/lib/i18n/bind-page-locale'
import { buildPageMetadata, type SeoPageId } from '@/lib/i18n/page-metadata'

export type LocalePageParams = {
  params: Promise<{ locale: string }>
}

export async function metadataForLocalePage(
  params: Promise<{ locale: string }>,
  pageId: SeoPageId,
  options?: { description?: string },
): Promise<Metadata> {
  const locale = bindPageLocale((await params).locale)
  return buildPageMetadata(pageId, locale, undefined, options)
}
