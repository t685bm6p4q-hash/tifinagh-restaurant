import { NextResponse } from 'next/server'
import { menuInlineResponseHeaders } from '@/lib/menu-pdf'
import { loadPublicMenu } from '@/lib/menu-kind'

export const dynamic = 'force-dynamic'

/** Sert le menu (PDF, JPEG ou PNG) en inline. */
export async function GET() {
  try {
    const menu = await loadPublicMenu()
    return new NextResponse(Buffer.from(menu.bytes), {
      headers: menuInlineResponseHeaders(menu.contentType),
    })
  } catch {
    return NextResponse.json({ error: 'Menu du jour indisponible' }, { status: 404 })
  }
}
