import { preload } from 'react-dom'
import { HomeTemplate } from '@/src/components/templates/home-template'

export default function Home() {
  preload('/images/hero-salle-640.webp', { as: 'image', fetchPriority: 'high' })
  return <HomeTemplate />
}
