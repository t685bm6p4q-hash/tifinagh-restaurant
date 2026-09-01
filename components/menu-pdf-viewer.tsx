import { MENU_PDF_URL } from '@/lib/menu-pdf'

/** PDF menu du jour — iframe same-origin, zero JS. */
export function MenuPdfViewer() {
  return (
    <div className="menu-pdf-viewer-wrap">
      <iframe
        className="menu-pdf-viewer"
        src={MENU_PDF_URL}
        title="Menu du jour — Tifinagh Montmartre"
      />
      <p className="menu-pdf-viewer-fallback">
        <a href={MENU_PDF_URL} target="_blank" rel="noopener noreferrer">
          Ouvrir le menu en plein écran
        </a>
      </p>
    </div>
  )
}
