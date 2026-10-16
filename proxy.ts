import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';
import { isProductionHost } from './lib/config';

// Helper function to get user data from cookie
function getUserDataFromCookie(request: NextRequest): { role: 'brand' | 'creator' | 'admin'; emailVerified?: boolean } | null {
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

function getPreferredLocale(request: NextRequest, hasLocalePrefix: boolean, pathnameLocale: string) {
  if (hasLocalePrefix) {
    return pathnameLocale;
  }

  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && (locales as readonly string[]).includes(localeCookie)) {
    return localeCookie;
  }

  return defaultLocale;
}

// Non-production deployments (dev.huerray.de, stellar.huerray.de, preview
// URLs, ...) must never be indexed — a crawled duplicate of the marketing
// site would dilute production's SEO. A response header is used rather
// than relying only on robots.txt or per-page metadata, because it applies
// uniformly to every route regardless of what an individual page
// declares, and because a robots.txt disallow only stops crawling — it
// doesn't stop an already-linked URL from being indexed without a
// snippet.
function withRobotsHeader( response: NextResponse, request: NextRequest ): NextResponse {
  if ( !isProductionHost( request.headers.get( 'host' ) ) ) {
    response.headers.set( 'X-Robots-Tag', 'noindex, nofollow' );
  }
  return response;
}

export default function middleware(request: NextRequest) {
  return withRobotsHeader( handleRequest( request ), request );
}

function handleRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from path — only treat the first segment as a locale if it
  // is an actual supported locale, otherwise fall back to the default locale.
  const segments = pathname.split('/');
  const firstSegment = segments[1] ?? '';
  const hasLocalePrefix = (locales as readonly string[]).includes(firstSegment);
  const locale = getPreferredLocale(request, hasLocalePrefix, firstSegment);
  let pathWithoutLocale = pathname;
  if (hasLocalePrefix) {
    pathWithoutLocale = '/' + segments.slice(2).join('/');
  }

  // Allow public routes (without auth check, but with i18n)
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // If it's a public route, just run i18n middleware
  if (isPublicRoute) {
    return intlMiddleware(request);
  }
  const isAdminRoute = pathWithoutLocale === '/admin' || pathWithoutLocale.startsWith('/admin/');
  const isBrandRoute = pathWithoutLocale === '/brand' || pathWithoutLocale.startsWith('/brand/');
  const isCreatorRoute = pathWithoutLocale === '/creator' || pathWithoutLocale.startsWith('/creator/');
  const isDashboardRoute = pathWithoutLocale.startsWith('/dashboard');

  const isProtectedRoute = isAdminRoute || isBrandRoute || isCreatorRoute || isDashboardRoute;

  if (isProtectedRoute) {
    // If the path DOES NOT have a locale prefix, but it IS a protected route,
    // we should redirect it to add the locale prefix to the path before checking roles,
    // otherwise the redirect logic gets confused.
    if (!hasLocalePrefix) {
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    const userData = getUserDataFromCookie(request);

    // Redirect to login if no user session data
    if (!userData) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathWithoutLocale);
      return NextResponse.redirect(loginUrl);
    }

    // Brands and creators cannot reach any dashboard page until their email is verified
    if (userData.role !== 'admin' && userData.emailVerified === false) {
      return NextResponse.redirect(new URL(`/${locale}/verify-email`, request.url));
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
