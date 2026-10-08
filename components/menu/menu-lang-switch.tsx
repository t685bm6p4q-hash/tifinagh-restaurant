'use client'

import type { MenuDayVariant } from '@/lib/menu-pdf'

type MenuLangSwitchProps = {
  variant: MenuDayVariant
  langToggleFr: string
  langToggleEn: string
  /** Note de repli FR (EN demandé mais absent), lue avec le bouton. */
  describedBy?: string
  onToggle: () => void
}

/**
 * Le nom accessible est la langue cible, dans sa propre langue (« English » / « Français ») :
 * compréhensible quelle que soit la langue du site, sans état « activé » ambigu.
 */
export function MenuLangSwitch({
  variant,
  langToggleFr,
  langToggleEn,
  describedBy,
  onToggle,
}: MenuLangSwitchProps) {
  const target: MenuDayVariant = variant === 'fr' ? 'en' : 'fr'
  return (
    <div className="menu-lang-toggle">
      <button
        type="button"
        className="menu-lang-switch"
        lang={target}
        aria-label={target === 'en' ? langToggleEn : langToggleFr}
        aria-describedby={describedBy}
        onClick={onToggle}
      >
        <span className="menu-lang-switch__panel" data-variant={variant} aria-hidden="true">
          <span className="menu-lang-switch__thumb" />
          <span
            className={`menu-lang-switch__label${variant === 'fr' ? ' menu-lang-switch__label--on' : ''}`}
            lang="fr"
          >
            {langToggleFr}
          </span>
          <span
            className={`menu-lang-switch__label${variant === 'en' ? ' menu-lang-switch__label--on' : ''}`}
            lang="en"
          >
            {langToggleEn}
          </span>
        </span>
      </button>
    </div>
  )
}
