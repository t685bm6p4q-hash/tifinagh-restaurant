'use client'

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
  const pdfUrl = '/menu-du-jour.pdf'

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
        color: '#fff',
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (viewOnly) {
      // Afficher le PDF dans le navigateur (sans télécharger)
      window.open(pdfUrl, '_blank')
    } else {
      // Télécharger le fichier
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = 'menu-du-jour.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <a
      href={pdfUrl}
      onClick={handleClick}
      style={getStyle()}
      className={className}
      aria-label={viewOnly ? 'Consulter le menu du jour' : 'Télécharger le menu du jour'}
    >
      {viewOnly ? (
        <Eye size={size === 'small' ? 14 : size === 'large' ? 20 : 16} aria-hidden="true" />
      ) : (
        <FileText size={size === 'small' ? 14 : size === 'large' ? 20 : 16} aria-hidden="true" />
      )}
      {label}
    </a>
  )
}
