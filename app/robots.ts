import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { isProductionHost } from '@/lib/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'

// Auth pages (/login, /signup, etc.) are intentionally NOT disallowed here
// even though they're marked noindex via metadata — a crawler needs to be
// able to fetch a page to see its noindex tag. Disallowing it too would risk
// a stale, description-less listing sticking around forever if it was ever
// indexed before. The private dashboard trees below are large, effectively
// infinite authenticated surfaces where saving crawl budget outweighs that
// concern, so they stay blocked.
const DISALLOW = [
  '/*/admin/',
  '/*/creator/',
  '/*/brand/',
]

// Marketing content on this site is meant to be found and cited by AI
// answer engines (GEO), not just traditional search — so these get the same
// explicit, deliberate allow (rather than leaving them to fall under the
// generic wildcard rule) on the same terms as every other crawler.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Applebot-Extended',
  'CCBot',
]

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Non-production deployments (dev.huerray.de, stellar.huerray.de, preview
  // URLs, ...) get a blanket disallow instead of the real rules below, on
  // top of the noindex header middleware.ts adds to every response there —
  // this keeps crawlers that do respect robots.txt from wasting budget on
  // a duplicate site, in addition to the header stopping indexing outright.
  if (!isProductionHost((await headers()).get('host'))) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
