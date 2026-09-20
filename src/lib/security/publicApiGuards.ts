import { jsonError } from '@/lib/apiResponses'
import { checkRateLimit, getClientIp, rateLimitResponse } from './rateLimit'
import { isTurnstileConfigured, verifyTurnstileToken } from './turnstile'

export type PublicApiGuardOptions = {
  rateLimit: { id: string; limit: number; windowMs: number }
  turnstileToken?: string | null
  requireTurnstile?: boolean
}

export async function enforcePublicApiGuards(
  req: Request,
  options: PublicApiGuardOptions,
): Promise<Response | null> {
  const ip = getClientIp(req)
  const rateKey = `${options.rateLimit.id}:${ip}`
  const rate = checkRateLimit(rateKey, options.rateLimit.limit, options.rateLimit.windowMs)

  if (!rate.allowed) {
    return rateLimitResponse(rate)
  }

  const needsCaptcha = options.requireTurnstile ?? isTurnstileConfigured()
  if (needsCaptcha) {
    const valid = await verifyTurnstileToken(options.turnstileToken, ip)
    if (!valid) {
      return jsonError('Security verification failed. Please refresh and try again.', 400)
    }
  }

  return null
}
