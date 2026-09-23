'use client'

import Link from 'next/link'
import { FileText, Eye } from 'lucide-react'

interface MenuPdfButtonProps {
  variant?: 'primary' | 'text' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  label?: string
  className?: string
  viewOnly?: boolean
}

export function MenuPdfButton({
  variant = 'primary',
  size = 'medium',
  label = 'Voir le menu du jour',
  className = '',
  viewOnly = true,
}: MenuPdfButtonProps) {
  const pdfUrl = '/api/menu-pdf'

  // Déterminer les styles selon la variante
  const getStyle = () => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size === 'small' ? '6px' : '10px',
      textDecoration: 'none',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      fontWeight: '600',
      transition: 'all 0.2s',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      padding:
        size === 'small'
          ? '8px 14px'
          : size === 'large'
            ? '16px 32px'
            : '12px 20px',
    }

    if (variant === 'primary') {
      return {
        ...baseStyle,
        background: '#25d366',
        /* Texte fonce : le blanc sur ce vert ne donne que 1.98:1 (WCAG AA). */
        color: '#071b10',
      }
    }
    if (variant === 'secondary') {
      return {
        ...baseStyle,
        background: 'var(--surface)',
        color: 'var(--gold)',
        border: '1px solid var(--gold)',
      }
    }
    // text
    return {
      ...baseStyle,
      background: 'transparent',
      color: 'var(--gold)',
      borderBottom: '1px solid var(--gold)',
      padding: size === 'small' ? '0 0 4px 0' : '0 0 6px 0',
    }
  }

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'menu-du-jour.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (viewOnly) {
    return (
      <Link
        href="/menu-du-jour"
        style={getStyle()}
        className={className}
        aria-label="Consulter le menu du jour"
      >
        <Eye size={size === 'small' ? 14 : size === 'large' ? 20 : 16} aria-hidden="true" />
        {label}
      </Link>
    )
  }

  return (
    <a
      href={pdfUrl}
      onClick={handleDownload}
      style={getStyle()}
      className={className}
      aria-label="Télécharger le menu du jour"
    >
      <FileText size={size === 'small' ? 14 : size === 'large' ? 20 : 16} aria-hidden="true" />
      {label}
    </a>
  )
}
