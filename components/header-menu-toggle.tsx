'use client'

import { useCallback, useEffect, useState } from 'react'

const NAV_TOGGLE_ID = 'nav-toggle'

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

/** Bouton accessible ; le checkbox `#nav-toggle` reste le levier CSS (sibling ~ .main-nav). */
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

  const toggle = () => {
    const input = document.getElementById(NAV_TOGGLE_ID)
    if (!(input instanceof HTMLInputElement)) return
    input.checked = !input.checked
    input.dispatchEvent(new Event('change', { bubbles: true }))
    setOpen(input.checked)
  }

  return (
    <button
      type="button"
      className="menu-toggle"
      aria-expanded={open}
      aria-controls="main-nav"
      aria-label={toggleMenuLabel}
      onClick={toggle}
    >
      <span className="menu-toggle-open" aria-hidden="true">
        <span className="menu-toggle-label">{menuButton}</span>
        <MenuIcon />
      </span>
      <span className="menu-toggle-close" aria-hidden="true">
        <CloseMenuIcon />
      </span>
    </button>
  )
}
