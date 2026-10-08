/** Constantes affichage menu image (sans dépendance Node — safe client). */

/** Largeur LCP mobile (~617 px affichés × ~1,05). */
export const MENU_IMAGE_LCP_WIDTH = 640

/** Largeur desktop (colonne ~880 px). */
export const MENU_IMAGE_PREVIEW_MAX_WIDTH = 920

/** 640 + 920 : évite un palier intermédiaire (ex. 720) plus lourd que nécessaire pour le LCP mobile. */
export const MENU_IMAGE_PREVIEW_WIDTHS = [MENU_IMAGE_LCP_WIDTH, MENU_IMAGE_PREVIEW_MAX_WIDTH] as const

/** Plafond de décodage Sharp (photo de téléphone ≈ 12–48 Mpx) contre les bombes de décompression. */
export const MENU_IMAGE_MAX_INPUT_PIXELS = 50_000_000

/** 85vw ≈ largeur réelle dans le conteneur (padding) pour mieux cibler le 640w sur mobile. */
export const MENU_IMAGE_SIZES = '(min-width: 881px) 880px, 85vw'

/** Ratio affichage Lighthouse (617×872) pour width/height HTML. */
export const MENU_IMAGE_LAYOUT_WIDTH = 617
export const MENU_IMAGE_LAYOUT_HEIGHT = 872

/** Ramène `?w=` sur une largeur servie : borne Sharp et le cache à deux variantes par menu. */
export function parseMenuDisplayWidth(param: string | null | undefined): number | null {
  const n = Number.parseInt(param ?? '', 10)
  if (!Number.isFinite(n) || n < 320 || n > 1600) return null
  return n <= (MENU_IMAGE_LCP_WIDTH + MENU_IMAGE_PREVIEW_MAX_WIDTH) / 2
    ? MENU_IMAGE_LCP_WIDTH
    : MENU_IMAGE_PREVIEW_MAX_WIDTH
}
