'use client'

import { useEffect } from 'react'

/** Met à jour document.title et la meta description après changement de langue (navigation client). */
export function SeoDocumentSync({
  title,
  description,
}: {
  title: string
  description: string
}) {
  useEffect(() => {
    if (title) document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])

  return null
}
