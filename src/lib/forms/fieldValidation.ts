export function isValidPhoneNumber(value: string | null | undefined): boolean {
  const phone = value?.trim()
  if (!phone || !/^\+?[\d\s().-]+$/.test(phone)) return false
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export function isValidCalendarDate(value: string | null | undefined): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

export function localDateInputValue(date = new Date()): string {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}
