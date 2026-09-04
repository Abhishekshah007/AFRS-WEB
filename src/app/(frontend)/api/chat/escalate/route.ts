import { sendChatEscalationEmails } from '@/lib/email/chatEscalation'
import type { ChatMessage } from '@/lib/chatbot/provider'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      userEmail?: string
      userName?: string
      userPhone?: string
      reason?: string
      messages?: ChatMessage[]
    }

    const userEmail = body.userEmail?.trim().toLowerCase() || ''
    if (!userEmail || !EMAIL_RE.test(userEmail)) {
      return Response.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    const messages = (body.messages || []).filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )

    if (messages.length === 0) {
      return Response.json({ error: 'Chat history is required.' }, { status: 400 })
    }

    const { adminSent, userSent } = await sendChatEscalationEmails({
      userEmail,
      userName: body.userName?.trim(),
      userPhone: body.userPhone?.trim(),
      messages: messages.slice(-30),
      reason: body.reason?.trim(),
    })

    if (!userSent && !adminSent) {
      return Response.json(
        {
          error:
            'Email service is not configured. Please use the contact page or call +91-9926692487.',
        },
        { status: 503 },
      )
    }

    return Response.json({
      ok: true,
      message:
        'Thank you! We sent a confirmation to your email. Our team will respond within one business day.',
      adminNotified: adminSent,
      confirmationSent: userSent,
    })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to send your request.' },
      { status: 500 },
    )
  }
}
