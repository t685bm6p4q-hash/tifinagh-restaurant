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
    return NextResponse.json({ fr, en, blobPrivateOnlyReady: null })
  }

  const [frAccess, enAccess] = await Promise.all([
    fr.exists ? probeMenuBlobAccess(fr.pathname) : Promise.resolve(null),
    en.exists ? probeMenuBlobAccess(en.pathname) : Promise.resolve(null),
  ])

  const frReady = !fr.exists || frAccess?.privateOnlyReady === true
  const enReady = !en.exists || enAccess?.privateOnlyReady === true

  return NextResponse.json({
    fr,
    en,
    blobPrivateOnlyReady: frReady && enReady,
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    if (!isAdminAuthorizedForMenuUpload(request, formData)) {
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
      return NextResponse.json({ error: resolvedVariant.error }, { status: 400 })
    }
    const { variant } = resolvedVariant
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const result = await processMenuUploadFile(file, variant)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
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
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier' }, { status: 500 })
  }
}
