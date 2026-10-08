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

export async function writePrivateMenuBlob(
  pathname: string,
  body: MenuBlobBody,
  contentType: string,
) {
  return put(pathname, body, {
    access: 'private',
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  })
}
