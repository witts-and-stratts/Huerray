import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Auth pages (/login, /signup, etc.) are intentionally NOT disallowed
        // here even though they're marked noindex via metadata — a crawler
        // needs to be able to fetch a page to see its noindex tag. Disallowing
        // it too would risk a stale, description-less listing sticking around
        // forever if it was ever indexed before. The private dashboard trees
        // below are large, effectively infinite authenticated surfaces where
        // saving crawl budget outweighs that concern, so they stay blocked.
        disallow: [
          '/*/admin/',
          '/*/creator/',
          '/*/brand/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
