import Link from 'next/link'
import { ArrowRightIcon, ChefHatIcon, WineIcon } from '@/components/icons'

type MenuCrossLinkProps = {
  eyebrow: string
  title: string
  text: string
  href: string
  cta: string
  variant: 'to-daily' | 'to-carte' | 'to-drinks'
}

export function MenuCrossLink({
  eyebrow,
  title,
  text,
  href,
  cta,
  variant,
}: MenuCrossLinkProps) {
  return (
    <aside className={`menu-cross-link menu-cross-link--${variant}`} aria-label={title}>
      <div className="menu-cross-link-inner">
        <div className="menu-cross-link-icon" aria-hidden="true">
          {variant === 'to-drinks' ? <WineIcon size={22} /> : <ChefHatIcon size={22} />}
        </div>
        <div className="menu-cross-link-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link
          href={href}
          prefetch={false}
          className={
            variant === 'to-daily' ? 'button button-menu-jour' : 'button button-carte-link'
          }
        >
          {cta}
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </aside>
  )
}
