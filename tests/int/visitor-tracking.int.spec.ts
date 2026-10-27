import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getPayloadClient, storedVisitors, payload } = vi.hoisted(() => {
  const storedVisitors = new Set<string>()
  const payload = {
    find: vi.fn(async ({ where }: { where: { visitorHash: { equals: string } } }) => {
      const exists = storedVisitors.has(where.visitorHash.equals)
      return {
        docs: exists ? [{ visitorHash: where.visitorHash.equals }] : [],
        totalDocs: exists ? 1 : 0,
      }
    }),
    create: vi.fn(async ({ data }: { data: { visitorHash: string } }) => {
      storedVisitors.add(data.visitorHash)
      return { id: storedVisitors.size }
    }),
    count: vi.fn(async () => ({ totalDocs: storedVisitors.size })),
  }

  return {
    getPayloadClient: vi.fn(async () => payload),
    storedVisitors,
    payload,
  }
})

vi.mock('@/lib/payload', () => ({ getPayloadClient }))

import { POST } from '@/app/(frontend)/api/visitors/track/route'

describe('unique visitor tracking endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storedVisitors.clear()
  })

  it('counts a new anonymous browser once and reuses its cookie', async () => {
    const firstResponse = await POST(
      new Request('https://afrs.test/api/visitors/track', { method: 'POST' }),
    )
    const firstBody = await firstResponse.json()
    const setCookie = firstResponse.headers.get('set-cookie')
    expect(setCookie).toMatch(/afrs_visitor=/)
    expect(firstBody).toEqual({ uniqueVisitors: 1 })
    expect(payload.create).toHaveBeenCalledOnce()

    const cookie = setCookie?.split(';')[0]
    const secondResponse = await POST(
      new Request('https://afrs.test/api/visitors/track', {
        method: 'POST',
        headers: { cookie },
      }),
    )

    expect(await secondResponse.json()).toEqual({ uniqueVisitors: 1 })
    expect(payload.create).toHaveBeenCalledOnce()
    expect([...storedVisitors][0]).toMatch(/^[a-f0-9]{64}$/)
  })

  it('rejects cross-origin calls without storing visitor data', async () => {
    const response = await POST(
      new Request('https://afrs.test/api/visitors/track', {
        method: 'POST',
        headers: { origin: 'https://other.example' },
      }),
    )

    expect(response.status).toBe(403)
    expect(payload.create).not.toHaveBeenCalled()
  })
})
