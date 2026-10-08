#!/usr/bin/env node
/**
 * Smoke test prod (ou preview) avant MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0.
 * Usage: node scripts/verify-menu-production.mjs [baseUrl]
 */
const base = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tifinagh.fr').replace(
  /\/$/,
  '',
)

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

let failed = false

if (!(await headMenu('/api/menu-pdf', 'HEAD menu FR'))) failed = true
if (!(await headMenu('/api/menu-pdf?variant=en&strict=1', 'HEAD menu EN strict'))) failed = true
if (!(await getMenuBody('/api/menu-pdf?w=640', 'GET menu FR redimensionné (w=640)'))) failed = true
if (!(await pageHasMenuPreview())) failed = true

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
  console.error('\nÉchec — ne pas activer MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0.')
  process.exit(1)
}

console.log('\nOK — étape intermédiaire validée. Vous pouvez enchaîner le basculement privé (admin + Vercel).')
process.exit(0)
