import Link from 'next/link'
import type { MenuDayVariant } from '@/lib/menu-pdf'
import { mintAdminMenuUploadToken } from '@/lib/mint-admin-upload-token'
import { MenuAdminUploadPanel } from '@/components/menu-admin-upload-panel'

type MenuAdminUploadNativeFormProps = {
  variant: MenuDayVariant
  title: string
  hint: string
}

/**
 * Upload menu — jeton serveur + envoi fetch côté client (compression + retour ⏳/✅).
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
    <MenuAdminUploadPanel variant={variant} title={title} hint={hint} uploadToken={uploadToken} />
  )
}
