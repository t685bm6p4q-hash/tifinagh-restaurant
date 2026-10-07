'use client'

import type { MenuDayVariant } from '@/lib/menu-pdf'

type MenuLangSwitchProps = {
  variant: MenuDayVariant
  langToggleFr: string
  langToggleEn: string
  onToggle: () => void
}

export function MenuLangSwitch({
  variant,
  langToggleFr,
  langToggleEn,
  onToggle,
}: MenuLangSwitchProps) {
  return (
    <div className="menu-lang-toggle">
      <button
        type="button"
        className="menu-lang-switch"
        role="switch"
        aria-checked={variant === 'en'}
        aria-label={
          variant === 'fr'
            ? `${langToggleFr} — activer ${langToggleEn}`
            : `${langToggleEn} — activer ${langToggleFr}`
        }
        onClick={onToggle}
      >
        <span className="menu-lang-switch__panel" data-variant={variant}>
          <span className="menu-lang-switch__thumb" aria-hidden="true" />
          <span
            className={`menu-lang-switch__label${variant === 'fr' ? ' menu-lang-switch__label--on' : ''}`}
          >
            {langToggleFr}
          </span>
          <span
            className={`menu-lang-switch__label${variant === 'en' ? ' menu-lang-switch__label--on' : ''}`}
          >
            {langToggleEn}
          </span>
        </span>
      </button>
    </div>
  )
}
