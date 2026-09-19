import { logCmsError } from '@/lib/resilience/logger'

/** Run a CMS query; on failure log and return the provided fallback. */
export async function safeQuery<T>(
  scope: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await query()
  } catch (error) {
    logCmsError(scope, error)
    return fallback
  }
}
