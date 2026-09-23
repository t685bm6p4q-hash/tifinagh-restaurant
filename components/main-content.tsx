import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type MainContentProps = ComponentPropsWithoutRef<'main'> & {
  children: ReactNode
}

/** Point d’ancrage pour le lien « aller au contenu » (accessibilité). */
export function MainContent({ children, className, ...props }: MainContentProps) {
  return (
    <main id="main-content" tabIndex={-1} className={className} {...props}>
      {children}
    </main>
  )
}
