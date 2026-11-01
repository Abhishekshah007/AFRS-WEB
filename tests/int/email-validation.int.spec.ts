import { describe, expect, it } from 'vitest'
import { isValidEmail, normalizeEmail } from '@/lib/email'

describe('shared email validation', () => {
  it('trims and normalizes email addresses before validation', () => {
    const email = normalizeEmail('  Ada.Lovelace@Example.ORG  ')

    expect(email).toBe('ada.lovelace@example.org')
    expect(isValidEmail(email)).toBe(true)
  })

  it.each(['', 'ada.example.org', 'ada@', '@example.org', 'ada@example', 'ada @example.org'])(
    'rejects invalid email address %j',
    (email) => {
      expect(isValidEmail(email)).toBe(false)
    },
  )
})
