type LogContext = Record<string, unknown>

/** Structured server-side logging for CMS and app errors. */
export function logCmsError(scope: string, error: unknown, context?: LogContext): void {
  const message = error instanceof Error ? error.message : String(error)
  const payload = {
    scope,
    message,
    ...(context || {}),
    ...(error instanceof Error && error.stack ? { stack: error.stack } : {}),
  }

  console.error(`[cms:${scope}]`, payload)
}

export function logClientError(scope: string, error: unknown, context?: LogContext): void {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[client:${scope}]`, { message, ...(context || {}) })
}
