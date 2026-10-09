import { Suspense } from 'react'
import { MenuAdminUploadNativeForm } from '@/components/menu-admin-upload-native-form'
import { MenuSetupAdminClient } from './menu-setup-client'

export const dynamic = 'force-dynamic'

export default function MenuSetupAdminPage() {
  return (
    <Suspense fallback={null}>
      <MenuSetupAdminClient
        frUpload={
          <MenuAdminUploadNativeForm
            variant="fr"
            title="Menu du jour (français)"
            hint="Fichier affiché aux visiteurs en français."
          />
        }
        enUpload={
          <MenuAdminUploadNativeForm
            variant="en"
            title="Daily menu (English)"
            hint="Fichier affiché aux visiteurs in English."
          />
        }
      />
    </Suspense>
  )
}
