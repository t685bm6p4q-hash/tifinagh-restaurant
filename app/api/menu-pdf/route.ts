import { NextRequest, NextResponse } from 'next/server'
import { menuInlineResponseHeaders, parseMenuDayVariant, sniffMenuContentType } from '@/lib/menu-pdf'
import { loadPublicMenu } from '@/lib/menu-kind'
import { parseMenuDisplayWidth, resizeMenuImageForDisplay } from '@/lib/resize-menu-image-display'

export const dynamic = 'force-dynamic'

async function serveMenu(request: NextRequest, body: boolean) {
  const requested = parseMenuDayVariant(request.nextUrl.searchParams.get('variant'))

  try {
    const menu = await loadPublicMenu(requested)
    const displayWidth = parseMenuDisplayWidth(request.nextUrl.searchParams.get('w'))
    const contentType =
      menu.contentType.startsWith('image/') ? menu.contentType : sniffMenuContentType(menu.bytes) ?? menu.contentType
    let bytes = menu.bytes
    let servedType = contentType

    if (body && displayWidth && contentType.startsWith('image/')) {
      const resized = await resizeMenuImageForDisplay(menu.bytes, displayWidth)
      bytes = new Uint8Array(resized)
      servedType = 'image/webp'
    }

    const headers = new Headers(menuInlineResponseHeaders(servedType, menu.variant))
    if (displayWidth && contentType.startsWith('image/')) {
      headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    }
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
