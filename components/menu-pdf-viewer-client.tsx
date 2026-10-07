'use client'

import dynamic from 'next/dynamic'
import { MenuDishesDetails } from '@/components/menu/menu-dishes-details'
import { MenuLangSwitch } from '@/components/menu/menu-lang-switch'
import { MenuMediaPreview } from '@/components/menu/menu-media-preview'
import { useMenuViewerState } from '@/components/menu/use-menu-viewer-state'
import { MenuShareButton } from '@/components/menu-share-button'
import type { MenuPdfViewerClientProps } from '@/lib/menu-viewer-types'

const MenuPdfFullscreen = dynamic(
  () => import('@/components/menu-pdf-fullscreen').then((m) => m.MenuPdfFullscreen),
  { ssr: false },
)

export type { MenuPdfViewerClientProps }

export function MenuPdfViewerClient(props: MenuPdfViewerClientProps) {
  const {
    langToggleFr,
    langToggleEn,
    enFallbackNote,
    share,
  } = props

  const state = useMenuViewerState(props)

  return (
    <>
      <MenuLangSwitch
        variant={state.variant}
        langToggleFr={langToggleFr}
        langToggleEn={langToggleEn}
        onToggle={state.toggleMenuLang}
      />

      {state.showEnFallback ? (
        <p className="menu-lang-fallback" role="status">
          {enFallbackNote}
        </p>
      ) : null}

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
        onImageError={state.onImageError}
      />

      {state.dishesId ? (
        <MenuDishesDetails
          dishesId={state.dishesId}
          lang={state.dishesSource.variant}
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
          onClose={state.closeFullscreen}
        />
      ) : null}
    </>
  )
}
