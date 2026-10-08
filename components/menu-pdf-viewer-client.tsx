'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { MenuDishesDetails } from '@/components/menu/menu-dishes-details'
import { MenuLangSwitch } from '@/components/menu/menu-lang-switch'
import { MenuMediaPreview } from '@/components/menu/menu-media-preview'
import { useMenuViewerState } from '@/components/menu/use-menu-viewer-state'
import { MenuShareButton } from '@/components/menu-share-button'
import { localeHref } from '@/lib/i18n/locale-path'
import type { MenuPdfViewerClientProps } from '@/lib/menu-viewer-types'
import type { ReactNode } from 'react'

const MenuPdfFullscreen = dynamic(
  () => import('@/components/menu-pdf-fullscreen').then((m) => m.MenuPdfFullscreen),
  { ssr: false },
)

export function MenuPdfViewerClient(
  props: MenuPdfViewerClientProps & { children?: ReactNode },
) {
  const {
    initialSnapshotKey,
    locale,
    langToggleFr,
    langToggleEn,
    enFallbackNote,
    share,
    children,
    ...stateInput
  } = props
  const state = useMenuViewerState(stateInput)
  const usesServerMedia = state.mediaKey === initialSnapshotKey

  useEffect(() => {
    const root = document.getElementById('menu-pdf-viewer-media-stack')
    if (!root) return
    root.classList.toggle('menu-pdf-viewer-media-stack--client-media', !usesServerMedia)
  }, [usesServerMedia])

  return (
    <>
      <MenuLangSwitch
        variant={state.variant}
        langToggleFr={langToggleFr}
        langToggleEn={langToggleEn}
        describedBy={state.showEnFallback ? 'menu-lang-fallback' : undefined}
        onToggle={state.toggleMenuLang}
      />

      {state.showEnFallback ? (
        <p id="menu-lang-fallback" className="menu-lang-fallback" role="status">
          {enFallbackNote}
        </p>
      ) : null}

      <div
        className="menu-pdf-viewer-media-stack"
        id="menu-pdf-viewer-media-stack"
      >
        {children}
        <MenuMediaPreview
          displayKind={state.displayKind}
          label={state.label}
          embedUrl={state.embedUrl}
          previewImageUrl={state.previewImageUrl}
          previewSrcSet={state.previewSrcSet}
          pdfDownloadUrl={state.url}
          servedVariant={state.servedVariant}
          servedRevision={state.servedRevision}
          dishesDescribedBy={state.dishesId}
          previewAriaLabel={state.previewAriaLabel}
          fullscreenLabels={state.fullscreenUi}
          onOpenLightbox={state.openFullscreen}
          overlayOnly={usesServerMedia}
        />
      </div>

      {state.dishesId ? (
        <MenuDishesDetails
          dishesId={state.dishesId}
          lang={state.dishesLang}
          lines={state.dishesLines}
        />
      ) : null}

      <MenuShareButton
        label={share.label}
        copiedLabel={share.copiedLabel}
        shareTitle={share.shareTitle}
        shareText={share.shareText}
      />

      {state.fullscreen ? (
        <MenuPdfFullscreen
          url={state.lightboxUrl}
          label={state.label}
          displayKind={state.displayKind}
          closeLabel={state.fullscreenUi.back}
          reserveLabel={state.reserveLabel}
          reservationHref={localeHref('/reservation', locale)}
          onClose={state.closeFullscreen}
        />
      ) : null}
    </>
  )
}
