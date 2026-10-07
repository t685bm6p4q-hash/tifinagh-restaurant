'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ShareIcon } from '@/components/icons'
import { trackGaEvent } from '@/lib/analytics-events'
import { pulseUiHaptic } from '@/lib/ui-haptic'

const COPIED_RESET_MS = 2000

type MenuShareButtonProps = {
  label: string
  copiedLabel: string
  shareTitle: string
  shareText: string
}

function isShareAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/** Navigateurs sans API Clipboard (contexte non sécurisé, vieux WebView). */
function copyWithTextarea(value: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}

async function copyToClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return copyWithTextarea(value)
    }
  }
  return copyWithTextarea(value)
}

export function MenuShareButton({ label, copiedLabel, shareTitle, shareText }: MenuShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current)
    },
    [],
  )

  const showCopied = useCallback(() => {
    setCopied(true)
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current)
    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false)
      resetTimerRef.current = null
    }, COPIED_RESET_MS)
  }, [])

  const onShare = useCallback(async () => {
    pulseUiHaptic()
    const url = window.location.href

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url })
        trackGaEvent('share', { method: 'native', content_type: 'daily_menu' })
        return
      } catch (error) {
        if (isShareAbort(error)) return
      }
    }

    if (await copyToClipboard(url)) {
      trackGaEvent('share', { method: 'copy_link', content_type: 'daily_menu' })
      showCopied()
    }
  }, [shareText, shareTitle, showCopied])

  return (
    <div className="menu-share">
      <button
        type="button"
        className={`menu-share__button${copied ? ' menu-share__button--copied' : ''}`}
        onClick={onShare}
      >
        {copied ? null : <ShareIcon size={16} />}
        <span aria-live="polite">{copied ? copiedLabel : label}</span>
      </button>
    </div>
  )
}
