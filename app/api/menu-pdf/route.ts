import { unstable_cache } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import {
  menuInlineResponseHeaders,
  parseMenuDayVariant,
  sniffMenuContentType,
  type MenuDayVariant,
} from '@/lib/menu-pdf'
import type { LoadedPublicMenu } from '@/lib/menu-kind'
import { loadPublicMenu } from '@/lib/menu-kind'
import { parseMenuDisplayWidth } from '@/lib/menu-image-display'
import { applyMenuEmbedHeaders } from '@/lib/menu-subresource-headers'
import { menuPdfImageCacheControl } from '@/lib/menu-pdf-response-cache'
import { resizeMenuImageForDisplay } from '@/lib/resize-menu-image-display'

export const dynamic = 'force-dynamic'

async function resizeMenuImageCached(
  input: Uint8Array,
  displayWidth: number,
  cacheKey: string,
): Promise<Buffer> {
  const bytes = input
  return unstable_cache(
    () => resizeMenuImageForDisplay(bytes, displayWidth),
    ['menu-pdf-webp', cacheKey],
    { revalidate: false },
  )()
}

function menuDisplayEtag(
  menu: LoadedPublicMenu,
  displayWidth: number,
  requested: MenuDayVariant,
): string {
  return `W/"req-${requested}-srv-${menu.variant}-${displayWidth}-${menu.revision}"`
}

async function serveMenu(request: NextRequest, body: boolean) {
  const requested = parseMenuDayVariant(request.nextUrl.searchParams.get('variant'))
  const strict = request.nextUrl.searchParams.get('strict') === '1'

  try {
    const menu = await loadPublicMenu(requested, {
      fallbackEnToFr: requested === 'en' ? !strict : true,
    })
    const displayWidth = parseMenuDisplayWidth(request.nextUrl.searchParams.get('w'))
    const contentType =
      menu.contentType.startsWith('image/') ? menu.contentType : sniffMenuContentType(menu.bytes) ?? menu.contentType
    let bytes = menu.bytes
    let servedType = contentType

    if (body && displayWidth && contentType.startsWith('image/')) {
      const resizeKey = `${menu.variant}-${menu.revision}-w${displayWidth}`
      const resized = await resizeMenuImageCached(menu.bytes, displayWidth, resizeKey)
      bytes = new Uint8Array(resized)
      servedType = 'image/webp'
    }

    const headers = new Headers(menuInlineResponseHeaders(servedType, menu.variant))
    applyMenuEmbedHeaders(headers, servedType)
    headers.set(
      'Cache-Control',
      menuPdfImageCacheControl(menu.revision, displayWidth, contentType.startsWith('image/')),
    )
    if (displayWidth && contentType.startsWith('image/')) {
      const etag = menuDisplayEtag(menu, displayWidth, requested)
      headers.set('ETag', etag)
    }
    headers.set('X-Menu-Requested', requested)
    headers.set('X-Menu-Served-Variant', menu.variant)
    if (menu.fellBackFromEn && requested === 'en') {
      headers.set('X-Menu-Fallback', 'fr')
    }
    if (!body) {
      return new NextResponse(null, { status: 200, headers })
    }
    return new NextResponse(Buffer.from(bytes), { headers })
  } catch {
    return NextResponse.json({ error: 'Menu du jour indisponible' }, { status: 404 })
  }
}

/** Sert le menu (PDF ou image) en inline. `?variant=en` pour la version anglaise. */
export async function GET(request: NextRequest) {
  return serveMenu(request, true)
}

export async function HEAD(request: NextRequest) {
  return serveMenu(request, false)
}
