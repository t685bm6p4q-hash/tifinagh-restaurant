import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, isAdminAuthorizedForMenuUpload } from '@/lib/admin-auth'
import { probeMenuBlobAccess } from '@/lib/menu-blob-access-probe'
import { getMenuStorageOverview } from '@/lib/menu-kind'
import { processMenuUploadFile } from '@/lib/menu-upload-process'
import {
  isBlobConfigured,
  menuBlobPathname,
  menuPdfApiUrl,
  resolveMenuUploadVariant,
} from '@/lib/menu-pdf'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { fr, en } = await getMenuStorageOverview()

  if (!isBlobConfigured()) {
    return NextResponse.json({ fr, en, blobPrivateOnlyReady: null, publicFallbackEnabled: true })
  }

  const [frAccess, enAccess] = await Promise.all([
    fr.exists ? probeMenuBlobAccess(fr.pathname) : Promise.resolve(null),
    en.exists ? probeMenuBlobAccess(en.pathname) : Promise.resolve(null),
  ])

  const frReady = !fr.exists || frAccess?.privateOnlyReady === true
  const enReady = !en.exists || enAccess?.privateOnlyReady === true

  return NextResponse.json({
    fr: { ...fr, blobAccess: frAccess },
    en: { ...en, blobAccess: enAccess },
    blobPrivateOnlyReady: frReady && enReady,
    publicFallbackEnabled: process.env.MENU_BLOB_ALLOW_PUBLIC_FALLBACK !== '0',
  })
}

function adminUploadRedirect(request: NextRequest, query: 'ok' | 'err', message?: string) {
  const url = new URL('/admin/menu-setup', request.url)
  url.searchParams.set('menuUpload', query)
  if (message) url.searchParams.set('msg', message)
  return NextResponse.redirect(url, 303)
}

export async function POST(request: NextRequest) {
  const wantsRedirect = request.nextUrl.searchParams.get('redirect') === '1'

  try {
    const formData = await request.formData()

    if (!isAdminAuthorizedForMenuUpload(request, formData)) {
      if (wantsRedirect) {
        return adminUploadRedirect(
          request,
          'err',
          '❌ Accès refusé — rechargez /admin/menu-setup (F5) et reconnectez-vous avec le mot de passe admin.',
        )
      }
      return NextResponse.json(
        {
          error:
            'Accès refusé : authentification admin requise (MENU_ADMIN_PASSWORD).',
        },
        { status: 401 },
      )
    }

    const resolvedVariant = resolveMenuUploadVariant(
      formData.get('variant'),
      request.nextUrl.searchParams.get('variant'),
    )
    if ('error' in resolvedVariant) {
      if (wantsRedirect) return adminUploadRedirect(request, 'err', resolvedVariant.error)
      return NextResponse.json({ error: resolvedVariant.error }, { status: 400 })
    }
    const { variant } = resolvedVariant
    const file = formData.get('file')

    if (!(file instanceof File)) {
      if (wantsRedirect) return adminUploadRedirect(request, 'err', 'Aucun fichier fourni')
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const result = await processMenuUploadFile(file, variant)
    if (!result.ok) {
      if (wantsRedirect) return adminUploadRedirect(request, 'err', result.error)
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    if (wantsRedirect) {
      return adminUploadRedirect(request, 'ok')
    }

    const pathname = menuBlobPathname(variant)
    const url = isBlobConfigured() ? menuPdfApiUrl(variant) : `/${pathname}`

    return NextResponse.json({
      success: true,
      message: result.message.replace(/^✅\s*/, ''),
      url,
      variant,
      pathname,
    })
  } catch (error: unknown) {
    console.error("Erreur lors de l'upload :", error)
    if (wantsRedirect) {
      return adminUploadRedirect(request, 'err', 'Erreur lors du traitement du fichier')
    }
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier' }, { status: 500 })
  }
}
