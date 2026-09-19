const MAINTENANCE_BYPASS_PREFIXES = [
  '/admin',
  '/api',
  '/_next',
  '/assets',
  '/maintenance',
  '/manifest.webmanifest',
  '/favicon.ico',
]

export function isMaintenanceModeEnabled(): boolean {
  return process.env.MAINTENANCE_MODE === 'true'
}

/** Paths that must stay reachable while maintenance mode is on. */
export function isMaintenanceBypassPath(pathname: string): boolean {
  return MAINTENANCE_BYPASS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function shouldRedirectToMaintenance(pathname: string): boolean {
  return isMaintenanceModeEnabled() && !isMaintenanceBypassPath(pathname)
}
