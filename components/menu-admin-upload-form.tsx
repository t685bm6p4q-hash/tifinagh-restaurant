'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { MENU_UPLOAD_ACCEPT, type MenuDayVariant } from '@/lib/menu-pdf'
import {
  menuAdminUploadUiInitial,
  runMenuAdminUpload,
  type MenuAdminUploadUi,
} from '@/lib/menu-admin-upload-client'

type MenuAdminUploadFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  onUploaded?: () => void
}

export function MenuAdminUploadForm({ variant, title, hint, onUploaded }: MenuAdminUploadFormProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const busyRef = useRef(false)
  const [ui, setUi] = useState<MenuAdminUploadUi>(menuAdminUploadUiInitial)

  const patchUi = (patch: Partial<MenuAdminUploadUi>) => {
    setUi((prev) => ({ ...prev, ...patch }))
  }

  useEffect(() => {
    patchUi({ hydrated: true })
    const input = inputRef.current
    if (!input) return

    const onFileChosen = () => {
      if (busyRef.current) {
        input.value = ''
        return
      }
      const file = input.files?.[0]
      if (!file) return
      busyRef.current = true
      void runMenuAdminUpload(file, variant, input, (p) => {
        patchUi(p)
        if (p.success) onUploaded?.()
      }).finally(() => {
        busyRef.current = false
      })
    }

    input.addEventListener('change', onFileChosen)
    return () => input.removeEventListener('change', onFileChosen)
  }, [variant, onUploaded])

  const busy = ui.phase !== 'idle'

  const pickLabel =
    ui.phase === 'preparing'
      ? '⏳ Préparation de l’image…'
      : ui.phase === 'uploading'
        ? '⏳ Mise en ligne…'
        : ui.success
          ? '📁 Choisir un autre fichier'
          : '📁 Choisir un fichier'

  const liveMessage =
    ui.phase === 'preparing'
      ? '⏳ Compression sur votre appareil…'
      : ui.phase === 'uploading'
        ? '⏳ Envoi au serveur…'
        : ui.error ?? ui.success ?? (ui.hydrated
            ? 'Prêt : touchez le bouton vert et choisissez une photo ou un PDF.'
            : 'Chargement de l’outil d’envoi…')

  const liveRole = ui.error ? 'alert' : 'status'
  const liveClass = ui.error
    ? 'menu-admin-upload__feedback--error'
    : ui.success
      ? 'menu-admin-upload__feedback--success'
      : ui.phase !== 'idle'
        ? 'menu-admin-upload__feedback--info'
        : 'menu-admin-upload__feedback--hint'

  return (
    <div
      className="menu-admin-upload menu-admin-upload--enhanced"
      data-menu-upload-variant={variant}
      data-menu-upload-hydrated={ui.hydrated ? '1' : '0'}
    >
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <div className="menu-admin-upload__form">
        <input
          ref={inputRef}
          id={inputId}
          className="menu-admin-upload__file-native"
          type="file"
          accept={MENU_UPLOAD_ACCEPT}
          disabled={busy}
        />
        <label
          htmlFor={inputId}
          className={`menu-admin-upload__pick${busy ? ' menu-admin-upload__pick--busy' : ''}`}
        >
          <span className="menu-admin-upload__pick-text">{pickLabel}</span>
        </label>
        {ui.pickedName && busy ? (
          <p className="menu-admin-upload__picked">{ui.pickedName}</p>
        ) : null}
        <p
          className={`menu-admin-upload__feedback ${liveClass}`}
          role={liveRole}
          aria-live="polite"
          aria-atomic="true"
        >
          {liveMessage}
        </p>
      </div>
    </div>
  )
}
