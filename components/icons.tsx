type IconProps = { size?: number; className?: string }

export function MessageCircleIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function ChefHatIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </svg>
  )
}

export function WineIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 22h8" />
      <path d="M7 10h10" />
      <path d="M12 15v7" />
      <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
    </svg>
  )
}

export function CalendarDaysIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 2v3" />
      <path d="M16 2v3" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 13h.01" />
      <path d="M12 13h.01" />
      <path d="M16 13h.01" />
      <path d="M8 17h.01" />
      <path d="M12 17h.01" />
      <path d="M16 17h.01" />
    </svg>
  )
}

/**
 * Logo PagesJaunes (marque jaune + clin d'oeil) — SVG inline, zero asset externe.
 * variant "mark" = icone ronde ; "wordmark" = jaune + texte pagesjaunes.
 */
export function PagesJaunesIcon({
  size = 22,
  variant = 'mark',
}: IconProps & { variant?: 'mark' | 'wordmark' }) {
  if (variant === 'wordmark') {
    return (
      <svg
        width={Math.round(size * 4.2)}
        height={size}
        viewBox="0 0 120 28"
        aria-hidden="true"
        className="pagesjaunes-logo"
      >
        <rect width="120" height="28" rx="4" fill="#FFCC00" />
        {/* Clin d'oeil PagesJaunes */}
        <circle cx="12" cy="11" r="1.6" fill="#111" />
        <path d="M17.2 9.2c1.1 1.4 1.1 2.4 0 3.6" fill="none" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8 16.5c3.2 2.8 9 2.8 12.2 0" fill="none" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
        <text
          x="34"
          y="18.5"
          fill="#111"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="-0.02em"
        >
          pagesjaunes
        </text>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="pagesjaunes-logo"
    >
      <rect width="32" height="32" rx="7" fill="#FFCC00" />
      {/* Clin d'oeil / sourire — identite PagesJaunes */}
      <circle cx="11" cy="12" r="2" fill="#111" />
      <path
        d="M18.5 9.5c1.8 2 1.8 3.5 0 5.5"
        fill="none"
        stroke="#111"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 19c4.2 3.6 11.8 3.6 16 0"
        fill="none"
        stroke="#111"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
