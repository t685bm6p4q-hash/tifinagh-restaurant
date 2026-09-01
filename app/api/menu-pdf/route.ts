import { head } from '@vercel/blob'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import {
  MENU_PDF_PATHNAME,
  isBlobConfigured,
  pdfInlineResponseHeaders,
} from '@/lib/menu-pdf'

export const dynamic = 'force-dynamic'

async function readStaticMenuPdf(): Promise<Buffer> {
  const filePath = path.join(process.cwd(), 'public', MENU_PDF_PATHNAME)
  return readFile(filePath)
}

/** Sert le PDF en inline (lecture directe + iframe same-origin). */
export async function GET() {
  try {
    if (isBlobConfigured()) {
      try {
        const meta = await head(MENU_PDF_PATHNAME)
        const upstream = await fetch(meta.url)
        if (!upstream.ok) throw new Error('Blob fetch failed')
        const bytes = await upstream.arrayBuffer()
        return new NextResponse(bytes, { headers: pdfInlineResponseHeaders() })
      } catch {
        // Repli sur le PDF statique livre avec le site.
      }
    }

    const file = await readStaticMenuPdf()
    return new NextResponse(file, { headers: pdfInlineResponseHeaders() })
  } catch {
    return NextResponse.json({ error: 'Menu du jour indisponible' }, { status: 404 })
  }
}
