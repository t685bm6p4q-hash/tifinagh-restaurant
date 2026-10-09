import { MenuAdminUploadGate } from '@/components/menu-admin-upload-gate'
import { MenuSetupAdminClient } from './menu-setup-client'

export const dynamic = 'force-dynamic'

export default function MenuSetupAdminPage() {
  return (
    <MenuSetupAdminClient
      frUpload={
        <MenuAdminUploadGate
          variant="fr"
          title="Menu du jour (français)"
          hint="Fichier affiché aux visiteurs en français."
        />
      }
      enUpload={
        <MenuAdminUploadGate
          variant="en"
          title="Daily menu (English)"
          hint="Fichier affiché aux visiteurs in English."
        />
      }
    />
  )
}
