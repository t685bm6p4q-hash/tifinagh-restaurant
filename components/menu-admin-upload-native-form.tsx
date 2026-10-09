import Link from 'next/link'
import { MENU_UPLOAD_ACCEPT } from '@/lib/menu-pdf'
import type { MenuDayVariant } from '@/lib/menu-pdf'
import { mintAdminMenuUploadToken } from '@/lib/mint-admin-upload-token'

type MenuAdminUploadNativeFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
}

/**
 * Upload menu — formulaire HTML natif (POST /api/upload-menu).
 * Jeton signé inclus : fonctionne même si le cookie HttpOnly n’accompagne pas le POST.
 */
export async function MenuAdminUploadNativeForm({
  variant,
  title,
  hint,
}: MenuAdminUploadNativeFormProps) {
  const uploadToken = await mintAdminMenuUploadToken()

  if (!uploadToken) {
    return (
      <div className="menu-admin-upload">
        <p className="menu-admin-upload__title">{title}</p>
        <p className="menu-admin-upload__feedback menu-admin-upload__feedback--error" role="alert">
          ❌ Accès admin requis — fermez l’onglet, rouvrez{' '}
          <Link href="/admin/menu-setup">/admin/menu-setup</Link> et entrez le mot de passe.
        </p>
      </div>
    )
  }

  return (
    <div className="menu-admin-upload">
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <form
        action="/api/upload-menu?redirect=1"
        method="POST"
        encType="multipart/form-data"
        className="menu-admin-upload__form"
      >
        <input type="hidden" name="variant" value={variant} />
        <input type="hidden" name="uploadToken" value={uploadToken} />
        <label className="menu-admin-upload__file-field">
          <span className="menu-admin-upload__file-field-label">Fichier (JPEG, PNG ou PDF — max 4 Mo ici)</span>
          <input
            className="menu-admin-upload__file-native"
            type="file"
            name="file"
            accept={MENU_UPLOAD_ACCEPT}
            required
          />
        </label>
        <button type="submit" className="menu-admin-upload__submit-native">
          📁 Choisir un fichier et mettre en ligne
        </button>
        <p className="menu-admin-upload__feedback menu-admin-upload__feedback--hint" role="note">
          1) Parcourir · 2) Choisir la photo · 3) Bouton vert. Session valide 10 min après chargement de la page.
        </p>
      </form>
    </div>
  )
}
