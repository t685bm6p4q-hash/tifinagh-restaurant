import { writeFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Le fichier doit être un PDF' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier est trop volumineux (max 5 MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sauvegarder dans public/menu-du-jour.pdf
    const publicPath = join(process.cwd(), 'public', 'menu-du-jour.pdf')
    await writeFile(publicPath, buffer)

    return NextResponse.json({
      success: true,
      message: 'Menu du jour mis à jour avec succès',
      file: 'menu-du-jour.pdf',
    })
  } catch (error) {
    console.error('Erreur lors de l\'upload :', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du fichier' },
      { status: 500 }
    )
  }
}
