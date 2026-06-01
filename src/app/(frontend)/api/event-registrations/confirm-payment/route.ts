import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type ConfirmPayload = {
  registrationId?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConfirmPayload
    if (!body.registrationId) return NextResponse.json({ error: 'Registration id is required.' }, { status: 400 })

    const payload = await getPayloadClient()

    const existing = await payload.findByID({
      collection: 'eventRegistrations',
      id: body.registrationId,
      depth: 0,
      overrideAccess: true,
    })

    const reference = `AFRS-${Date.now()}-${String(existing.id).slice(-4)}`

    const updated = await payload.update({
      collection: 'eventRegistrations',
      id: existing.id,
      data: {
        paymentStatus: 'paid',
        registrationStatus: 'confirmed',
        paymentReference: reference,
        paymentConfirmedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: updated.id,
      paymentReference: reference,
      eventSlug: updated.eventSlug,
      redirectTo: `/events/${updated.eventSlug}/register/confirmation/${updated.id}`,
    })
  } catch {
    return NextResponse.json({ error: 'Unable to confirm payment.' }, { status: 500 })
  }
}
