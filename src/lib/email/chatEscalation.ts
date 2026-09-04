import type { ChatMessage } from '@/lib/chatbot/provider'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || 'AFRS Notifications <onboarding@resend.dev>'

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[email] Skipped — RESEND_API_KEY not set')
    }
    return false
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  })

  if (!res.ok) {
    console.error('[email] Resend error:', await res.text().catch(() => res.statusText))
    return false
  }

  return true
}

function formatTranscript(messages: ChatMessage[]): string {
  return messages
    .map(
      (m) =>
        `<p style="margin:0 0 8px;"><strong>${m.role === 'user' ? 'Visitor' : 'Assistant'}:</strong> ${escapeHtml(m.content)}</p>`,
    )
    .join('')
}

export async function sendChatEscalationEmails({
  userEmail,
  userName,
  userPhone,
  messages,
  reason,
}: {
  userEmail: string
  userName?: string
  userPhone?: string
  messages: ChatMessage[]
  reason?: string
}): Promise<{ adminSent: boolean; userSent: boolean }> {
  const adminTo = process.env.SUBMISSION_NOTIFY_EMAIL || process.env.SITE_NOTIFY_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.appliedforensicresearchsciences.in'
  const displayName = userName?.trim() || 'Website visitor'

  let adminSent = false
  let userSent = false

  if (adminTo) {
    adminSent = await sendEmail({
      to: adminTo,
      subject: `[AFRS Chat] Human assistance requested — ${displayName}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;max-width:640px;">
          <h2 style="margin:0 0 12px;">Chatbot escalation</h2>
          <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(displayName)}</p>
          <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(userEmail)}</p>
          ${userPhone ? `<p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(userPhone)}</p>` : ''}
          ${reason ? `<p style="margin:0 0 16px;"><strong>Reason:</strong> ${escapeHtml(reason)}</p>` : ''}
          <h3 style="margin:16px 0 8px;font-size:14px;">Conversation</h3>
          ${formatTranscript(messages)}
          <p style="margin-top:20px;font-size:12px;color:#64748b;">
            Reply directly to ${escapeHtml(userEmail)} or view <a href="${escapeHtml(siteUrl)}/admin">admin panel</a>.
          </p>
        </div>
      `,
    })
  }

  userSent = await sendEmail({
    to: userEmail,
    subject: 'We received your AFRS enquiry',
    html: `
      <div style="font-family:Arial,sans-serif;color:#0f172a;max-width:640px;">
        <h2 style="margin:0 0 12px;">Thank you for contacting AFRS</h2>
        <p style="margin:0 0 12px;">Dear ${escapeHtml(displayName)},</p>
        <p style="margin:0 0 12px;">
          We received your message from the AFRS website chat assistant. Our team will review your enquiry and respond within <strong>one business day</strong>.
        </p>
        <p style="margin:0 0 12px;">
          For urgent matters, call <strong>+91-9926692487</strong> or email <strong>afrsciences@gmail.com</strong>.
        </p>
        <p style="margin:0 0 12px;">
          Browse <a href="${escapeHtml(siteUrl)}/courses">courses</a>,
          <a href="${escapeHtml(siteUrl)}/events">events</a>, or
          <a href="${escapeHtml(siteUrl)}/services">AFSL services</a> while you wait.
        </p>
        <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Applied Forensic Research Sciences (AFRS), Indore</p>
      </div>
    `,
  })

  return { adminSent, userSent }
}
