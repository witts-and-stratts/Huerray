import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/login',
          '/*/signup',
          '/*/forgot-password',
          '/*/reset-password',
          '/*/verify-email',
          '/*/newsletter-unsubscribe',
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
