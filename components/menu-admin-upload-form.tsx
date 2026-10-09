'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { prepareMenuFileForUpload } from '@/lib/compress-menu-browser'
import { parseMenuUploadResponse } from '@/lib/menu-upload-api'
import {
  isMenuSourceWithinLimit,
  isMenuUploadWithinSizeLimit,
  MENU_UPLOAD_ACCEPT,
  menuUploadSourceTooLargeMessage,
  menuUploadTooHeavyMessage,
  resolveMenuUpload,
  type MenuDayVariant,
} from '@/lib/menu-pdf'

type MenuAdminUploadFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  onUploaded?: () => void
}

type Phase = 'idle' | 'preparing' | 'uploading'

const UPLOAD_TIMEOUT_MS = 120_000

export function MenuAdminUploadForm({ variant, title, hint, onUploaded }: MenuAdminUploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const busyRef = useRef(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pickedName, setPickedName] = useState<string | null>(null)

  const busy = phase !== 'idle'

  useEffect(() => {
    if (success) onUploaded?.()
  }, [success, onUploaded])

  const runUpload = useCallback(
    async (file: File, input: HTMLInputElement) => {
      if (busyRef.current) return
      busyRef.current = true

      setError(null)
      setSuccess(null)
      setPickedName(file.name)

      const resolved = resolveMenuUpload(file)
      if (!resolved) {
        setError(
          '❌ Formats acceptés : PDF, JPEG ou PNG. iPhone (HEIC) : exportez d’abord en JPEG depuis Photos.',
        )
        input.value = ''
        setPickedName(null)
        busyRef.current = false
        return
      }

      if (!isMenuSourceWithinLimit(file.size)) {
        setError(`❌ ${menuUploadSourceTooLargeMessage(file.size)}`)
        input.value = ''
        setPickedName(null)
        busyRef.current = false
        return
      }

      const isPdf = resolved.contentType === 'application/pdf'
      setPhase('preparing')

      try {
        const uploadFile = await Promise.race([
          prepareMenuFileForUpload(file, variant, isPdf),
          new Promise<File>((_, reject) => {
            window.setTimeout(() => reject(new Error('UPLOAD_TIMEOUT')), UPLOAD_TIMEOUT_MS)
          }),
        ])

        if (!isMenuUploadWithinSizeLimit(uploadFile.size)) {
          setError(`❌ ${menuUploadTooHeavyMessage(uploadFile.size)}`)
          return
        }

        setPhase('uploading')

        const formData = new FormData()
        formData.append('file', uploadFile)
        formData.append('variant', variant)

        const response = await fetch(`/api/upload-menu?variant=${variant}`, {
          method: 'POST',
          body: formData,
          credentials: 'same-origin',
        })

        if (response.status === 413) {
          setError(
            '❌ Fichier encore trop lourd pour l’hébergement. Réessayez avec une photo plus petite ou recadrez l’image.',
          )
          return
        }

        const parsed = await parseMenuUploadResponse(response)

        if (response.status === 401) {
          setError(
            '❌ Session admin expirée — rechargez la page (F5) et reconnectez-vous avec le mot de passe.',
          )
          return
        }

        if (parsed.kind === 'success') {
          const label = variant === 'en' ? 'Menu anglais' : 'Menu français'
          setSuccess(`✅ ${label} mis en ligne sur le site.`)
          input.value = ''
          setPickedName(null)
          return
        }

        if (parsed.kind === 'error') {
          setError(`❌ ${parsed.body.error}`)
          return
        }

        setError('❌ Réponse serveur invalide — réessayez ou contactez le support.')
      } catch (err: unknown) {
        const reason = err instanceof Error ? err.message : 'Erreur inconnue'
        if (reason === 'IMAGE_TOO_HEAVY') {
          setError(`❌ ${menuUploadTooHeavyMessage(file.size)}`)
        } else if (reason === 'PDF_RENDER') {
          setError(
            '❌ Impossible de lire ce PDF. Exportez-le en JPEG ou envoyez une photo du menu.',
          )
        } else if (reason === 'CANVAS' || reason === 'ENCODE') {
          setError(
            '❌ Votre navigateur n’a pas pu préparer l’image. Essayez Safari/Chrome à jour ou un JPEG.',
          )
        } else if (reason === 'UPLOAD_TIMEOUT') {
          setError('❌ Délai dépassé (PDF lourd ou connexion lente). Essayez une photo JPEG plus légère.')
        } else {
          setError(`❌ Erreur : ${reason}`)
        }
      } finally {
        setPhase('idle')
        busyRef.current = false
      }
    },
    [variant],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      void runUpload(file, e.target)
    },
    [runUpload],
  )

  const pickLabel =
    phase === 'preparing'
      ? '⏳ Préparation de l’image…'
      : phase === 'uploading'
        ? '⏳ Mise en ligne…'
        : success
          ? '📁 Choisir un autre fichier'
          : '📁 Choisir un fichier'

  return (
    <div className="menu-admin-upload">
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <div className="menu-admin-upload__form">
        <label
          className={`menu-admin-upload__pick${busy ? ' menu-admin-upload__pick--busy' : ''}`}
        >
          <input
            ref={inputRef}
            className="menu-admin-upload__file-native"
            type="file"
            name="file"
            accept={MENU_UPLOAD_ACCEPT}
            disabled={busy}
            onChange={handleFileChange}
          />
          <span className="menu-admin-upload__pick-text">{pickLabel}</span>
        </label>
        {pickedName && busy ? (
          <p className="menu-admin-upload__picked" role="status">
            {pickedName}
          </p>
        ) : null}
        {phase === 'preparing' ? (
          <p className="menu-admin-upload__feedback menu-admin-upload__feedback--info" role="status">
            ⏳ Compression sur votre appareil…
          </p>
        ) : phase === 'uploading' ? (
          <p className="menu-admin-upload__feedback menu-admin-upload__feedback--info" role="status">
            ⏳ Envoi au serveur…
          </p>
        ) : error ? (
          <p className="menu-admin-upload__feedback menu-admin-upload__feedback--error" role="alert">
            {error}
          </p>
        ) : success ? (
          <p className="menu-admin-upload__feedback menu-admin-upload__feedback--success" role="status">
            {success}
          </p>
        ) : (
          <p className="menu-admin-upload__feedback menu-admin-upload__feedback--hint" role="note">
            PDF, JPEG ou PNG (max 10 Mo). Dès la sélection, le menu est optimisé puis validé en ligne.
          </p>
        )}
      </div>
    </div>
  )
}
