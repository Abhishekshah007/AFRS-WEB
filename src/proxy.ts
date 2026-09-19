import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { shouldRedirectToMaintenance } from '@/lib/resilience/maintenance'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (shouldRedirectToMaintenance(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
