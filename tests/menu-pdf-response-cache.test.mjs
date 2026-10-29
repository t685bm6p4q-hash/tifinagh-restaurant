import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { menuRevisionCacheKey } from '../lib/menu-pdf.ts'
import {
  MENU_PDF_CDN_CACHE_CONTROL,
  MENU_PDF_PINNED_CACHE_CONTROL,
  applyMenuPdfCacheHeaders,
  menuPdfResponseCacheControl,
} from '../lib/menu-pdf-response-cache.ts'

describe('menuPdfResponseCacheControl', () => {
  it('met en cache CDN 60 s les URL sans révision', () => {
    assert.equal(menuPdfResponseCacheControl(null, 'etag-1'), MENU_PDF_CDN_CACHE_CONTROL)
    assert.equal(menuPdfResponseCacheControl(null, null), MENU_PDF_CDN_CACHE_CONTROL)
    assert.equal(
      MENU_PDF_CDN_CACHE_CONTROL,
      'public, s-maxage=60, stale-while-revalidate=300',
    )
  })

  it('fige le CDN quand ?r= correspond à la révision servie', () => {
    const served = 'etag/rev 2026'
    assert.equal(
      menuPdfResponseCacheControl(menuRevisionCacheKey(served), menuRevisionCacheKey(served)),
      MENU_PDF_PINNED_CACHE_CONTROL,
    )
  })

  it('ne fige pas une révision qui ne correspond pas', () => {
    assert.equal(menuPdfResponseCacheControl('ancienne', 'rev-2026'), MENU_PDF_CDN_CACHE_CONTROL)
  })

  it('pose les trois en-têtes lus par le CDN Vercel', () => {
    const headers = new Headers()
    applyMenuPdfCacheHeaders(headers, MENU_PDF_CDN_CACHE_CONTROL)
    assert.equal(headers.get('Cache-Control'), MENU_PDF_CDN_CACHE_CONTROL)
    assert.equal(headers.get('CDN-Cache-Control'), MENU_PDF_CDN_CACHE_CONTROL)
    assert.equal(headers.get('Vercel-CDN-Cache-Control'), MENU_PDF_CDN_CACHE_CONTROL)
  })
})
