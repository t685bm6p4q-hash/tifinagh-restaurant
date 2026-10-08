'use client'

import { useCallback, useEffect, useState } from 'react'

export const NAV_TOGGLE_ID = 'nav-toggle'

function MenuIcon() {
  return (
    <svg
      className="menu-toggle-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg
      className="menu-toggle-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

type HeaderMenuToggleProps = {
  menuButton: string
  toggleMenuLabel: string
}

/**
 * Label natif → bascule `#nav-toggle` sans attendre l’hydratation (mobile fiable).
 * Le checkbox pilote l’ouverture CSS (sibling ~ .main-nav).
 */
export function HeaderMenuToggle({ menuButton, toggleMenuLabel }: HeaderMenuToggleProps) {
  const [open, setOpen] = useState(false)

  const syncFromInput = useCallback(() => {
    const input = document.getElementById(NAV_TOGGLE_ID)
    if (input instanceof HTMLInputElement) setOpen(input.checked)
  }, [])

  useEffect(() => {
    syncFromInput()
    const input = document.getElementById(NAV_TOGGLE_ID)
    if (!(input instanceof HTMLInputElement)) return
    input.addEventListener('change', syncFromInput)
    return () => input.removeEventListener('change', syncFromInput)
  }, [syncFromInput])

  return (
    <label
      htmlFor={NAV_TOGGLE_ID}
      className="menu-toggle"
      aria-expanded={open}
      aria-controls="main-nav"
      aria-label={toggleMenuLabel}
    >
      <span className="menu-toggle-open" aria-hidden="true">
        <span className="menu-toggle-label">{menuButton}</span>
        <MenuIcon />
      </span>
      <span className="menu-toggle-close" aria-hidden="true">
        <CloseMenuIcon />
      </span>
    </label>
  )
}
