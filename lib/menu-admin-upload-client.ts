import { prepareMenuFileForUpload } from '@/lib/compress-menu-browser'
import { parseMenuUploadResponse } from '@/lib/menu-upload-api'
import {
  isMenuSourceWithinLimit,
  isMenuUploadWithinSizeLimit,
  menuUploadSourceTooLargeMessage,
  menuUploadTooHeavyMessage,
  resolveMenuUpload,
  type MenuDayVariant,
} from '@/lib/menu-pdf'

export type MenuAdminUploadPhase = 'idle' | 'preparing' | 'uploading'

export type MenuAdminUploadUi = {
  phase: MenuAdminUploadPhase
  error: string | null
  success: string | null
  pickedName: string | null
  hydrated: boolean
}

export const menuAdminUploadUiInitial: MenuAdminUploadUi = {
  phase: 'idle',
  error: null,
  success: null,
  pickedName: null,
  hydrated: false,
}

const UPLOAD_TIMEOUT_MS = 120_000

export async function runMenuAdminUpload(
  file: File,
  variant: MenuDayVariant,
  input: HTMLInputElement,
  onPhase: (patch: Partial<MenuAdminUploadUi>) => void,
): Promise<void> {
  onPhase({ error: null, success: null, pickedName: file.name, phase: 'preparing' })

  const resolved = resolveMenuUpload(file)
  if (!resolved) {
    onPhase({
      phase: 'idle',
      error:
        '❌ Formats acceptés : PDF, JPEG ou PNG. iPhone (HEIC) : exportez d’abord en JPEG depuis Photos.',
      pickedName: null,
    })
    input.value = ''
    return
  }

  if (!isMenuSourceWithinLimit(file.size)) {
    onPhase({
      phase: 'idle',
      error: `❌ ${menuUploadSourceTooLargeMessage(file.size)}`,
      pickedName: null,
    })
    input.value = ''
    return
  }

  const isPdf = resolved.contentType === 'application/pdf'

  try {
    const uploadFile = await Promise.race([
      prepareMenuFileForUpload(file, variant, isPdf),
      new Promise<File>((_, reject) => {
        window.setTimeout(() => reject(new Error('UPLOAD_TIMEOUT')), UPLOAD_TIMEOUT_MS)
      }),
    ])

    if (!isMenuUploadWithinSizeLimit(uploadFile.size)) {
      onPhase({
        phase: 'idle',
        error: `❌ ${menuUploadTooHeavyMessage(uploadFile.size)}`,
      })
      return
    }

    onPhase({ phase: 'uploading' })

    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('variant', variant)

    const response = await fetch(`/api/upload-menu?variant=${variant}`, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    })

    if (response.status === 413) {
      onPhase({
        phase: 'idle',
        error:
          '❌ Fichier encore trop lourd pour l’hébergement. Réessayez avec une photo plus petite.',
      })
      return
    }

    const parsed = await parseMenuUploadResponse(response)

    if (response.status === 401) {
      onPhase({
        phase: 'idle',
        error:
          '❌ Session admin expirée — rechargez la page (F5) et reconnectez-vous avec le mot de passe.',
      })
      return
    }

    if (parsed.kind === 'success') {
      const label = variant === 'en' ? 'Menu anglais' : 'Menu français'
      onPhase({
        phase: 'idle',
        success: `✅ ${label} mis en ligne sur le site.`,
        pickedName: null,
      })
      input.value = ''
      return
    }

    if (parsed.kind === 'error') {
      onPhase({ phase: 'idle', error: `❌ ${parsed.body.error}` })
      return
    }

    onPhase({
      phase: 'idle',
      error: '❌ Réponse serveur invalide — réessayez ou contactez le support.',
    })
  } catch (err: unknown) {
    const reason = err instanceof Error ? err.message : 'Erreur inconnue'
    if (reason === 'IMAGE_TOO_HEAVY') {
      onPhase({ phase: 'idle', error: `❌ ${menuUploadTooHeavyMessage(file.size)}` })
    } else if (reason === 'PDF_RENDER') {
      onPhase({
        phase: 'idle',
        error: '❌ Impossible de lire ce PDF. Exportez-le en JPEG ou envoyez une photo du menu.',
      })
    } else if (reason === 'CANVAS' || reason === 'ENCODE') {
      onPhase({
        phase: 'idle',
        error:
          '❌ Votre navigateur n’a pas pu préparer l’image. Essayez Safari/Chrome à jour ou un JPEG.',
      })
    } else if (reason === 'UPLOAD_TIMEOUT') {
      onPhase({
        phase: 'idle',
        error: '❌ Délai dépassé. Essayez une photo JPEG plus légère.',
      })
    } else {
      onPhase({ phase: 'idle', error: `❌ Erreur : ${reason}` })
    }
  }
}
