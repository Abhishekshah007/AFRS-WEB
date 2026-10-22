/** AFSL laboratory pages are their own site section, including service subpages. */
export function isAfslPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return pathname === '/services' || pathname.startsWith('/services/')
}
