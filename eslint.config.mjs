import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      '.verify-chrome-profile-cookies/**',
      'scripts/**',
      'tests/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: [
      'components/menu/**',
      'components/menu-pdf-fullscreen.tsx',
      'components/header-nav.tsx',
      'components/page-banner-image.tsx',
      'app/not-found.tsx',
      'src/components/templates/home-template.tsx',
    ],
    rules: {
      // LCP menu / logo : img natif volontaire (preload, pas d’optimiseur Next).
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
