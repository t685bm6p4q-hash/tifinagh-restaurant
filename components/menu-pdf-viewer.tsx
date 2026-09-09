import { MENU_PDF_URL } from '@/lib/menu-pdf'
import { getPublicMenuKind } from '@/lib/menu-kind'

/** Menu du jour — iframe pour un PDF, image pour un JPEG/PNG. */
export async function MenuPdfViewer() {
  const kind = await getPublicMenuKind()

  if (kind === 'image') {
    return (
      <div className="menu-pdf-viewer-wrap">
        <img
          className="menu-pdf-viewer menu-pdf-viewer--image"
          src={MENU_PDF_URL}
          alt="Menu du jour — Tifinagh Montmartre"
        />
        <p className="menu-pdf-viewer-fallback">
          <a href={MENU_PDF_URL} target="_blank" rel="noopener noreferrer">
            Ouvrir le menu en plein écran
          </a>
        </p>
      </div>
    )
  }

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
