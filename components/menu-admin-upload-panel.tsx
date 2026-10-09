'use client'

import { useId, useRef, useState } from 'react'
import { prepareMenuFileForUpload } from '@/lib/compress-menu-browser'
import { dispatchMenuUploadSuccess } from '@/lib/menu-upload-events'
import { parseMenuUploadResponse } from '@/lib/menu-upload-api'
import {
  formatMenuUploadFileSize,
  isMenuSourceWithinLimit,
  MENU_UPLOAD_ACCEPT,
  menuUploadSourceTooLargeMessage,
  resolveMenuUpload,
  type MenuDayVariant,
} from '@/lib/menu-pdf'

type MenuAdminUploadPanelProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  uploadToken: string
}

type UploadPhase = 'idle' | 'optimizing' | 'uploading'

export function MenuAdminUploadPanel({
  variant,
  title,
  hint,
  uploadToken,
}: MenuAdminUploadPanelProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [picked, setPicked] = useState<File | null>(null)
  const [phase, setPhase] = useState<UploadPhase>('idle')
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | 'hint'; text: string } | null>(
    {
      type: 'hint',
      text: '1) Parcourir · 2) Choisir la photo · 3) Mettre en ligne (⏳ pendant l’envoi).',
    },
  )

  const busy = phase !== 'idle'

  const onFileChange = () => {
    const file = inputRef.current?.files?.[0] ?? null
    setPicked(file)
    if (file) {
      setFeedback({
        type: 'hint',
        text: `Fichier sélectionné : ${file.name} (${formatMenuUploadFileSize(file.size)}). Cliquez sur « Mettre en ligne ».`,
      })
    }
  }

  const onUpload = async () => {
    const file = inputRef.current?.files?.[0] ?? picked
    if (!file) {
      setFeedback({ type: 'error', text: '❌ Choisissez d’abord une photo ou un PDF avec « Parcourir ».' })
      return
    }

    const resolved = resolveMenuUpload(file)
    if (!resolved) {
      setFeedback({
        type: 'error',
        text: '❌ Format non pris en charge (HEIC iPhone ?). Dans Photos : Partager → Enregistrer en JPEG, puis réessayez.',
      })
      return
    }

    if (!isMenuSourceWithinLimit(file.size)) {
      setFeedback({ type: 'error', text: `❌ ${menuUploadSourceTooLargeMessage(file.size)}` })
      return
    }

    const isPdf = resolved.contentType === 'application/pdf'

    setPhase('optimizing')
    setFeedback({ type: 'hint', text: '⏳ Optimisation de l’image dans votre navigateur…' })

    let payload: File
    try {
      payload = await prepareMenuFileForUpload(file, variant, isPdf)
    } catch (error: unknown) {
      const code = error instanceof Error ? error.message : ''
      if (code === 'IMAGE_TOO_HEAVY') {
        setFeedback({
          type: 'error',
          text: '❌ Fichier trop lourd après optimisation. Essayez une photo plus petite ou moins détaillée.',
        })
      } else if (code === 'PDF_RENDER') {
        setFeedback({
          type: 'error',
          text: '❌ Impossible de lire ce PDF ici. Exportez la 1ʳᵉ page en JPEG/PNG depuis Aperçu ou Acrobat.',
        })
      } else {
        setFeedback({
          type: 'error',
          text: '❌ Erreur lors de la préparation du fichier. Réessayez avec un JPEG ou PNG.',
        })
      }
      setPhase('idle')
      return
    }

    setPhase('uploading')
    setFeedback({
      type: 'hint',
      text: `⏳ Envoi en cours (${formatMenuUploadFileSize(payload.size)})… ne fermez pas la page.`,
    })

    const formData = new FormData()
    formData.set('variant', variant)
    formData.set('uploadToken', uploadToken)
    formData.set('file', payload, payload.name)

    try {
      const response = await fetch('/api/upload-menu', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      })

      if (response.status === 413) {
        setFeedback({
          type: 'error',
          text: '❌ Fichier trop volumineux pour le serveur. Réessayez : le site compresse automatiquement — contactez le support si ça persiste.',
        })
        setPhase('idle')
        return
      }

      const parsed = await parseMenuUploadResponse(response)
      if (parsed.kind === 'success') {
        setFeedback({ type: 'success', text: `✅ ${parsed.body.message}` })
        setPicked(null)
        if (inputRef.current) inputRef.current.value = ''
        dispatchMenuUploadSuccess({ variant })
        setPhase('idle')
        return
      }

      if (parsed.kind === 'error') {
        setFeedback({ type: 'error', text: `❌ ${parsed.body.error}` })
        setPhase('idle')
        return
      }

      if (response.status === 401) {
        setFeedback({
          type: 'error',
          text: '❌ Session expirée — rechargez la page (F5), reconnectez-vous avec le mot de passe, puis réessayez.',
        })
      } else {
        setFeedback({
          type: 'error',
          text: `❌ Échec de l’envoi (erreur ${response.status}). Réessayez ou rechargez la page admin.`,
        })
      }
    } catch {
      setFeedback({
        type: 'error',
        text: '❌ Réseau indisponible. Vérifiez la connexion Wi‑Fi et réessayez.',
      })
    }

    setPhase('idle')
  }

  return (
    <div className="menu-admin-upload">
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
          onChange={onFileChange}
        />

        <button
          type="button"
          className="menu-admin-upload__browse"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          📂 Parcourir…
        </button>

        <button
          type="button"
          className="menu-admin-upload__submit-native"
          disabled={busy || !picked}
          onClick={() => void onUpload()}
        >
          {phase === 'optimizing'
            ? '⏳ Optimisation…'
            : phase === 'uploading'
              ? '⏳ Mise en ligne…'
              : '🚀 Mettre en ligne sur le site'}
        </button>

        {feedback ? (
          <p
            className={`menu-admin-upload__feedback menu-admin-upload__feedback--${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            {feedback.text}
          </p>
        ) : null}
      </div>
    </div>
  )
}
