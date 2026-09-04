import { describe, expect, it } from 'vitest'
import { containsHtml, sanitizeSafeHtml } from '@/lib/cms'

describe('sanitizeSafeHtml', () => {
  it('keeps safe links and strips unsafe tags', () => {
    const html = 'Connect with us. <a href="/contact">Click here.</a> <script>alert(1)</script>'
    expect(containsHtml(html)).toBe(true)
    expect(sanitizeSafeHtml(html)).toBe(
      'Connect with us. <a href="/contact" rel="noopener noreferrer">Click here.</a> alert(1)',
    )
  })

  it('blocks javascript urls', () => {
    expect(sanitizeSafeHtml('<a href="javascript:alert(1)">Click</a>')).toBe('Click</a>')
  })
})
