'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getTurnstileSiteKey } from '@/lib/security/turnstileConfig'

type TurnstileApi = {
  render: (
    _container: HTMLElement,
    _options: {
      sitekey: string
      callback: (_token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string
  remove: (_widgetId: string) => void
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    turnstile?: TurnstileApi
  }
}

type TurnstileFieldProps = {
  onTokenChange: (_token: string | null) => void
  className?: string
}

export function TurnstileField({ onTokenChange, className }: TurnstileFieldProps) {
  const siteKey = getTurnstileSiteKey()
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [renderFailed, setRenderFailed] = useState(false)

  const renderWidget = useCallback(() => {
    if (!siteKey || renderFailed || !containerRef.current || !window.turnstile) return

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => onTokenChange(token),
        'expired-callback': () => onTokenChange(null),
        'error-callback': () => onTokenChange(null),
      })
    } catch (error) {
      setRenderFailed(true)
      onTokenChange(null)
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[TurnstileField] Widget failed to render:', error)
      }
    }
  }, [onTokenChange, renderFailed, siteKey])

  useEffect(() => {
    if (scriptReady) renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget, scriptReady])

  if (!siteKey || renderFailed) {
    return null
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} className={className || 'min-h-[65px]'} />
    </>
  )
}
