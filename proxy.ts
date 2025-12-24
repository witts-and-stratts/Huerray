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

  // Extract locale from path
  const locale = pathname.split('/')[1] || defaultLocale;

  // Allow public routes (without auth check, but with i18n)
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // If it's a public route, just run i18n middleware
  if (isPublicRoute) {
    return intlMiddleware(request);
  }

  // Protected admin routes - check more specifically to avoid false matches
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  const isAdminRoute = pathWithoutLocale.startsWith('/admin') && !pathWithoutLocale.startsWith('/brand-admin') && !pathWithoutLocale.startsWith('/creator-admin');
  const isBrandAdminRoute = pathWithoutLocale.startsWith('/brand-admin');
  const isCreatorAdminRoute = pathWithoutLocale.startsWith('/creator-admin');
  const isDashboardRoute = pathWithoutLocale.startsWith('/dashboard');

  const isProtectedRoute = isAdminRoute || isBrandAdminRoute || isCreatorAdminRoute || isDashboardRoute;

  if (isProtectedRoute) {
    const authToken = request.cookies.get('authToken');
    const userData = getUserDataFromCookie(request);

    // Redirect to login if no auth token
    if (!authToken) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathWithoutLocale);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect to login if no user data
    if (!userData) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathWithoutLocale);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const userRole = userData.role;

    // Admin route - only admins allowed
    if (isAdminRoute && userRole !== 'admin') {
      const redirectPath = userRole === 'brand' ? '/brand-admin' : '/creator-admin';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Brand admin route - only brands allowed
    if (isBrandAdminRoute && userRole !== 'brand') {
      const redirectPath = userRole === 'admin' ? '/admin' : '/creator-admin';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Creator admin route - only creators allowed
    if (isCreatorAdminRoute && userRole !== 'creator') {
      const redirectPath = userRole === 'admin' ? '/admin' : '/brand-admin';
      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
    }

    // Old /dashboard route - redirect to role-specific dashboard
    if (isDashboardRoute && !isAdminRoute && !isBrandAdminRoute && !isCreatorAdminRoute) {
      const redirectPath = userRole === 'admin' ? '/admin' : userRole === 'creator' ? '/creator-admin' : '/brand-admin';
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
