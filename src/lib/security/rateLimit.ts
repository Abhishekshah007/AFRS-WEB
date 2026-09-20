import { NextResponse } from 'next/server'

type Bucket = {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  const realIp = request.headers.get('x-real-ip')?.trim()
  return realIp || 'unknown'
}

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()

  if (store.size > 10_000) {
    for (const [entryKey, bucket] of store) {
      if (bucket.resetAt <= now) store.delete(entryKey)
    }
  }

  let bucket = store.get(key)
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs }
    store.set(key, bucket)
  }

  bucket.count += 1

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  }
}

export function rateLimitResponse(result: RateLimitResult): Response {
  const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000))

  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
      },
    },
  )
}

export const PUBLIC_RATE_LIMITS = {
  chat: { id: 'chat', limit: 30, windowMs: 60_000 },
  chatEscalate: { id: 'chat-escalate', limit: 5, windowMs: 60 * 60_000 },
  registration: { id: 'registration', limit: 10, windowMs: 60 * 60_000 },
  contact: { id: 'contact', limit: 5, windowMs: 60 * 60_000 },
} as const
