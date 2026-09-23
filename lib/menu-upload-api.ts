import { z } from 'zod'

export const menuUploadErrorBodySchema = z.object({
  error: z.string(),
})

export const menuUploadSuccessBodySchema = z.object({
  success: z.literal(true),
  message: z.string(),
  url: z.string(),
})

export type MenuUploadErrorBody = z.infer<typeof menuUploadErrorBodySchema>
export type MenuUploadSuccessBody = z.infer<typeof menuUploadSuccessBodySchema>

export type MenuUploadParsedResponse =
  | { kind: 'success'; body: MenuUploadSuccessBody }
  | { kind: 'error'; body: MenuUploadErrorBody }
  | { kind: 'invalid' }

export async function parseMenuUploadResponse(
  response: Response,
): Promise<MenuUploadParsedResponse> {
  let raw: unknown
  try {
    raw = await response.json()
  } catch {
    return { kind: 'invalid' }
  }

  if (response.ok) {
    const parsed = menuUploadSuccessBodySchema.safeParse(raw)
    return parsed.success ? { kind: 'success', body: parsed.data } : { kind: 'invalid' }
  }

  const parsed = menuUploadErrorBodySchema.safeParse(raw)
  return parsed.success ? { kind: 'error', body: parsed.data } : { kind: 'invalid' }
}
