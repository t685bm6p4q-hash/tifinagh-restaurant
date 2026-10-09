/**
 * Auth admin partagée (API upload + proxy Basic Auth).
 * Fail-closed : sans MENU_ADMIN_PASSWORD, tout accès est refusé.
 *
 * Le navigateur n'envoie pas toujours Authorization sur fetch() vers /api/* après
 * un Basic Auth sur /admin — un cookie HttpOnly de session comble ce trou.
 * Le cookie porte son expiration signée : changer le mot de passe révoque toutes les sessions.
 */

import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import type { NextResponse } from 'next/server'

const ADMIN_SESSION_COOKIE = 'tifinagh_admin_session'
const SESSION_MARKER = 'tifinagh-admin-v2'
/** 8 h — suffisant pour une mise à jour du menu, sans session permanente. */
const ADMIN_SESSION_MAX_AGE_SEC = 8 * 60 * 60
/** Jeton one-shot dans le formulaire (cookie parfois absent sur POST Server Action). */
export const ADMIN_UPLOAD_TOKEN_MAX_AGE_SEC = 10 * 60

/** Mémoire par instance serverless : freine le brute-force sans remplacer un pare-feu. */
const MAX_AUTH_FAILURES = 10
const AUTH_FAILURE_WINDOW_MS = 15 * 60 * 1000
const MAX_TRACKED_CLIENTS = 1000
const authFailures = new Map<string, { count: number; resetAt: number }>()

export function getAdminPassword(): string | null {
  const value = process.env.MENU_ADMIN_PASSWORD?.trim()
  return value ? value : null
}

/** Comparaison en temps constant (empreintes de même longueur, quelle que soit l'entrée). */
export function safeEqual(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest()
  const digestB = createHash('sha256').update(b).digest()
  return timingSafeEqual(digestA, digestB)
}

function sessionSignature(expectedPassword: string, expiresAtSec: number): string {
  return createHmac('sha256', expectedPassword)
    .update(`${SESSION_MARKER}.${expiresAtSec}`)
    .digest('base64url')
}

function createSessionToken(expectedPassword: string): string {
  const expiresAtSec = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE_SEC
  return `${expiresAtSec}.${sessionSignature(expectedPassword, expiresAtSec)}`
}

function uploadTokenSignature(expectedPassword: string, expiresAtSec: number): string {
  return createHmac('sha256', expectedPassword)
    .update(`${SESSION_MARKER}.upload.${expiresAtSec}`)
    .digest('base64url')
}

export function createAdminUploadToken(expectedPassword: string): string {
  const expiresAtSec = Math.floor(Date.now() / 1000) + ADMIN_UPLOAD_TOKEN_MAX_AGE_SEC
  return `${expiresAtSec}.${uploadTokenSignature(expectedPassword, expiresAtSec)}`
}

export function verifyAdminUploadToken(token: string, expectedPassword: string): boolean {
  const dot = token.indexOf('.')
  if (dot <= 0) return false
  const expiresAtSec = Number(token.slice(0, dot))
  const nowSec = Math.floor(Date.now() / 1000)
  if (!Number.isInteger(expiresAtSec)) return false
  if (expiresAtSec <= nowSec || expiresAtSec > nowSec + ADMIN_UPLOAD_TOKEN_MAX_AGE_SEC) return false
  return safeEqual(token.slice(dot + 1), uploadTokenSignature(expectedPassword, expiresAtSec))
}

function isSessionTokenValid(token: string, expectedPassword: string): boolean {
  const dot = token.indexOf('.')
  if (dot <= 0) return false
  const expiresAtSec = Number(token.slice(0, dot))
  const nowSec = Math.floor(Date.now() / 1000)
  if (!Number.isInteger(expiresAtSec)) return false
  if (expiresAtSec <= nowSec || expiresAtSec > nowSec + ADMIN_SESSION_MAX_AGE_SEC) return false
  return safeEqual(token.slice(dot + 1), sessionSignature(expectedPassword, expiresAtSec))
}

function readCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim()
    if (!trimmed.startsWith(`${name}=`)) continue
    return trimmed.slice(name.length + 1)
  }
  return null
}

function passwordFromBasicAuth(header: string | null): string | null {
  if (!header?.startsWith('Basic ')) return null
  try {
    const decoded = atob(header.slice(6))
    const colon = decoded.indexOf(':')
    if (colon < 0) return null
    return decoded.slice(colon + 1)
  } catch {
    return null
  }
}

export function requestClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export function isAdminRateLimited(request: Request): boolean {
  const entry = authFailures.get(requestClientKey(request))
  if (!entry) return false
  if (entry.resetAt <= Date.now()) {
    authFailures.delete(requestClientKey(request))
    return false
  }
  return entry.count >= MAX_AUTH_FAILURES
}

export function recordAdminAuthFailure(request: Request): void {
  const key = requestClientKey(request)
  const now = Date.now()
  const entry = authFailures.get(key)
  if (entry && entry.resetAt > now) {
    entry.count += 1
    return
  }
  if (authFailures.size >= MAX_TRACKED_CLIENTS) {
    for (const [k, v] of authFailures) {
      if (v.resetAt <= now) authFailures.delete(k)
    }
    if (authFailures.size >= MAX_TRACKED_CLIENTS) authFailures.clear()
  }
  authFailures.set(key, { count: 1, resetAt: now + AUTH_FAILURE_WINDOW_MS })
}

export function hasValidAdminSession(request: Request, expectedPassword: string): boolean {
  const token = readCookieValue(request.headers.get('cookie'), ADMIN_SESSION_COOKIE)
  if (!token) return false
  return isSessionTokenValid(token, expectedPassword)
}

export function passwordFromRequestBasicAuth(request: Request): string | null {
  return passwordFromBasicAuth(request.headers.get('authorization'))
}

export function setAdminSessionCookie(response: NextResponse, expectedPassword: string): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(expectedPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    /** Path=/ requis : le cookie doit accompagner fetch() vers /api/upload-menu après login /admin. */
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  })
}

/** True uniquement si le mot de passe env est défini ET fourni correctement. */
export function isAdminAuthorized(request: Request): boolean {
  const expected = getAdminPassword()
  if (!expected) return false
  if (isAdminRateLimited(request)) return false

  if (hasValidAdminSession(request, expected)) return true

  const fromBasic = passwordFromRequestBasicAuth(request)
  if (fromBasic && safeEqual(fromBasic, expected)) return true
  if (fromBasic) recordAdminAuthFailure(request)

  return false
}

/** Upload menu : cookie, Basic Auth ou jeton signé du formulaire. */
export function isAdminAuthorizedForMenuUpload(
  request: Request,
  formData: FormData,
): boolean {
  if (isAdminAuthorized(request)) return true
  const expected = getAdminPassword()
  if (!expected) return false
  const raw = formData.get('uploadToken')
  if (typeof raw === 'string' && verifyAdminUploadToken(raw, expected)) return true
  return false
}
