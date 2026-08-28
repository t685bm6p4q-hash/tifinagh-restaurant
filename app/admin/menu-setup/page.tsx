'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'
import { Header, Footer } from '@/components/site-shell'

export default function MenuSetupAdmin() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.pdf')) {
      setMessage({ type: 'error', text: '❌ Veuillez sélectionner un fichier PDF' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: '❌ Le fichier est trop volumineux (max 5 MB)' })
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-menu', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Menu du jour mis à jour avec succès ! Le PDF est désormais accessible sur le site.',
        })
        e.target.value = '' // Reset input
      } else {
        setMessage({ type: 'error', text: '❌ Erreur lors de l\'upload' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Erreur : ' + String(error) })
    }
  }

  return (
    <>
      <Header />
      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ color: 'var(--foreground)', marginBottom: '12px', fontSize: '42px' }}>
              Menu du Jour
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
              Gérez facilement votre menu du jour en PDF
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
              📋 Comment ça marche ?
            </h2>
            <ol style={{ color: 'var(--muted)', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li>Préparez votre menu du jour en PDF (Canva, Word, Adobe, etc.)</li>
              <li>Cliquez sur le bouton ci-dessous pour sélectionner le fichier</li>
              <li>Confirmez l&apos;upload</li>
              <li>Le menu est immédiatement accessible sur le site !</li>
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
            <label style={{ cursor: 'pointer' }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  background: '#25d366',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '5px',
                  fontWeight: '600',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              >
                📤 Sélectionner un PDF
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
              href="/menu-du-jour.pdf"
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
              Ouvrir menu-du-jour.pdf
            </a>
            <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
              ✓ Le menu est accessible publiquement sur : /menu-du-jour.pdf
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
              💡 Conseil
            </h4>
            <p>
              <strong>Alternative simple :</strong> Vous pouvez aussi remplacer directement le fichier{' '}
              <code style={{ background: 'var(--surface)', padding: '2px 6px', borderRadius: '3px' }}>
                public/menu-du-jour.pdf
              </code>{' '}
              sur votre serveur via SFTP ou FTP.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
