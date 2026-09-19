type RegistrantConfirmationKind = 'courseRegistration' | 'eventRegistration'

const kindLabels: Record<RegistrantConfirmationKind, string> = {
  courseRegistration: 'programme registration',
  eventRegistration: 'event registration',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function sendRegistrantConfirmation({
  kind,
  to,
  fullName,
  programmeOrEventTitle,
  registrationId,
  totalAmount,
  currency = 'INR',
  isFree,
  paymentPending,
}: {
  kind: RegistrantConfirmationKind
  to: string
  fullName: string
  programmeOrEventTitle: string
  registrationId: string | number
  totalAmount: number
  currency?: 'INR' | 'USD'
  isFree: boolean
  paymentPending: boolean
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || 'AFRS Notifications <onboarding@resend.dev>'

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[email] Registrant confirmation skipped — set RESEND_API_KEY')
    }
    return
  }

  const amountLabel =
    currency === 'USD'
      ? `$${totalAmount.toLocaleString('en-US')}`
      : `₹${totalAmount.toLocaleString('en-IN')}`

  const statusLine = isFree
    ? 'Your registration has been received. No payment is required for this programme.'
    : paymentPending
      ? 'Your registration has been received. Our team will verify your payment and confirm your seat shortly.'
      : 'Your registration has been received and is being processed.'

  const subject = `[AFRS] Registration received — ${programmeOrEventTitle}`
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;max-width:560px;">
      <h2 style="margin:0 0 12px;">Thank you, ${escapeHtml(fullName)}</h2>
      <p style="margin:0 0 16px;color:#475569;">
        We have received your ${escapeHtml(kindLabels[kind])} for
        <strong>${escapeHtml(programmeOrEventTitle)}</strong>.
      </p>
      <p style="margin:0 0 16px;color:#475569;">${escapeHtml(statusLine)}</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0;">
        <tr>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;">Registration ID</td>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(String(registrationId))}</td>
        </tr>
        ${
          !isFree
            ? `<tr>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;">Amount</td>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(amountLabel)}</td>
        </tr>`
            : ''
        }
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#64748b;">
        For support, contact us through the website. Please keep this email for your records.
      </p>
      <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">
        Applied Forensic Research Sciences
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error('[email] Registrant confirmation error:', text || res.statusText)
  }
}
