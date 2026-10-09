'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import {
  menuUploadActionInitialState,
  uploadMenuAction,
  type MenuUploadActionState,
} from '@/app/[locale]/admin/menu-setup/upload-menu-action'
import { MENU_UPLOAD_ACCEPT } from '@/lib/menu-pdf'
import type { MenuDayVariant } from '@/lib/menu-pdf'

type MenuAdminUploadFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  onUploaded?: () => void
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="menu-admin-upload__submit"
    >
      {pending ? '⏳ Mise en ligne…' : '📁 Choisir un fichier et envoyer'}
    </button>
  )
}

function FormFeedback({ state }: { state: MenuUploadActionState }) {
  const { pending } = useFormStatus()
  if (pending) {
    return (
      <p className="menu-admin-upload__feedback menu-admin-upload__feedback--info" role="status">
        ⏳ Optimisation et envoi en cours…
      </p>
    )
  }
  if (state.error) {
    return (
      <p className="menu-admin-upload__feedback menu-admin-upload__feedback--error" role="alert">
        {state.error}
      </p>
    )
  }
  if (state.success) {
    return (
      <p className="menu-admin-upload__feedback menu-admin-upload__feedback--success" role="status">
        {state.success}
      </p>
    )
  }
  return (
    <p className="menu-admin-upload__feedback menu-admin-upload__feedback--hint" role="note">
      JPEG, PNG ou WebP — le serveur optimise automatiquement (max 10 Mo).
    </p>
  )
}

export function MenuAdminUploadForm({ variant, title, hint, onUploaded }: MenuAdminUploadFormProps) {
  const [state, formAction] = useActionState(uploadMenuAction, menuUploadActionInitialState)

  useEffect(() => {
    if (state.success) onUploaded?.()
  }, [state.success, onUploaded])

  return (
    <div className="menu-admin-upload">
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <form action={formAction} encType="multipart/form-data" className="menu-admin-upload__form">
        <input type="hidden" name="variant" value={variant} />
        <label className="menu-admin-upload__file-label">
          <span className="menu-admin-upload__file-label-text">Fichier menu</span>
          <input
            className="menu-admin-upload__file-input"
            type="file"
            name="file"
            accept={MENU_UPLOAD_ACCEPT}
            required
          />
        </label>
        <SubmitButton />
        <FormFeedback state={state} />
      </form>
    </div>
  )
}
