#!/usr/bin/env node
/**
 * Smoke test prod (ou preview) — API menu + page /menu-du-jour.
 * Sonde optionnelle des copies publiques Blob si BLOB_STORE_ID ou MENU_BLOB_LEGACY_PUBLIC_BASE_URL.
 *
 * Usage: node scripts/verify-menu-production.mjs [baseUrl]
 */
const base = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tifinagh.fr').replace(
  /\/$/,
  '',
)

const MENU_PATHS = ['menu-du-jour.pdf', 'menu-du-jour-en.pdf']

const checks = []

async function headMenu(path, label) {
  const url = `${base}${path}`
  const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
  const served = res.headers.get('x-menu-served-variant')
  checks.push({
    label,
    ok: res.ok,
    status: res.status,
    served,
    url,
  })
  return res.ok
}

async function getMenuBody(path, label, minBytes = 1000) {
  const url = `${base}${path}`
  const res = await fetch(url, { redirect: 'follow' })
  const buf = Buffer.from(await res.arrayBuffer())
  const ok = res.ok && buf.length >= minBytes
  checks.push({
    label,
    ok,
    status: res.status,
    bytes: buf.length,
    url,
  })
  return ok
}

async function pageHasMenuPreview() {
  const url = `${base}/menu-du-jour`
  const res = await fetch(url, { redirect: 'follow' })
  const html = await res.text()
  const ok = res.ok && html.includes('/api/menu-pdf') && html.includes('menu-pdf-viewer')
  checks.push({
    label: 'Page /menu-du-jour (HTML + viewer)',
    ok,
    status: res.status,
    url,
  })
  return ok
}

function publicBlobBases() {
  const bases = new Set()
  const legacy = process.env.MENU_BLOB_LEGACY_PUBLIC_BASE_URL?.replace(/\/$/, '')
  if (legacy) bases.add(legacy)
  const storeId = process.env.BLOB_STORE_ID?.replace(/^store_/i, '')
  if (storeId) {
    bases.add(`https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`)
  }
  return [...bases]
}

/** HEAD anonyme sur .public.blob.* — copie legacy encore téléchargeable sans auth. */
async function noAnonymousPublicMenuCopies() {
  const bases = publicBlobBases()
  if (bases.length === 0) {
    checks.push({
      label: 'Sonde Blob public anonyme (skip — BLOB_STORE_ID non défini)',
      ok: true,
      status: '—',
      url: '(local: vercel env pull)',
    })
    return true
  }

  let ok = true
  for (const pathname of MENU_PATHS) {
    const encodedPath = pathname
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')
    for (const blobBase of bases) {
      const url = `${blobBase}/${encodedPath}`
      try {
        const res = await fetch(url, {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(8_000),
        })
        const reachable = res.ok
        checks.push({
          label: `Blob public anonyme ${pathname} (${blobBase})`,
          ok: !reachable,
          status: res.status,
          url,
        })
        if (reachable) ok = false
      } catch {
        checks.push({
          label: `Blob public anonyme ${pathname} (${blobBase})`,
          ok: true,
          status: 'timeout/err',
          url,
        })
      }
    }
  }
  return ok
}

let failed = false

if (!(await headMenu('/api/menu-pdf', 'HEAD menu FR'))) failed = true
if (!(await headMenu('/api/menu-pdf?variant=en&strict=1', 'HEAD menu EN strict'))) failed = true
if (!(await getMenuBody('/api/menu-pdf?w=640', 'GET menu FR redimensionné (w=640)'))) failed = true
if (!(await pageHasMenuPreview())) failed = true
if (!(await noAnonymousPublicMenuCopies())) failed = true

for (const c of checks) {
  const extra =
    c.bytes != null
      ? ` ${c.bytes} o`
      : c.served
        ? ` variant=${c.served}`
        : ''
  console.log(`${c.ok ? '✔' : '✖'} ${c.label} — HTTP ${c.status}${extra}`)
  if (!c.ok) console.log(`  ${c.url}`)
}

if (failed) {
  console.error('\nÉchec — corriger l’API menu / Blob avant MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0.')
  process.exit(1)
}

const strictBlob = process.env.MENU_BLOB_ALLOW_PUBLIC_FALLBACK === '0'
console.log(
  strictBlob
    ? '\nOK — prod menu + mode Blob strict (MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0).'
    : '\nOK — prod menu. Pour couper le repli public : admin Blob → puis MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0 sur Vercel.',
)
process.exit(0)
