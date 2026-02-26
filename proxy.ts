import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Helper function to get user data from cookie
function getUserDataFromCookie(request: NextRequest): { role: 'brand' | 'creator' | 'admin' } | null {
  try {
    const userDataCookie = request.cookies.get('userData');
    if (!userDataCookie) return null;
    
    const userData = JSON.parse(userDataCookie.value);
    if (!userData.role) return null;
    
    return userData;
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

  // Extract locale from path — only treat the first segment as a locale if it
  // is an actual supported locale, otherwise fall back to the default locale.
  const segments = pathname.split('/');
  const firstSegment = segments[1] ?? '';
  const hasLocalePrefix = (locales as readonly string[]).includes(firstSegment);
  const locale = hasLocalePrefix ? firstSegment : defaultLocale;
  const pathWithoutLocale = hasLocalePrefix
    ? '/' + segments.slice(2).join('/')
    : pathname;

  // Allow public routes (without auth check, but with i18n)
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // If it's a public route, just run i18n middleware
  if (isPublicRoute) {
    return intlMiddleware(request);
  }
  const isAdminRoute = pathWithoutLocale.startsWith('/admin');
  const isBrandRoute = pathWithoutLocale.startsWith('/brand');
  const isCreatorRoute = pathWithoutLocale.startsWith('/creator');
  const isDashboardRoute = pathWithoutLocale.startsWith('/dashboard');

  const isProtectedRoute = isAdminRoute || isBrandRoute || isCreatorRoute || isDashboardRoute;

  if (isProtectedRoute) {
    const userData = getUserDataFromCookie(request);

    // Redirect to login if no user session data
    if (!userData) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathWithoutLocale);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const userRole = userData.role;

    // Admin route - only admins allowed
    if (isAdminRoute && userRole !== 'admin') {
      const redirectPath = userRole === 'brand' ? '/brand' : '/creator';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Brand route - only brands allowed
    if (isBrandRoute && userRole !== 'brand') {
      const redirectPath = userRole === 'admin' ? '/admin' : '/creator';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Creator route - only creators allowed
    if (isCreatorRoute && userRole !== 'creator') {
      const redirectPath = userRole === 'admin' ? '/admin' : '/brand';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Old /dashboard route - redirect to role-specific dashboard
    if (isDashboardRoute && !isAdminRoute && !isBrandRoute && !isCreatorRoute) {
      const redirectPath = userRole === 'admin' ? '/admin' : userRole === 'creator' ? '/creator' : '/brand';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }
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
