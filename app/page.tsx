import { preload } from 'react-dom'
import { HomeTemplate } from '@/src/components/templates/home-template'
import { HERO_IMAGE_MOBILE } from '@/lib/hero-image'

export default function Home() {
  preload(HERO_IMAGE_MOBILE, { as: 'image', fetchPriority: 'high' })

  return <HomeTemplate />
}
