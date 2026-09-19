import { NextResponse } from 'next/server'

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

export function getThrownErrorMessage(error: unknown): string {
  if (typeof error === 'string' && error.trim()) return error
  if (error instanceof Error && error.message) return error.message
  if (error && typeof error === 'object') {
    const maybe = error as {
      message?: unknown
      data?: { errors?: Array<{ message?: string; path?: string }> }
    }
    if (Array.isArray(maybe.data?.errors) && maybe.data.errors.length) {
      const details = maybe.data.errors
        .map((item) => item.message || item.path)
        .filter(Boolean)
        .join(' ')
      if (details) return details
    }
    if (typeof maybe.message === 'string' && maybe.message.trim()) return maybe.message
  }
  return 'Unable to submit registration.'
}

export function getThrownErrorStatus(error: unknown): number {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = Number((error as { status?: unknown }).status)
    if (status >= 400 && status < 600) return status
  }
  const message = getThrownErrorMessage(error).toLowerCase()
  if (message.includes('invalid') || message.includes('required')) return 400
  return 500
}

export function hasRequiredFields<T extends Record<string, unknown>>(
  body: T,
  fields: Array<keyof T>,
): body is T & { [K in keyof T]-?: Exclude<T[K], undefined | null | ''> } {
  return fields.every((field) => {
    const value = body[field]
    return value !== undefined && value !== null && value !== ''
  })
}
