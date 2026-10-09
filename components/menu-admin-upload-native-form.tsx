import { MENU_UPLOAD_ACCEPT } from '@/lib/menu-pdf'
import type { MenuDayVariant } from '@/lib/menu-pdf'
import { uploadMenuPlainFormAction } from '@/app/[locale]/admin/menu-setup/upload-menu-action'

type MenuAdminUploadNativeFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
  inputId: string
}

/** Envoi HTML pur (sans compression navigateur) — secours si le JavaScript ne répond pas. */
export function MenuAdminUploadNativeForm({
  variant,
  title,
  hint,
  inputId,
}: MenuAdminUploadNativeFormProps) {
  return (
    <div className="menu-admin-upload menu-admin-upload--native">
      <p className="menu-admin-upload__title">{title}</p>
      <p className="menu-admin-upload__hint">{hint}</p>
      <form action={uploadMenuPlainFormAction} encType="multipart/form-data" className="menu-admin-upload__form">
        <input type="hidden" name="variant" value={variant} />
        <input
          id={inputId}
          className="menu-admin-upload__file-native"
          type="file"
          name="file"
          accept={MENU_UPLOAD_ACCEPT}
          required
        />
        <label htmlFor={inputId} className="menu-admin-upload__pick">
          <span className="menu-admin-upload__pick-text">📁 Choisir un fichier</span>
        </label>
        <button type="submit" className="menu-admin-upload__validate">
          ✅ Valider et mettre en ligne
        </button>
        <p className="menu-admin-upload__feedback menu-admin-upload__feedback--hint" role="note">
          Secours sans JavaScript : choisissez un fichier JPEG/PNG (&lt; 4 Mo), puis « Valider ».
        </p>
      </form>
    </div>
  )
}
