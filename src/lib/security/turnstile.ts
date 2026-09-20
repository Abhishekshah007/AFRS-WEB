import { getTurnstileSecretKey, isTurnstileConfiguredServer } from './turnstileConfig'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export function isTurnstileConfigured(): boolean {
  return isTurnstileConfiguredServer()
}

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = getTurnstileSecretKey()
  if (!secret) return true

  if (!token?.trim()) return false

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  })

  if (remoteIp && remoteIp !== 'unknown') {
    body.set('remoteip', remoteIp)
  }

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    const data = (await response.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}
