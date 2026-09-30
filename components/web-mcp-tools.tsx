'use client'

import { useEffect } from 'react'
import { buildWhatsAppReservationMessage } from '@/lib/reservation-whatsapp-message'
import { onlineBookingUrl, whatsappLink } from '@/lib/restaurant-data'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type ModelContextTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>> | Record<string, unknown>
}

type ModelContextHost = {
  registerTool: (tool: ModelContextTool) => void
  unregisterTool?: (name: string) => void
}

function getModelContext(): ModelContextHost | null {
  if (typeof document === 'undefined') return null
  const doc = document as Document & { modelContext?: ModelContextHost }
  if (doc.modelContext?.registerTool) return doc.modelContext
  const nav = navigator as Navigator & { modelContext?: ModelContextHost }
  if (nav.modelContext?.registerTool) return nav.modelContext
  return null
}

function createWhatsAppTool(
  reservationCopy: Dictionary['reservationPage'],
): ModelContextTool {
  return {
  name: 'prepare_whatsapp_reservation',
  description:
    'Prépare une URL WhatsApp avec une demande de réservation (nom, téléphone, date, heure, nombre de personnes). Ne confirme pas la réservation : l’utilisateur doit envoyer le message dans WhatsApp. Pour une réservation enregistrée, utiliser book_table_online.',
  inputSchema: {
    type: 'object',
    required: ['nom', 'telephone', 'date', 'heure', 'personnes'],
    properties: {
      nom: { type: 'string', description: 'Nom du client' },
      telephone: { type: 'string', description: 'Numéro de téléphone' },
      date: { type: 'string', description: 'Date souhaitée (libellé affiché)' },
      heure: { type: 'string', description: 'Heure souhaitée' },
      personnes: { type: 'string', description: 'Nombre de personnes (libellé)' },
      message: { type: 'string', description: 'Message optionnel' },
      openWhatsApp: {
        type: 'boolean',
        description: 'Si true, ouvre WhatsApp dans un nouvel onglet',
      },
    },
  },
  execute(input) {
    const nom = String(input.nom ?? '').trim()
    const telephone = String(input.telephone ?? '').trim()
    const date = String(input.date ?? '').trim()
    const heure = String(input.heure ?? '').trim()
    const personnes = String(input.personnes ?? '').trim()
    const message = input.message != null ? String(input.message) : undefined
    if (!nom || !telephone || !date || !heure || !personnes) {
      return {
        error: 'missing_fields',
        message: 'nom, telephone, date, heure et personnes sont requis.',
      }
    }
    const text = buildWhatsAppReservationMessage(reservationCopy, {
      nom,
      telephone,
      date,
      heure,
      personnes,
      message,
    })
    const whatsappUrl = whatsappLink(text)
    if (input.openWhatsApp === true) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }
    return {
      whatsappUrl,
      note:
        'La réservation n’est pas confirmée tant que le message n’est pas envoyé dans WhatsApp. Pour une confirmation immédiate, utilisez book_table_online.',
    }
  },
  }
}

function bookTableTool(locale: Locale): ModelContextTool {
  return {
    name: 'book_table_online',
    description:
      'Ouvre la réservation en ligne uReserve (créneau confirmé dans le système du restaurant). Canal recommandé.',
    inputSchema: {
      type: 'object',
      properties: {
        lang: {
          type: 'string',
          enum: ['fr', 'en', 'es', 'it', 'de', 'pt', 'ru', 'zh', 'sv', 'zgh'],
          description: 'Code langue uReserve (défaut fr)',
        },
        openBooking: {
          type: 'boolean',
          description: 'Si true, ouvre uReserve dans un nouvel onglet',
        },
      },
    },
    execute(input) {
      const lang = (input.lang as Locale | undefined) ?? 'fr'
      const bookingUrl = onlineBookingUrl(lang)
      if (input.openBooking === true) {
        window.open(bookingUrl, '_blank', 'noopener,noreferrer')
      }
      return { bookingUrl }
    },
  }
}

export function WebMcpTools({
  locale,
  whatsappCopy,
}: {
  locale: Locale
  whatsappCopy: Dictionary['reservationPage']
}) {
  useEffect(() => {
    const ctx = getModelContext()
    if (!ctx) return

    const whatsappTool = createWhatsAppTool(whatsappCopy)
    ctx.registerTool(whatsappTool)
    ctx.registerTool(bookTableTool(locale))

    return () => {
      ctx.unregisterTool?.('prepare_whatsapp_reservation')
      ctx.unregisterTool?.('book_table_online')
    }
  }, [locale, whatsappCopy])

  return null
}
