import { NextRequest, NextResponse } from 'next/server'
import { menuInlineResponseHeaders, parseMenuDayVariant } from '@/lib/menu-pdf'
import { loadPublicMenu } from '@/lib/menu-kind'

export const dynamic = 'force-dynamic'

/** Sert le menu (PDF ou image) en inline. `?variant=en` pour la version anglaise. */
export async function GET(request: NextRequest) {
  const requested = parseMenuDayVariant(request.nextUrl.searchParams.get('variant'))

  try {
    const menu = await loadPublicMenu(requested)
    const headers = new Headers(menuInlineResponseHeaders(menu.contentType, menu.variant))
    if (menu.fellBackFromEn && requested === 'en') {
      headers.set('X-Menu-Fallback', 'fr')
    }
    return new NextResponse(Buffer.from(menu.bytes), { headers })
  } catch {
    return NextResponse.json({ error: 'Menu du jour indisponible' }, { status: 404 })
  }
}
