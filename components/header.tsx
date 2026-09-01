import { headers } from 'next/headers'
import { HeaderShell } from '@/components/header-nav'

export async function Header() {
  const pathname = (await headers()).get('x-pathname') ?? '/'
  return <HeaderShell pathname={pathname} />
}
