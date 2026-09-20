const DEFAULT_FROM_ADDRESS = 'onboarding@resend.dev'
const DEFAULT_FROM_NAME = 'AFRS'

/** Parses RESEND_FROM_EMAIL (`name@domain.com` or `Name <name@domain.com>`). */
export function resolveResendFrom(): {
  defaultFromAddress: string
  defaultFromName: string
} {
  const raw = process.env.RESEND_FROM_EMAIL?.trim()

  if (!raw) {
    return {
      defaultFromAddress: DEFAULT_FROM_ADDRESS,
      defaultFromName: DEFAULT_FROM_NAME,
    }
  }

  const namedMatch = raw.match(/^(.+?)\s*<([^>]+)>$/)
  if (namedMatch) {
    return {
      defaultFromName: namedMatch[1].trim(),
      defaultFromAddress: namedMatch[2].trim(),
    }
  }

  return {
    defaultFromAddress: raw,
    defaultFromName: DEFAULT_FROM_NAME,
  }
}
