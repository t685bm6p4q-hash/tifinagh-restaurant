/** Constantes affichage menu image (sans dépendance Node — safe client). */

/** Largeur LCP mobile (~617 px affichés × ~1,05). */
export const MENU_IMAGE_LCP_WIDTH = 640

/** Largeur desktop (colonne ~880 px). */
export const MENU_IMAGE_PREVIEW_MAX_WIDTH = 920

/** 720 couvre les mobiles ~412 px × DPR 1,75 (~663 px utiles). */
export const MENU_IMAGE_PREVIEW_WIDTHS = [MENU_IMAGE_LCP_WIDTH, 720, MENU_IMAGE_PREVIEW_MAX_WIDTH] as const

export const MENU_IMAGE_SIZES = '(min-width: 881px) 880px, 92vw'

/** Ratio affichage Lighthouse (617×872) pour width/height HTML. */
export const MENU_IMAGE_LAYOUT_WIDTH = 617
export const MENU_IMAGE_LAYOUT_HEIGHT = 872

export function parseMenuDisplayWidth(param: string | null | undefined): number | null {
  const n = Number.parseInt(param ?? '', 10)
  if (!Number.isFinite(n) || n < 320 || n > 1600) return null
  return n
}
