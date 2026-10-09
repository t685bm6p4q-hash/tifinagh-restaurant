/** Émis après un upload menu réussi (panneau client → page admin). */
export const MENU_UPLOAD_SUCCESS_EVENT = 'tifinagh:menu-upload-success'

export function dispatchMenuUploadSuccess(detail?: { variant: 'fr' | 'en' }): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(MENU_UPLOAD_SUCCESS_EVENT, { detail }))
}
