import { Suspense } from 'react'
import { headers } from 'next/headers'
import { HeaderShell } from '@/components/header-nav'

async function HeaderAsync() {
  const pathname = (await headers()).get('x-pathname') ?? '/'
  return <HeaderShell pathname={pathname} />
}

/** Nav active via serveur, streamée en Suspense pour ne pas bloquer le LCP. */
export function Header() {
  return (
    <Suspense fallback={<HeaderShell pathname="" />}>
      <HeaderAsync />
    </Suspense>
  )
}
