import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const adminPath = join(root, 'app/admin/menu-setup/page.tsx')
const admin = readFileSync(adminPath, 'utf8')

const forbiddenInAdmin = [
  { pattern: /formatMenuRevision\s*\(/, message: 'formatMenuRevision supprimé — utiliser formatMenuUploadedAt + uploadedAt' },
  {
    pattern: /storage\.(fr|en)\.revision/,
    message: 'Ne pas afficher storage.*.revision dans l’admin (etag cache) — utiliser uploadedAt',
  },
]

for (const { pattern, message } of forbiddenInAdmin) {
  if (pattern.test(admin)) {
    console.error(`[check:menu-storage] ${adminPath}\n  → ${message}`)
    process.exit(1)
  }
}

if (!/formatMenuUploadedAt\(storage\.fr\.uploadedAt\)/.test(admin)) {
  console.error('[check:menu-storage] Encadré FR : attendu formatMenuUploadedAt(storage.fr.uploadedAt)')
  process.exit(1)
}
if (!/formatMenuUploadedAt\(storage\.en\.uploadedAt\)/.test(admin)) {
  console.error('[check:menu-storage] Encadré EN : attendu formatMenuUploadedAt(storage.en.uploadedAt)')
  process.exit(1)
}

const formatPath = join(root, 'lib/format-menu-uploaded-at.ts')
const formatSrc = readFileSync(formatPath, 'utf8')
if (!/looksLikeMenuBlobEtag/.test(formatSrc)) {
  console.error('[check:menu-storage] Garde-fou etag manquant dans format-menu-uploaded-at.ts')
  process.exit(1)
}

console.log('OK: invariants menu storage (admin dates vs revision cache)')
