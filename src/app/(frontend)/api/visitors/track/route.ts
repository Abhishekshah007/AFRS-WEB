import { randomUUID, createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/security/rateLimit'

const VISITOR_COOKIE = 'afrs_visitor'
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const VISITOR_TOKEN_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const VISITOR_RATE_LIMIT = { id: 'visitor-track', limit: 120, windowMs: 60_000 }

function hashVisitorToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return Response.json(
          { error: 'Cross-origin visitor tracking is not allowed.' },
          { status: 403 },
        )
      }
    } catch {
      return Response.json(
        { error: 'Cross-origin visitor tracking is not allowed.' },
        { status: 403 },
      )
    }
  }

  const rate = checkRateLimit(
    `${VISITOR_RATE_LIMIT.id}:${getClientIp(request)}`,
    VISITOR_RATE_LIMIT.limit,
    VISITOR_RATE_LIMIT.windowMs,
  )
  if (!rate.allowed) return rateLimitResponse(rate)

  const cookieHeader = request.headers.get('cookie') ?? ''
  const cookieValue = cookieHeader
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${VISITOR_COOKIE}=`))
    ?.slice(VISITOR_COOKIE.length + 1)
  const visitorToken =
    cookieValue && VISITOR_TOKEN_PATTERN.test(cookieValue) ? cookieValue : randomUUID()
  const visitorHash = hashVisitorToken(visitorToken)

  try {
    const payload = await getPayloadClient()
    const existing = await payload.find({
      collection: 'siteVisitors',
      where: { visitorHash: { equals: visitorHash } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.totalDocs === 0) {
      try {
        await payload.create({
          collection: 'siteVisitors',
          data: { visitorHash },
          overrideAccess: true,
        })
      } catch (error) {
        const duplicate = await payload.find({
          collection: 'siteVisitors',
          where: { visitorHash: { equals: visitorHash } },
          limit: 1,
          overrideAccess: true,
        })
        if (duplicate.totalDocs === 0) throw error
      }
    }

    const { totalDocs: uniqueVisitors } = await payload.count({
      collection: 'siteVisitors',
      overrideAccess: true,
    })
    const response = NextResponse.json({ uniqueVisitors })

    if (visitorToken !== cookieValue) {
      response.cookies.set(VISITOR_COOKIE, visitorToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: VISITOR_COOKIE_MAX_AGE,
      })
    }

    return response
  } catch (error) {
    console.error('[VisitorTracking] Unable to record a unique visitor:', error)
    return Response.json({ error: 'Unable to update the visitor count.' }, { status: 500 })
  }
}
