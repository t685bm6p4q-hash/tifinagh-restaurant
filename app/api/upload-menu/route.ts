import { writeFile } from 'fs/promises'
import { join } from 'path'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import {
  MAX_MENU_PDF_BYTES,
  MENU_PDF_PATHNAME,
  isBlobConfigured,
  isUploadAuthorized,
  resolveMenuUpload,
  sniffMenuContentType,
} from '@/lib/menu-pdf'

export async function POST(request: NextRequest) {
  if (!isUploadAuthorized(request)) {
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
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const resolved = resolveMenuUpload(file)
    if (!resolved) {
      return NextResponse.json(
        { error: 'Le fichier doit être un PDF, un JPEG ou un PNG' },
        { status: 400 },
      )
    }

    if (file.size > MAX_MENU_PDF_BYTES) {
      return NextResponse.json({ error: 'Le fichier est trop volumineux (max 5 MB)' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const sniffed = sniffMenuContentType(new Uint8Array(buffer))
    if (!sniffed || sniffed !== resolved.contentType) {
      return NextResponse.json(
        { error: 'Le fichier ne correspond pas à un PDF, JPEG ou PNG valide' },
        { status: 400 },
      )
    }

    if (isBlobConfigured()) {
      // Un pathname fixe sans suffixe aleatoire garantit que le menu precedent est remplace.
      const blob = await put(MENU_PDF_PATHNAME, buffer, {
        access: 'public',
        contentType: sniffed,
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
      })

      return NextResponse.json({
        success: true,
        message: 'Menu du jour mis à jour avec succès',
        url: blob.url,
      })
    }

    // Sans Blob (developpement local), on ecrit directement dans public/.
    await writeFile(join(process.cwd(), 'public', MENU_PDF_PATHNAME), buffer)

    return NextResponse.json({
      success: true,
      message: 'Menu du jour mis à jour localement',
      url: `/${MENU_PDF_PATHNAME}`,
    })
  } catch (error) {
    console.error("Erreur lors de l'upload :", error)
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier' }, { status: 500 })
  }
}
