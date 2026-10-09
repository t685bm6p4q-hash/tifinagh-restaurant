'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isAdminAuthorized } from '@/lib/admin-auth'
import { processMenuUploadFile } from '@/lib/menu-upload-process'
import { resolveMenuUploadVariant } from '@/lib/menu-pdf'

export type MenuUploadActionState = {
  error: string | null
  success: string | null
}

const emptyState: MenuUploadActionState = { error: null, success: null }

function requestFromHeaders(h: Headers): Request {
  return new Request('https://www.tifinagh.fr/api/upload-menu', {
    headers: {
      cookie: h.get('cookie') ?? '',
      authorization: h.get('authorization') ?? '',
    },
  })
}

export async function uploadMenuAction(
  _prev: MenuUploadActionState,
  formData: FormData,
): Promise<MenuUploadActionState> {
  const h = await headers()
  if (!isAdminAuthorized(requestFromHeaders(h))) {
    return {
      error:
        '❌ Session admin expirée — rechargez la page (F5) et reconnectez-vous avec le mot de passe.',
      success: null,
    }
  }

  const resolvedVariant = resolveMenuUploadVariant(formData.get('variant'), null)
  if ('error' in resolvedVariant) {
    return { error: `❌ ${resolvedVariant.error}`, success: null }
  }
  const { variant } = resolvedVariant

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return { error: '❌ Aucun fichier choisi.', success: null }
  }

  try {
    const result = await processMenuUploadFile(file, variant)
    if (!result.ok) {
      return { error: `❌ ${result.error}`, success: null }
    }
    revalidatePath('/menu-du-jour')
    revalidatePath('/[locale]/menu-du-jour', 'page')
    return { error: null, success: result.message }
  } catch {
    return { error: '❌ Erreur serveur lors de la mise en ligne.', success: null }
  }
}

export { emptyState as menuUploadActionInitialState }
