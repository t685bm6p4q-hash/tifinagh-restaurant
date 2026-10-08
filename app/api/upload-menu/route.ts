import { writeFile } from 'fs/promises'
import { join } from 'path'
import { writePrivateMenuBlob } from '@/lib/menu-blob-store'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized } from '@/lib/admin-auth'
import { revalidateMenuPublicCache } from '@/lib/menu-public-cache'
import { compressMenuImageToWebp } from '@/lib/compress-menu-image'
import { probeMenuBlobAccess } from '@/lib/menu-blob-access-probe'
import { getMenuStorageOverview } from '@/lib/menu-kind'
import {
  MAX_MENU_UPLOAD_BYTES,
  isBlobConfigured,
  isMenuUploadWithinSizeLimit,
  menuBlobPathname,
  menuPdfApiUrl,
  menuUploadTooHeavyMessage,
  resolveMenuUpload,
  resolveMenuUploadVariant,
  sniffMenuContentType,
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

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json(
      {
        error:
          'Accès refusé : authentification admin requise (MENU_ADMIN_PASSWORD).',
      },
      { status: 401 },
    )
  }

  try {
    const formData = await request.formData()
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

    const resolved = resolveMenuUpload(file)
    if (!resolved || resolved.contentType === 'application/pdf') {
      return NextResponse.json(
        { error: 'Le serveur attend une image optimisée (WebP, JPEG ou PNG). Rechargez la page admin.' },
        { status: 400 },
      )
    }

    if (!isMenuUploadWithinSizeLimit(file.size)) {
      return NextResponse.json({ error: menuUploadTooHeavyMessage(file.size) }, { status: 400 })
    }

    let buffer = Buffer.from(await file.arrayBuffer())
    const sniffed = sniffMenuContentType(new Uint8Array(buffer))
    if (!sniffed || sniffed !== resolved.contentType) {
      return NextResponse.json(
        { error: 'Le fichier ne correspond pas à une image JPEG, PNG ou WebP valide' },
        { status: 400 },
      )
    }

    let contentType = sniffed
    if (contentType !== 'image/webp') {
      try {
        buffer = Buffer.from(await compressMenuImageToWebp(buffer))
        contentType = 'image/webp'
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'IMAGE_TOO_HEAVY') {
          return NextResponse.json(
            { error: menuUploadTooHeavyMessage(file.size) },
            { status: 400 },
          )
        }
        throw error
      }
    }

    if (buffer.length > MAX_MENU_UPLOAD_BYTES) {
      return NextResponse.json({ error: menuUploadTooHeavyMessage(buffer.length) }, { status: 400 })
    }

    const pathname = menuBlobPathname(variant)

    if (isBlobConfigured()) {
      await writePrivateMenuBlob(pathname, buffer, contentType)

      revalidateMenuPublicCache()
      return NextResponse.json({
        success: true,
        message: 'Menu optimisé en WebP (1 Mo max) et mis à jour',
        url: menuPdfApiUrl(variant),
        variant,
        pathname,
      })
    }

    await writeFile(join(process.cwd(), 'public', pathname), buffer)
    revalidateMenuPublicCache()

    return NextResponse.json({
      success: true,
      message: 'Menu optimisé en WebP (1 Mo max) et mis à jour localement',
      url: `/${pathname}`,
      variant,
      pathname,
    })
  } catch (error: unknown) {
    console.error("Erreur lors de l'upload :", error)
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('BLOB_READ_WRITE_TOKEN') || msg.includes('token')) {
      return NextResponse.json(
        { error: 'Blob Vercel indisponible — vérifiez BLOB_READ_WRITE_TOKEN sur Vercel.' },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier' }, { status: 500 })
  }
}
