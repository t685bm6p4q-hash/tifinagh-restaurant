'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function MenuSetupAdmin() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [password, setPassword] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [chef, setChef] = useState<string>('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    if (!file) return

    const name = file.name.toLowerCase()
    const allowed = name.endsWith('.pdf') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')
    if (!allowed) {
      setMessage({ type: 'error', text: '❌ PDF, JPEG ou PNG uniquement' })
      input.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: '❌ Fichier trop gros (max 5 MB)' })
      input.value = ''
      return
    }

    setIsUploading(true)
    setMessage({ type: 'info', text: '⏳ Envoi en cours…' })

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-menu', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
        headers: password ? { 'x-menu-admin-password': password } : undefined,
      })

      const payload: { message?: string; error?: string } = await response.json().catch(() => ({}))

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `✅ Menu à jour! ${chef ? `(${chef})` : ''}`,
        })
      } else {
        setMessage({ type: 'error', text: `❌ ${payload.error ?? "Erreur"}` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Erreur : ' + String(error) })
    } finally {
      setIsUploading(false)
      input.value = ''
    }
  }

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Titre */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--foreground)', marginBottom: '8px', fontSize: '36px', margin: 0 }}>
            📋 Menu du Jour
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
            Mise à jour rapide
          </p>
        </div>

        {/* Champs */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '12px' }}>
            <span style={{ color: 'var(--foreground)', fontSize: '14px', fontWeight: '600' }}>Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoComplete="current-password"
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

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', marginBottom: '12px' }}>
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

        {/* Upload Button */}
        <label style={{ cursor: isUploading ? 'wait' : 'pointer', display: 'block' }}>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={handleFileUpload}
            disabled={isUploading}
            style={{ display: 'none' }}
          />
          <div
            style={{
              background: isUploading ? 'var(--line)' : '#25d366',
              color: '#000',
              padding: '16px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              display: 'block',
              cursor: isUploading ? 'wait' : 'pointer',
              textAlign: 'center',
              fontSize: '16px',
              transition: 'all 0.2s',
            }}
          >
            {isUploading ? '⏳ Envoi…' : '📁 Sélectionner PDF, JPEG ou PNG'}
          </div>
        </label>

        {/* Message */}
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

        {/* Lien menu */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <a
            href="/api/menu-pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              color: '#25d366',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '8px 16px',
              borderRadius: '4px',
              background: 'rgba(37, 211, 102, 0.1)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(37, 211, 102, 0.2)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(37, 211, 102, 0.1)'
            }}
          >
            👀 Voir le menu en ligne
          </a>
        </div>
      </div>
    </main>
  )
}
