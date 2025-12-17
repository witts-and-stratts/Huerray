import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Helper function to decode JWT and get user role (simplified)
function getUserRoleFromToken(token: string): 'brand' | 'creator' | 'admin' | null {
  try {
    // TODO: Replace with actual JWT verification
    // This is a placeholder - implement proper JWT verification
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes (without auth check, but with i18n)
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // Dashboard routes require authentication
  const isDashboardRoute = pathname.includes('/dashboard');

  if (isDashboardRoute && !isPublicRoute) {
    const token = request.cookies.get('auth_token');

    // For now, skip auth check during development
    // TODO: Enable authentication when ready
    /*
    // Redirect to login if no token
    if (!token) {
      const locale = pathname.split('/')[1] || defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Get user role from token
    const userRole = getUserRoleFromToken(token.value);

    // Redirect to login if invalid token
    if (!userRole) {
      const locale = pathname.split('/')[1] || defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control (with locale support)
    if (pathname.includes('/dashboard/brand') && userRole !== 'brand') {
      const locale = pathname.split('/')[1] || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/dashboard/${userRole}`, request.url));
    }

    if (pathname.includes('/dashboard/creator') && userRole !== 'creator') {
      const locale = pathname.split('/')[1] || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/dashboard/${userRole}`, request.url));
    }

    if (pathname.includes('/dashboard/admin') && userRole !== 'admin') {
      const locale = pathname.split('/')[1] || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/dashboard/${userRole}`, request.url));
    }
    */
  }

  // Run the next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
