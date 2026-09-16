import { headers } from 'next/headers'
import { SeoDocumentSync } from '@/components/seo-document-sync'
import { getI18n } from '@/lib/i18n'
import { formatDocumentTitle, seoPagePaths, type SeoPageId } from '@/lib/i18n/page-metadata'

const pathToPageId = Object.fromEntries(
  Object.entries(seoPagePaths).map(([id, path]) => [path, id as SeoPageId]),
) as Record<string, SeoPageId>

export async function SeoDocumentSyncServer() {
  const pathname = (await headers()).get('x-pathname') ?? '/'
  const pageId = pathToPageId[pathname] ?? 'home'
  const { dictionary } = await getI18n()
  const page = dictionary.seo.pages[pageId]
  const title = formatDocumentTitle(dictionary, pageId)

  return <SeoDocumentSync title={title} description={page.description} />
}
