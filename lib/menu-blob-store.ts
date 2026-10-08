import { get, put } from '@vercel/blob'

type MenuBlobBody = string | Buffer | Blob | ArrayBuffer | ReadableStream

type BlobAccess = 'private' | 'public'

/**
 * Lecture serveur uniquement — jamais d’URL Blob exposée au navigateur.
 * Repli `public` pour les fichiers déjà en ligne avant le passage en privé.
 */
export async function readMenuBlob(pathname: string): Promise<{
  stream: ReadableStream
  contentType: string | null
  etag: string | undefined
  uploadedAt: Date
  accessUsed: BlobAccess
}> {
  const allowPublicFallback = process.env.MENU_BLOB_ALLOW_PUBLIC_FALLBACK !== '0'
  const order: BlobAccess[] = allowPublicFallback ? ['private', 'public'] : ['private']
  for (const access of order) {
    try {
      const result = await get(pathname, { access, useCache: false })
      if (result?.statusCode === 200 && result.stream) {
        return {
          stream: result.stream,
          contentType: result.blob.contentType ?? null,
          etag: result.blob.etag,
          uploadedAt: result.blob.uploadedAt,
          accessUsed: access,
        }
      }
    } catch {
      /* essai suivant */
    }
  }
  throw new Error('MENU_BLOB_READ_FAILED')
}

export async function readMenuBlobBytes(pathname: string): Promise<Uint8Array> {
  const { stream } = await readMenuBlob(pathname)
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function readMenuBlobPrefix(pathname: string, maxBytes: number): Promise<Uint8Array> {
  const full = await readMenuBlobBytes(pathname)
  return full.subarray(0, Math.min(maxBytes, full.length))
}

function isPublicOnlyBlobStoreError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error)
  return (
    msg.includes('public store') ||
    msg.includes('private access') ||
    msg.includes('configured with private access')
  )
}

const menuBlobPutOptions = (contentType: string) => ({
  contentType,
  addRandomSuffix: false as const,
  allowOverwrite: true,
  cacheControlMaxAge: 0,
})

/**
 * Écriture admin — privé si le store le permet, sinon public (store Vercel « public only »).
 * Le menu reste servi uniquement via `/api/menu-pdf`, pas d’URL Blob dans le HTML.
 */
export async function writePrivateMenuBlob(
  pathname: string,
  body: MenuBlobBody,
  contentType: string,
) {
  const opts = menuBlobPutOptions(contentType)
  try {
    return await put(pathname, body, { ...opts, access: 'private' })
  } catch (error: unknown) {
    if (!isPublicOnlyBlobStoreError(error)) throw error
    return put(pathname, body, { ...opts, access: 'public' })
  }
}
