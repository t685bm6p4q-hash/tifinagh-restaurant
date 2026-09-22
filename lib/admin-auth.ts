/**
 * Auth admin partagée (API upload + proxy Basic Auth).
 * Fail-closed : sans MENU_ADMIN_PASSWORD, tout accès est refusé.
 *
 * Le navigateur n'envoie pas toujours Authorization sur fetch() vers /api/* après
 * un Basic Auth sur /admin — un cookie HttpOnly de session comble ce trou.
 */

import { createHmac } from 'node:crypto'
import type { NextResponse } from 'next/server'

export const ADMIN_SESSION_COOKIE = 'tifinagh_admin_session'
const SESSION_MARKER = 'tifinagh-admin-v1'
/** 8 h — suffisant pour une mise à jour du menu, sans session permanente. */
export const ADMIN_SESSION_MAX_AGE_SEC = 8 * 60 * 60

export function getAdminPassword(): string | null {
  const value = process.env.MENU_ADMIN_PASSWORD?.trim()
  return value ? value : null
}

/** Comparaison en temps constant pour limiter les fuites de timing. */
export function safeEqual(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length)
  let mismatch = a.length === b.length ? 0 : 1
  for (let i = 0; i < max; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0
    const cb = i < b.length ? b.charCodeAt(i) : 0
    mismatch |= ca ^ cb
  }
  return mismatch === 0
}

export function adminSessionToken(expectedPassword: string): string {
  return createHmac('sha256', expectedPassword).update(SESSION_MARKER).digest('base64url')
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
    const decoded = atob(authPayload(header))
    const colon = decoded.indexOf(':')
    if (colon < 0) return null
    return decoded.slice(colon + 1)
  } catch {
    return null
  }
}

function authPayload(header: string): string {
  return header.slice(6)
}

export function hasValidAdminSession(request: Request, expectedPassword: string): boolean {
  const token = readCookieValue(request.headers.get('cookie'), ADMIN_SESSION_COOKIE)
  if (!token) return false
  return safeEqual(token, adminSessionToken(expectedPassword))
}

export function passwordFromRequestBasicAuth(request: Request): string | null {
  return passwordFromBasicAuth(request.headers.get('authorization'))
}

export function setAdminSessionCookie(response: NextResponse, expectedPassword: string): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, adminSessionToken(expectedPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  })
}

/** True uniquement si le mot de passe env est défini ET fourni correctement. */
export function isAdminAuthorized(request: Request): boolean {
  const expected = getAdminPassword()
  if (!expected) return false

  if (hasValidAdminSession(request, expected)) return true

  const fromBasic = passwordFromRequestBasicAuth(request)
  if (fromBasic && safeEqual(fromBasic, expected)) return true

  return false
}
