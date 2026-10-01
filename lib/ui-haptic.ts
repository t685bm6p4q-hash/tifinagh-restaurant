/** Léger retour haptique après un geste utilisateur (Android ; souvent inactif sur iOS Safari). */
export function pulseUiHaptic(ms = 14) {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  navigator.vibrate?.(ms)
}
