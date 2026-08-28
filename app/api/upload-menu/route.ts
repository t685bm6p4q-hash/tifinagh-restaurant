import { writeFile } from 'fs/promises'
import { join } from 'path'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import {
  MAX_MENU_PDF_BYTES,
  MENU_PDF_PATHNAME,
  isBlobConfigured,
  isUploadAuthorized,
} from '@/lib/menu-pdf'

export async function POST(request: NextRequest) {
  if (!isUploadAuthorized(request)) {
    return NextResponse.json({ error: 'Mot de passe invalide' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Le fichier doit être un PDF' }, { status: 400 })
    }

    if (file.size > MAX_MENU_PDF_BYTES) {
      return NextResponse.json({ error: 'Le fichier est trop volumineux (max 5 MB)' }, { status: 400 })
    }

    if (isBlobConfigured()) {
      // Un pathname fixe sans suffixe aleatoire garantit que le menu precedent est remplace.
      const blob = await put(MENU_PDF_PATHNAME, file, {
        access: 'public',
        contentType: 'application/pdf',
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
    const buffer = Buffer.from(await file.arrayBuffer())
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
