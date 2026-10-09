'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { MainContent } from '@/components/main-content'
import { MenuAdminUploadForm } from '@/components/menu-admin-upload-form'
import {
  MAX_MENU_DISHES_CHARS,
  MENU_DISHES_ADMIN_PLACEHOLDER,
  type MenuDishesTexts,
} from '@/lib/menu-dishes-format'
import { formatMenuUploadedAt } from '@/lib/format-menu-uploaded-at'
import { MENU_UPLOAD_FORMATS_HINT, type MenuDayVariant } from '@/lib/menu-pdf'

type MenuBlobAccessRow = {
  privateReadable: boolean
  publicReadable: boolean
  privateOnlyReady: boolean
  publicLegacyPresent: boolean
}

type MenuStorageRow = {
  pathname: string
  exists: boolean
  /** Cache site uniquement — ne pas afficher dans l’UI (voir uploadedAt). */
  revision: string | null
  uploadedAt: string | null
  contentType: string | null
  sizeBytes: number | null
  blobAccess?: MenuBlobAccessRow | null
}

type MenuStorageOverview = {
  fr: MenuStorageRow
  en: MenuStorageRow
  blobPrivateOnlyReady?: boolean | null
  publicFallbackEnabled?: boolean
}

export default function MenuSetupAdmin() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [chef, setChef] = useState<string>('')
  const [storage, setStorage] = useState<MenuStorageOverview | null>(null)
  const [menuPreviewHref, setMenuPreviewHref] = useState<string | null>(null)
  const [dishes, setDishes] = useState<MenuDishesTexts>({ fr: '', en: '' })
  const [savedDishes, setSavedDishes] = useState<MenuDishesTexts>({ fr: '', en: '' })
  const [savingDishes, setSavingDishes] = useState<MenuDayVariant | null>(null)

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/api/menu-dishes', { credentials: 'same-origin' })
        if (!res.ok) return
        const data = (await res.json()) as MenuDishesTexts
        setDishes(data)
        setSavedDishes(data)
      } catch {
        /* ignore */
      }
    })()
  }, [])

  const saveDishes = async (variant: MenuDayVariant) => {
    setSavingDishes(variant)
    try {
      const res = await fetch('/api/menu-dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ variant, text: dishes[variant] }),
      })
      const data = (await res.json()) as Partial<MenuDishesTexts> & { error?: string }
      if (!res.ok) {
        setMessage({ type: 'error', text: `❌ ${data.error ?? 'Erreur lors de l’enregistrement du texte'}` })
        return
      }
      setSavedDishes({ fr: data.fr ?? '', en: data.en ?? '' })
      setMessage({
        type: 'success',
        text: `✅ Plats du jour (${variant === 'en' ? 'anglais' : 'français'}) enregistrés sur le site`,
      })
    } catch (error: unknown) {
      setMessage({ type: 'error', text: '❌ Erreur : ' + (error instanceof Error ? error.message : 'inconnue') })
    } finally {
      setSavingDishes(null)
    }
  }

  const refreshStorage = useCallback(async () => {
    try {
      const res = await fetch('/api/upload-menu', { credentials: 'same-origin' })
      if (res.status === 401) {
        setMessage({
          type: 'error',
          text: '❌ Session admin expirée — rechargez la page (F5) et reconnectez-vous avec le mot de passe.',
        })
        return
      }
      if (!res.ok) return
      const data = (await res.json()) as MenuStorageOverview
      setStorage(data)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    void refreshStorage()
  }, [refreshStorage])

  const onMenuUploaded = useCallback(() => {
    setMenuPreviewHref(`/menu-du-jour?m=${Date.now()}`)
    void refreshStorage()
  }, [refreshStorage])

  const dishesEditor = (variant: MenuDayVariant) => {
    const dirty = dishes[variant] !== savedDishes[variant]
    const saving = savingDishes === variant
    return (
      <div style={{ marginTop: '12px' }}>
        <label style={{ display: 'block' }}>
          <span style={{ color: 'var(--foreground)', fontSize: '13px', fontWeight: 600 }}>
            {variant === 'en' ? 'Dishes as text (optional)' : 'Plats du jour en texte (optionnel)'}
          </span>
          <span style={{ display: 'block', color: 'var(--muted)', fontSize: '12px', margin: '2px 0 6px' }}>
            Lu par Google et les lecteurs d’écran. Une ligne par plat ; terminez une ligne par « : » pour un titre.
          </span>
          <textarea
            value={dishes[variant]}
            onChange={(e) => {
              const value = e.target.value
              setDishes((prev) => ({ ...prev, [variant]: value }))
            }}
            maxLength={MAX_MENU_DISHES_CHARS}
            rows={7}
            placeholder={MENU_DISHES_ADMIN_PLACEHOLDER}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 12px',
              borderRadius: '5px',
              border: '1px solid var(--line)',
              background: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '14px',
              lineHeight: 1.5,
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => void saveDishes(variant)}
          disabled={!dirty || saving}
          style={{
            marginTop: '8px',
            width: '100%',
            padding: '10px 16px',
            borderRadius: '6px',
            border: '1px solid var(--gold)',
            background: dirty ? 'var(--gold)' : 'transparent',
            color: dirty ? '#000' : 'var(--muted)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: !dirty || saving ? 'default' : 'pointer',
          }}
        >
          {saving ? '⏳ Enregistrement…' : dirty ? '💾 Enregistrer le texte' : '✓ Texte à jour'}
        </button>
      </div>
    )
  }

  const messageAlert =
    message ? (
      <div
        role="status"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '14px',
          borderRadius: '5px',
          marginBottom: '20px',
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
          <AlertCircle
            size={18}
            color={message.type === 'error' ? '#ff6464' : 'var(--gold)'}
            style={{ flexShrink: 0, marginTop: '1px' }}
          />
        )}
        <p
          style={{
            color: message.type === 'error' ? '#ff6464' : 'var(--foreground)',
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.45,
          }}
        >
          {message.text}
        </p>
      </div>
    ) : null

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

        {storage && (storage.fr.exists || storage.en.exists) ? (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 14px',
              borderRadius: '5px',
              border: '1px solid rgba(37, 211, 102, 0.35)',
              background: 'rgba(37, 211, 102, 0.08)',
              fontSize: '13px',
              color: 'var(--foreground)',
              lineHeight: 1.55,
            }}
          >
            <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: '14px' }}>
              Mise en ligne sur le site
            </p>
            {storage.fr.exists ? (
              <p style={{ margin: 0 }}>
                <strong>Français</strong> — {formatMenuUploadedAt(storage.fr.uploadedAt)}
              </p>
            ) : null}
            {storage.en.exists ? (
              <p style={{ margin: storage.fr.exists ? '6px 0 0' : 0 }}>
                <strong>English</strong> — {formatMenuUploadedAt(storage.en.uploadedAt)}
              </p>
            ) : null}
            {storage.blobPrivateOnlyReady != null ? (
              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(37, 211, 102, 0.25)',
                  fontSize: '12px',
                }}
              >
                <p style={{ margin: '0 0 6px', fontWeight: 600 }}>
                  Sécurité Blob{' '}
                  {storage.blobPrivateOnlyReady ? (
                    <span style={{ color: '#25d366' }}>— lecture privée OK (store compatible)</span>
                  ) : (
                    <span style={{ color: '#ffb347' }}>
                      — store public Vercel : upload OK en public, pas de mode privé seul tant que le
                      store n’est pas migré
                    </span>
                  )}
                </p>
                {(['fr', 'en'] as const).map((variant) => {
                  const row = storage[variant]
                  const access = row.blobAccess
                  if (!row.exists || !access) return null
                  return (
                    <p key={variant} style={{ margin: '4px 0 0', color: 'var(--muted)' }}>
                      {variant === 'fr' ? 'FR' : 'EN'} : lecture privée{' '}
                      {access.privateReadable ? 'OK' : 'KO'}
                      {access.publicLegacyPresent
                        ? ' · copie publique legacy encore présente (supprimer sur Vercel Storage)'
                        : ' · pas de copie publique détectée'}
                    </p>
                  )
                })}
                {storage.publicFallbackEnabled === false ? (
                  <p style={{ margin: '8px 0 0', color: '#25d366' }}>
                    MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0 actif en production.
                  </p>
                ) : (
                  <p style={{ margin: '8px 0 0', color: 'var(--muted)' }}>
                    Repli public encore autorisé (variable non à 0). Validez avec{' '}
                    <code style={{ fontSize: '11px' }}>npm run verify:menu-prod</code> avant de couper.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {messageAlert}

        <MenuAdminUploadForm
          variant="fr"
          title="Menu du jour (français)"
          hint="Fichier affiché aux visiteurs en français."
          onUploaded={onMenuUploaded}
        />
        {dishesEditor('fr')}

        <div style={{ marginTop: '28px' }}>
          <MenuAdminUploadForm
            variant="en"
            title="Daily menu (English)"
            hint="Fichier affiché aux visiteurs en anglais."
            onUploaded={onMenuUploaded}
          />
          {dishesEditor('en')}
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
          {MENU_UPLOAD_FORMATS_HINT}
        </p>

        {menuPreviewHref ? (
          <p style={{ margin: '14px 0 0', textAlign: 'center' }}>
            <a
              href={menuPreviewHref}
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                borderRadius: '5px',
                background: '#25d366',
                color: '#000',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Voir le menu à jour sur le site →
            </a>
          </p>
        ) : null}

        <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <Link
            href="/menu-du-jour"
            style={{
              color: 'var(--gold)',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '8px 14px',
              borderRadius: '4px',
              border: '1px solid var(--gold)',
            }}
          >
            🍽 Page menu du jour
          </Link>
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
            href="/api/menu-pdf?variant=en&strict=1"
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
