import { head } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import {
  MENU_PDF_PATHNAME,
  MENU_PDF_STATIC_FALLBACK,
  isBlobConfigured,
} from '@/lib/menu-pdf'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (isBlobConfigured()) {
    try {
      const blob = await head(MENU_PDF_PATHNAME)
      return NextResponse.redirect(blob.url, 307)
    } catch {
      // Aucun menu televerse pour l'instant : on sert le PDF livre avec le site.
    }
  }

  return NextResponse.redirect(new URL(MENU_PDF_STATIC_FALLBACK, request.url), 307)
}
