#!/usr/bin/env node
/**
 * Smoke test prod — admin fail-closed + API upload protégée.
 * Usage: node scripts/verify-admin-production.mjs [baseUrl]
 */
const base = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tifinagh.fr').replace(
  /\/$/,
  '',
)

const checks = []

async function check(label, fn) {
  try {
    const result = await fn()
    checks.push({ label, ...result })
    return result.ok
  } catch (error) {
    checks.push({
      label,
      ok: false,
      status: 'error',
      detail: error instanceof Error ? error.message : String(error),
    })
    return false
  }
}

let failed = false

if (
  !(await check('GET /admin/menu-setup sans auth → 401 ou 503', async () => {
    const res = await fetch(`${base}/admin/menu-setup`, { redirect: 'manual' })
    const ok = res.status === 401 || res.status === 503
    const wwwAuth = res.headers.get('www-authenticate')
    return {
      ok,
      status: res.status,
      detail: res.status === 401 && !wwwAuth ? 'WWW-Authenticate manquant' : wwwAuth ?? undefined,
    }
  }))
) {
  failed = true
}

if (
  !(await check('GET /api/upload-menu sans cookie → 401', async () => {
    const res = await fetch(`${base}/api/upload-menu`)
    return { ok: res.status === 401, status: res.status }
  }))
) {
  failed = true
}

if (
  !(await check('POST /api/upload-menu sans auth → 401', async () => {
    const form = new FormData()
    form.set('variant', 'fr')
    const res = await fetch(`${base}/api/upload-menu`, { method: 'POST', body: form })
    return { ok: res.status === 401, status: res.status }
  }))
) {
  failed = true
}

if (
  !(await check('Page admin publique ne doit pas contenir uploadToken sans auth', async () => {
    const res = await fetch(`${base}/admin/menu-setup`, { redirect: 'manual' })
    if (res.status === 401 || res.status === 503) {
      return { ok: true, status: res.status }
    }
    const html = await res.text()
    const leaked = html.includes('name="uploadToken"') || html.includes('Mettre en ligne sur le site')
    return { ok: !leaked, status: res.status, detail: leaked ? 'HTML admin exposé sans auth' : undefined }
  }))
) {
  failed = true
}

for (const c of checks) {
  console.log(`${c.ok ? '✔' : '✖'} ${c.label} — ${c.status}${c.detail ? ` (${c.detail})` : ''}`)
}

if (failed) {
  console.error('\nÉchec — sécurité admin / upload menu : corriger avant la prochaine mise en prod.')
  process.exit(1)
}

console.log('\nOK — admin menu fail-closed en production.')
process.exit(0)
