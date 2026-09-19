'use client'

import { useEffect } from 'react'
import { logClientError } from '@/lib/resilience/logger'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logClientError('global-error-boundary', error, { digest: error.digest })
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#F4F6FB',
          color: '#1e293b',
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#7f1d1d',
            }}
          >
            Site error
          </p>
          <h1 style={{ marginTop: 12, fontSize: 28, fontWeight: 800 }}>
            AFRS is temporarily unavailable
          </h1>
          <p style={{ marginTop: 16, lineHeight: 1.6, color: '#475569' }}>
            We are working to restore the site. Please refresh in a moment or contact{' '}
            <a href="mailto:afrsciences@gmail.com" style={{ color: '#7f1d1d', fontWeight: 600 }}>
              afrsciences@gmail.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 32,
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: '#7f1d1d',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
