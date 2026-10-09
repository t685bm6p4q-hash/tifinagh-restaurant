import { MENU_UPLOAD_ACCEPT, type MenuDayVariant } from '@/lib/menu-pdf'

export type MenuAdminUploadZoneProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  pickLabel?: string
  statusMessage?: string
  statusTone?: 'hint' | 'info' | 'error' | 'success'
  pickedName?: string | null
  busy?: boolean
}

export function MenuAdminUploadZone({
  variant,
  title,
  hint,
  pickLabel = '📁 Choisir un fichier',
  statusMessage = 'Touchez le bouton vert pour ouvrir vos photos ou fichiers.',
  statusTone = 'hint',
  pickedName = null,
  busy = false,
}: MenuAdminUploadZoneProps) {
  const statusClass = `menu-admin-upload__feedback menu-admin-upload__feedback--${statusTone}`

  return (
    <div className="menu-admin-upload" data-menu-upload-variant={variant}>
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <div className="menu-admin-upload__form">
        <div className={`menu-admin-upload__pick-wrap${busy ? ' menu-admin-upload__pick-wrap--busy' : ''}`}>
          <span className="menu-admin-upload__pick-text">{pickLabel}</span>
          <input
            data-menu-upload-input={variant}
            className="menu-admin-upload__file-overlay"
            type="file"
            accept={MENU_UPLOAD_ACCEPT}
            disabled={busy}
            aria-label={pickLabel}
          />
        </div>
        {pickedName && busy ? (
          <p className="menu-admin-upload__picked">{pickedName}</p>
        ) : null}
        <p
          className={statusClass}
          role={statusTone === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          aria-atomic="true"
          data-menu-upload-status={variant}
        >
          {statusMessage}
        </p>
      </div>
    </div>
  )
}
