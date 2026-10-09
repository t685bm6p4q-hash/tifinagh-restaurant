import { Suspense } from 'react'
import { MenuAdminUploadNativeForm } from '@/components/menu-admin-upload-native-form'
import { MenuSetupAdminClient } from './menu-setup-client'

export default function MenuSetupAdminPage() {
  return (
    <>
      <Suspense fallback={null}>
        <MenuSetupAdminClient />
      </Suspense>
      <noscript>
        <div className="menu-admin-noscript">
          <MenuAdminUploadNativeForm
            variant="fr"
            title="Menu du jour (français)"
            hint="Sans JavaScript : JPEG ou PNG léger (&lt; 4 Mo)."
          />
          <MenuAdminUploadNativeForm
            variant="en"
            title="Daily menu (English)"
            hint="No JavaScript: light JPEG or PNG (&lt; 4 MB)."
          />
        </div>
      </noscript>
    </>
  )
}
