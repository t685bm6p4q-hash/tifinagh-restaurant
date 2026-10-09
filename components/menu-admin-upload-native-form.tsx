import { MENU_UPLOAD_ACCEPT } from '@/lib/menu-pdf'
import type { MenuDayVariant } from '@/lib/menu-pdf'
import { uploadMenuPlainFormAction } from '@/app/[locale]/admin/menu-setup/upload-menu-action'

type MenuAdminUploadNativeFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
}

/**
 * Upload menu — formulaire HTML natif (sans JavaScript).
 * Le sélecteur « Parcourir / Choisir » est celui du téléphone ou du navigateur.
 */
export function MenuAdminUploadNativeForm({
  variant,
  title,
  hint,
}: MenuAdminUploadNativeFormProps) {
  return (
    <div className="menu-admin-upload">
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <form action={uploadMenuPlainFormAction} encType="multipart/form-data" className="menu-admin-upload__form">
        <input type="hidden" name="variant" value={variant} />
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
          1) Touchez « Parcourir » ou « Choisir un fichier » · 2) Sélectionnez la photo · 3) Touchez le bouton vert.
        </p>
      </form>
    </div>
  )
}
