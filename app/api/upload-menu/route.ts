import { writeFile } from 'fs/promises'
import { join } from 'path'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized } from '@/lib/admin-auth'
import { compressMenuImageToWebp } from '@/lib/compress-menu-image'
import { getMenuStorageStatus } from '@/lib/menu-kind'
import {
  MAX_MENU_PDF_BYTES,
  MAX_MENU_UPLOAD_BYTES,
  PDF_TOO_HEAVY_MESSAGE,
  isBlobConfigured,
  menuBlobPathname,
  resolveMenuUpload,
  resolveMenuUploadVariant,
  sniffMenuContentType,
} from '@/lib/menu-pdf'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const [fr, en] = await Promise.all([
    getMenuStorageStatus('fr'),
    getMenuStorageStatus('en'),
  ])

  return NextResponse.json({ fr, en })
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
    if (!resolved) {
      return NextResponse.json(
        { error: 'Le fichier doit être un PDF, un JPEG, un PNG ou un WebP' },
        { status: 400 },
      )
    }

    const isPdf = resolved.contentType === 'application/pdf'
    const maxBytes = isPdf ? MAX_MENU_PDF_BYTES : MAX_MENU_UPLOAD_BYTES
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: isPdf ? PDF_TOO_HEAVY_MESSAGE : 'La photo est trop volumineuse (max 10 MB)' },
        { status: 400 },
      )
    }

    let buffer = Buffer.from(await file.arrayBuffer())
    const sniffed = sniffMenuContentType(new Uint8Array(buffer))
    if (!sniffed || sniffed !== resolved.contentType) {
      return NextResponse.json(
        { error: 'Le fichier ne correspond pas à un PDF, JPEG, PNG ou WebP valide' },
        { status: 400 },
      )
    }

    let contentType = sniffed
    if (!isPdf) {
      try {
        buffer = Buffer.from(await compressMenuImageToWebp(buffer))
        contentType = 'image/webp'
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'IMAGE_TOO_HEAVY') {
          return NextResponse.json(
            { error: 'Impossible de compresser cette image sous 1 Mo' },
            { status: 400 },
          )
        }
        throw error
      }
    }

    const pathname = menuBlobPathname(variant)

    if (isBlobConfigured()) {
      const blob = await put(pathname, buffer, {
        access: 'public',
        contentType,
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
      })

      return NextResponse.json({
        success: true,
        message: isPdf
          ? variant === 'en'
            ? 'Menu anglais mis à jour avec succès'
            : 'Menu du jour mis à jour avec succès'
          : 'Menu compressé en WebP (1 Mo max) et mis à jour',
        url: blob.url,
        variant,
        pathname,
      })
    }

    await writeFile(join(process.cwd(), 'public', pathname), buffer)

    return NextResponse.json({
      success: true,
      message: isPdf
        ? variant === 'en'
          ? 'Menu anglais mis à jour localement'
          : 'Menu du jour mis à jour localement'
        : 'Menu compressé en WebP (1 Mo max) et mis à jour localement',
      url: `/${pathname}`,
      variant,
      pathname,
    })
  } catch (error: unknown) {
    console.error("Erreur lors de l'upload :", error)
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier' }, { status: 500 })
  }
}
