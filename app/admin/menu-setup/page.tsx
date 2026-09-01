'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'

export default function MenuSetupAdmin() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [password, setPassword] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.pdf')) {
      setMessage({ type: 'error', text: '❌ Veuillez sélectionner un fichier PDF' })
      input.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: '❌ Le fichier est trop volumineux (max 5 MB)' })
      input.value = ''
      return
    }

    setIsUploading(true)
    setMessage({ type: 'info', text: '⏳ Envoi du menu en cours…' })

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
          text: `✅ ${payload.message ?? 'Menu mis à jour'} — il est déjà visible sur le site.`,
        })
      } else {
        setMessage({ type: 'error', text: `❌ ${payload.error ?? "Erreur lors de l'upload"}` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Erreur : ' + String(error) })
    } finally {
      setIsUploading(false)
      input.value = ''
    }
  }

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ color: 'var(--foreground)', marginBottom: '12px', fontSize: '42px' }}>
              Menu du Jour
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
              Espace privé (Basic Auth) — mise à jour du menu PDF
            </p>
          </div>

          {/* Info */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '5px',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '18px' }}>
              Sécurité &amp; usage
            </h2>
            <ol style={{ color: 'var(--muted)', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li>Cette page est protégée par authentification HTTP (navigateur).</li>
              <li>Saisissez le même mot de passe admin pour autoriser l&apos;upload API.</li>
              <li>Préparez un PDF ≤ 5 Mo, puis sélectionnez-le ci-dessous.</li>
              <li>Le fichier remplace immédiatement le menu du jour public.</li>
            </ol>
          </div>

          {/* Upload */}
          <div
            style={{
              background: 'var(--surface)',
              border: '2px dashed var(--line)',
              borderRadius: '5px',
              padding: '40px 20px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <FileText size={40} color="var(--gold)" style={{ margin: '0 auto 16px' }} />

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe administrateur"
              autoComplete="current-password"
              aria-label="Mot de passe administrateur"
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '320px',
                margin: '0 auto 20px',
                padding: '12px 14px',
                borderRadius: '5px',
                border: '1px solid var(--line)',
                background: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '14px',
              }}
            />

            <label style={{ cursor: isUploading ? 'wait' : 'pointer' }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  background: isUploading ? 'var(--line)' : '#25d366',
                  color: '#000',
                  padding: '14px 28px',
                  borderRadius: '5px',
                  fontWeight: '600',
                  display: 'inline-block',
                  cursor: isUploading ? 'wait' : 'pointer',
                }}
              >
                {isUploading ? 'Envoi en cours…' : 'Sélectionner un PDF'}
              </div>
            </label>
            <p style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '12px' }}>
              Taille max : 5 MB
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                borderRadius: '5px',
                marginBottom: '32px',
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
                <CheckCircle size={20} color="#25d366" style={{ flexShrink: 0 }} />
              ) : (
                <AlertCircle size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
              )}
              <p style={{ color: 'var(--foreground)', margin: 0 }}>{message.text}</p>
            </div>
          )}

          {/* Menu actuel */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '5px',
              padding: '24px',
            }}
          >
            <h3 style={{ color: 'var(--gold)', marginBottom: '12px', fontSize: '16px' }}>
              📁 Menu actuel
            </h3>
            <a
              href="/api/menu-pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#25d366',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                background: 'rgba(37, 211, 102, 0.1)',
              }}
            >
              <FileText size={16} />
              Ouvrir le menu en ligne
            </a>
            <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
              ✓ Le menu est accessible publiquement sur : /api/menu-pdf
            </p>
          </div>

          {/* Instructions supplémentaires */}
          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: '5px',
              padding: '20px',
              marginTop: '32px',
              fontSize: '13px',
              color: 'var(--muted)',
            }}
          >
            <h4 style={{ color: 'var(--foreground)', marginTop: 0, marginBottom: '12px' }}>
              💡 Bon à savoir
            </h4>
            <p>
              Chaque envoi remplace le menu précédent : il n&apos;y a jamais qu&apos;un seul PDF en
              ligne. Le changement est visible sur le site en moins d&apos;une minute.
            </p>
          </div>
        </div>
      </main>
  )
}
