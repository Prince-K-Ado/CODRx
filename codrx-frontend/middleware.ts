// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED = ['/dashboard', '/orders', '/prescriptions']

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const path = url.pathname
  const hasSession = !!req.cookies.get('codrx_access_token') // name must match Django

  // protect app pages
  if (PROTECTED.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  const hasAcess = !!req.cookies.get('codrx_access_token')?.value;

  if (!hasAcess) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)','/dashboard/:path*','/orders/:path*','/prescriptions/:path*'],
}
