'use client'

import { useEffect } from 'react'
import { RESERVATION_WHATSAPP_FORM_ID } from '@/lib/restaurant-data'

/** Scroll vers le formulaire WhatsApp quand l’URL contient #reservation-whatsapp-form */
export function ReservationHashScroll() {
  useEffect(() => {
    function scrollToForm() {
      if (window.location.hash !== `#${RESERVATION_WHATSAPP_FORM_ID}`) return
      const el = document.getElementById(RESERVATION_WHATSAPP_FORM_ID)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    scrollToForm()
    window.addEventListener('hashchange', scrollToForm)
    return () => window.removeEventListener('hashchange', scrollToForm)
  }, [])

  return null
}
