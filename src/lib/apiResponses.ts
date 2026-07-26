import { NextResponse } from 'next/server'

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
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
