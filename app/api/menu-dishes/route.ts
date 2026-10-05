import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized } from '@/lib/admin-auth'
import { getMenuDishes, saveMenuDishes } from '@/lib/menu-dishes'
import { MAX_MENU_DISHES_CHARS, normalizeMenuDishesText } from '@/lib/menu-dishes-format'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.json(await getMenuDishes())
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const record = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
  const variant = record.variant === 'en' ? 'en' : record.variant === 'fr' ? 'fr' : null
  if (!variant) {
    return NextResponse.json({ error: 'Langue invalide' }, { status: 400 })
  }

  const text = normalizeMenuDishesText(record.text)
  if (text === null) {
    return NextResponse.json(
      { error: `Texte trop long (${MAX_MENU_DISHES_CHARS} caractères maximum)` },
      { status: 400 },
    )
  }

  try {
    const saved = await saveMenuDishes(variant, text)
    return NextResponse.json({ success: true, ...saved })
  } catch (error: unknown) {
    console.error('Erreur enregistrement plats du jour :', error)
    return NextResponse.json({ error: "Erreur lors de l'enregistrement du texte" }, { status: 500 })
  }
}
