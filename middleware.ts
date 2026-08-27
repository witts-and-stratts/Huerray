import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isProductionHost } from '@/lib/config';

// Non-production deployments (dev.huerray.de, stellar.huerray.de, preview
// URLs, localhost, ...) must never be indexed — a crawled duplicate of the
// marketing site would dilute production's SEO. A response header is used
// rather than relying only on robots.txt or per-page metadata, because it
// applies uniformly to every route regardless of what an individual page
// declares, and because a robots.txt disallow only stops crawling — it
// doesn't stop an already-linked URL from being indexed without a snippet.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!isProductionHost(request.headers.get('host'))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
