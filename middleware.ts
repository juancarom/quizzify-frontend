import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Handle internationalization first
  const response = intlMiddleware(request);

  // Extract locale from pathname
  const locale = pathname.match(/^\/(en|es)/)?.[1] || routing.defaultLocale;
  const pathnameWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';

  // Protected paths
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some(path => pathnameWithoutLocale.startsWith(path));

  // If it's a protected path and no token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
