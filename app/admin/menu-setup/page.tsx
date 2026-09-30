'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { MainContent } from '@/components/main-content'
import { compressMenuImageInBrowser } from '@/lib/compress-menu-browser'
import { parseMenuUploadResponse } from '@/lib/menu-upload-api'
import {
  MAX_MENU_PDF_BYTES,
  MAX_MENU_UPLOAD_BYTES,
  PDF_TOO_HEAVY_MESSAGE,
  type MenuDayVariant,
} from '@/lib/menu-pdf'

export default function MenuSetupAdmin() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [chef, setChef] = useState<string>('')

  const handleFileUpload = async (variant: MenuDayVariant, e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    if (!file) return

    const name = file.name.toLowerCase()
    const allowed =
      name.endsWith('.pdf') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.webp')
    if (!allowed) {
      setMessage({ type: 'error', text: '❌ PDF, JPEG, PNG ou WebP uniquement' })
      input.value = ''
      return
    }

    const isPdf = name.endsWith('.pdf')

    if (isPdf && file.size > MAX_MENU_PDF_BYTES) {
      setMessage({
        type: 'error',
        text: `❌ ${PDF_TOO_HEAVY_MESSAGE}`,
      })
      input.value = ''
      return
    }

    if (!isPdf && file.size > MAX_MENU_UPLOAD_BYTES) {
      setMessage({ type: 'error', text: '❌ Fichier trop gros (max 10 MB)' })
      input.value = ''
      return
    }

    setIsUploading(true)
    setMessage({
      type: 'info',
      text: isPdf ? '⏳ Envoi en cours…' : '⏳ Compression puis mise en ligne…',
    })

    try {
      const uploadFile = isPdf ? file : await compressMenuImageInBrowser(file)
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('variant', variant)

      const response = await fetch('/api/upload-menu', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      })

      const parsed = await parseMenuUploadResponse(response)

      if (response.status === 401) {
        setMessage({
          type: 'error',
          text:
            '❌ Accès refusé : rechargez la page (F5). Si le problème continue, fermez l’onglet, rouvrez /admin/menu-setup et entrez à nouveau le mot de passe admin.',
        })
        return
      }

      if (parsed.kind === 'success') {
        const label = variant === 'en' ? 'Menu anglais' : 'Menu français'
        setMessage({
          type: 'success',
          text: `✅ ${label} à jour ! ${chef ? `(${chef})` : ''}`,
        })
        return
      }

      if (parsed.kind === 'error') {
        setMessage({ type: 'error', text: `❌ ${parsed.body.error}` })
        return
      }

      setMessage({ type: 'error', text: '❌ Réponse serveur invalide' })
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Erreur inconnue'
      if (reason === 'IMAGE_TOO_HEAVY') {
        setMessage({ type: 'error', text: '❌ Impossible de compresser cette image sous 1 Mo' })
      } else {
        setMessage({ type: 'error', text: '❌ Erreur : ' + reason })
      }
    } finally {
      setIsUploading(false)
      input.value = ''
    }
  }

  const uploadButton = (variant: MenuDayVariant, label: string, hint: string) => (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: 'var(--foreground)', fontSize: '14px', fontWeight: '600', margin: '0 0 8px' }}>
        {label}
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '0 0 10px' }}>{hint}</p>
      <label style={{ cursor: isUploading ? 'wait' : 'pointer', display: 'block' }}>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileUpload(variant, e)}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
        <div
          style={{
            background: isUploading ? 'var(--line)' : '#25d366',
            color: '#000',
            padding: '14px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: isUploading ? 'wait' : 'pointer',
            textAlign: 'center',
            fontSize: '15px',
          }}
        >
          {isUploading ? '⏳ Envoi…' : '📁 Choisir un fichier'}
        </div>
      </label>
    </div>
  )

  return (
    <MainContent style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: 'var(--foreground)', marginBottom: '8px', fontSize: '36px', margin: 0 }}>
            📋 Menu du Jour
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
            Français + anglais — authentification via le navigateur
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block' }}>
            <span style={{ color: 'var(--foreground)', fontSize: '14px', fontWeight: '600' }}>Votre nom (optionnel)</span>
            <input
              type="text"
              value={chef}
              onChange={(e) => setChef(e.target.value)}
              placeholder="ex: Chef Pierre"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '6px',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid var(--line)',
                background: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </label>
        </div>

        {uploadButton(
          'fr',
          'Menu du jour (français)',
          'Fichier servi sur le site en français — menu-du-jour.pdf (ou WebP).',
        )}
        {uploadButton(
          'en',
          'Daily menu (English)',
          'Fichier pour les visiteurs en anglais — menu-du-jour-en.pdf (ou WebP).',
        )}

        <p style={{ color: 'var(--muted)', fontSize: '12px', textAlign: 'center', marginTop: '4px' }}>
          Les photos jusqu’à 10 Mo sont compressées automatiquement.
        </p>

        {message && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px',
              borderRadius: '5px',
              marginTop: '20px',
              background:
                message.type === 'success'
                  ? 'rgba(37, 211, 102, 0.1)'
                  : message.type === 'error'
                    ? 'rgba(255, 100, 100, 0.1)'
                    : 'rgba(212, 173, 69, 0.1)',
              border:
                message.type === 'success'
                  ? '1px solid #25d366'
                  : message.type === 'error'
                    ? '1px solid #ff6464'
                    : '1px solid var(--gold)',
            }}
          >
            {message.type === 'success' ? (
              <CheckCircle size={18} color="#25d366" style={{ flexShrink: 0, marginTop: '1px' }} />
            ) : (
              <AlertCircle size={18} color={message.type === 'error' ? '#ff6464' : 'var(--gold)'} style={{ flexShrink: 0, marginTop: '1px' }} />
            )}
            <p style={{ color: 'var(--foreground)', margin: 0, fontSize: '14px' }}>{message.text}</p>
          </div>
        )}

        <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <a
            href="/api/menu-pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#25d366',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '8px 14px',
              borderRadius: '4px',
              background: 'rgba(37, 211, 102, 0.1)',
            }}
          >
            👀 Menu FR
          </a>
          <a
            href="/api/menu-pdf?variant=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#25d366',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '8px 14px',
              borderRadius: '4px',
              background: 'rgba(37, 211, 102, 0.1)',
            }}
          >
            👀 Menu EN
          </a>
        </div>
      </div>
    </MainContent>
  )
}
