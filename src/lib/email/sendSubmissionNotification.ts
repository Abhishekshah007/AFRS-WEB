type SubmissionEmailKind =
  | 'contact'
  | 'labInquiry'
  | 'serviceConsult'
  | 'legalConsultancy'
  | 'courseRegistration'
  | 'eventRegistration'

const kindLabels: Record<SubmissionEmailKind, string> = {
  contact: 'General contact',
  labInquiry: 'AFSL lab inquiry',
  serviceConsult: 'Service consultation',
  legalConsultancy: 'Legal consultancy request',
  courseRegistration: 'Course / training registration',
  eventRegistration: 'Event registration',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rowsToHtml(rows: Array<{ label: string; value?: string | null }>): string {
  return rows
    .filter((row) => row.value)
    .map(
      (row) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">${escapeHtml(row.label)}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${escapeHtml(String(row.value))}</td></tr>`,
    )
    .join('')
}

export async function sendSubmissionNotification({
  kind,
  title,
  rows,
  adminUrl,
}: {
  kind: SubmissionEmailKind
  title: string
  rows: Array<{ label: string; value?: string | null }>
  adminUrl?: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.SUBMISSION_NOTIFY_EMAIL || process.env.SITE_NOTIFY_EMAIL
  const from = process.env.RESEND_FROM_EMAIL || 'AFRS Notifications <onboarding@resend.dev>'

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[email] Skipped — set RESEND_API_KEY and SUBMISSION_NOTIFY_EMAIL in .env')
    }
    return
  }

  const subject = `[AFRS] New ${kindLabels[kind]} — ${title}`
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h2 style="margin:0 0 12px;">New submission received</h2>
      <p style="margin:0 0 16px;color:#475569;">Type: <strong>${escapeHtml(kindLabels[kind])}</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rowsToHtml(rows)}</table>
      ${adminUrl ? `<p style="margin-top:20px;"><a href="${escapeHtml(adminUrl)}">Open in admin panel</a></p>` : ''}
      <p style="margin-top:24px;font-size:12px;color:#94a3b8;">A DOCX export is attached to this record in Payload CMS when applicable.</p>
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
    console.error('[email] Resend error:', text || res.statusText)
  }
}

export function flattenDocForEmail(
  doc: Record<string, unknown>,
  extra?: Array<{ label: string; value?: string | null }>,
): Array<{ label: string; value?: string | null }> {
  const skip = new Set(['id', 'password', 'salt', 'hash', 'exportDocument', 'event', 'description'])
  const rows: Array<{ label: string; value?: string | null }> = [...(extra || [])]

  for (const [key, value] of Object.entries(doc)) {
    if (skip.has(key)) continue
    if (value === null || value === undefined || value === '') continue

    if (key === 'customResponses' && typeof value === 'object' && !Array.isArray(value)) {
      for (const [customKey, customValue] of Object.entries(value as Record<string, unknown>)) {
        if (customValue == null || customValue === '') continue
        rows.push({ label: customKey, value: String(customValue) })
      }
      continue
    }

    if (typeof value === 'object') continue

    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim()
    rows.push({ label, value: String(value) })
  }

  return rows
}
