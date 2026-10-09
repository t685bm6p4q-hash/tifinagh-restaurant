'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { MainContent } from '@/components/main-content'
import { MenuAdminUploadZone } from '@/components/menu-admin-upload-zone'
import {
  menuAdminUploadUiInitial,
  runMenuAdminUpload,
  type MenuAdminUploadUi,
} from '@/lib/menu-admin-upload-client'
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

export function MenuSetupAdminClient() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [chef, setChef] = useState<string>('')
  const [storage, setStorage] = useState<MenuStorageOverview | null>(null)
  const [menuPreviewHref, setMenuPreviewHref] = useState<string | null>(null)
  const [dishes, setDishes] = useState<MenuDishesTexts>({ fr: '', en: '' })
  const [savedDishes, setSavedDishes] = useState<MenuDishesTexts>({ fr: '', en: '' })
  const [savingDishes, setSavingDishes] = useState<MenuDayVariant | null>(null)
  const [uploadUi, setUploadUi] = useState<Record<MenuDayVariant, MenuAdminUploadUi>>({
    fr: { ...menuAdminUploadUiInitial, hydrated: true },
    en: { ...menuAdminUploadUiInitial, hydrated: true },
  })
  const uploadBusyRef = useRef<Record<MenuDayVariant, boolean>>({ fr: false, en: false })

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

  useEffect(() => {
    const upload = searchParams.get('menuUpload')
    if (!upload) return
    if (upload === 'ok') {
      setMessage({ type: 'success', text: '✅ Menu mis en ligne sur le site.' })
      setMenuPreviewHref(`/menu-du-jour?m=${Date.now()}`)
      void refreshStorage()
    } else if (upload === 'err') {
      const msg = searchParams.get('msg')
      setMessage({
        type: 'error',
        text: msg ? decodeURIComponent(msg) : '❌ Échec de la mise en ligne.',
      })
    }
    window.history.replaceState({}, '', '/admin/menu-setup')
  }, [searchParams, refreshStorage])

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

  const onMenuUploaded = useCallback(() => {
    setMenuPreviewHref(`/menu-du-jour?m=${Date.now()}`)
    void refreshStorage()
  }, [refreshStorage])

  useEffect(() => {
    const onFileChange = (event: Event) => {
      const target = event.target
      if (!(target instanceof HTMLInputElement) || target.type !== 'file') return
      const variant = target.dataset.menuUploadInput
      if (variant !== 'fr' && variant !== 'en') return

      if (uploadBusyRef.current[variant]) {
        target.value = ''
        return
      }

      const file = target.files?.[0]
      if (!file) return

      uploadBusyRef.current[variant] = true
      void runMenuAdminUpload(file, variant, target, (patch) => {
        setUploadUi((prev) => ({
          ...prev,
          [variant]: { ...prev[variant], ...patch, hydrated: true },
        }))
        if (patch.success) onMenuUploaded()
      }).finally(() => {
        uploadBusyRef.current[variant] = false
      })
    }

    document.addEventListener('change', onFileChange, true)
    return () => document.removeEventListener('change', onFileChange, true)
  }, [onMenuUploaded])

  const uploadZoneProps = (variant: MenuDayVariant) => {
    const ui = uploadUi[variant]
    const busy = ui.phase !== 'idle'
    const pickLabel =
      ui.phase === 'preparing'
        ? '⏳ Préparation de l’image…'
        : ui.phase === 'uploading'
          ? '⏳ Mise en ligne…'
          : ui.success
            ? '📁 Choisir un autre fichier'
            : '📁 Choisir un fichier'

    const statusMessage =
      ui.phase === 'preparing'
        ? '⏳ Compression sur votre appareil…'
        : ui.phase === 'uploading'
          ? '⏳ Envoi au serveur…'
          : ui.error ??
            ui.success ??
            'Touchez le bouton vert pour ouvrir vos photos (JPEG, PNG) ou PDF.'

    const statusTone: 'hint' | 'info' | 'error' | 'success' = ui.error
      ? 'error'
      : ui.success
        ? 'success'
        : ui.phase !== 'idle'
          ? 'info'
          : 'hint'

    return {
      pickLabel,
      statusMessage,
      statusTone,
      pickedName: ui.pickedName,
      busy,
    }
  }

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
              </div>
            ) : null}
          </div>
        ) : null}

        {messageAlert}

        <MenuAdminUploadZone
          variant="fr"
          title="Menu du jour (français)"
          hint="Fichier affiché aux visiteurs en français."
          {...uploadZoneProps('fr')}
        />
        {dishesEditor('fr')}

        <div style={{ marginTop: '28px' }}>
          <MenuAdminUploadZone
            variant="en"
            title="Daily menu (English)"
            hint="Fichier affiché aux visiteurs en anglais."
            {...uploadZoneProps('en')}
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
