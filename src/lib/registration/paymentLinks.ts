export type ResolvedPaymentLink =
  | { kind: 'href'; href: string }
  | { kind: 'copy'; label: string; value: string }

/** Turn CMS payment link / UPI ID into a safe href, or a copy-only fallback. */
export function resolvePaymentLink(raw?: string | null): ResolvedPaymentLink | null {
  const trimmed = raw?.trim()
  if (!trimmed) return null

  if (/^https?:\/\//i.test(trimmed)) {
    return { kind: 'href', href: trimmed }
  }

  if (/^upi:\/\//i.test(trimmed)) {
    return { kind: 'href', href: trimmed }
  }

  if (trimmed.includes('@')) {
    const params = new URLSearchParams({ pa: trimmed, cu: 'INR' })
    return { kind: 'href', href: `upi://pay?${params.toString()}` }
  }

  return { kind: 'copy', label: 'Payment reference', value: trimmed }
}
