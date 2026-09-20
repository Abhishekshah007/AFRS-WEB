export { resolveTotalVisitors } from '@/lib/site/totalVisitors'

export function buildWhatsAppUrl(phone: string | null | undefined, message: string): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function membershipWhatsAppHref(
  phone: string | null | undefined,
  planTitle: string,
  fallback = '/contact',
): string {
  return (
    buildWhatsAppUrl(phone, `Hello AFRS Team, I am interested in joining the ${planTitle}.`) ??
    fallback
  )
}
