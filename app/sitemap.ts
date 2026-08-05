import type { MetadataRoute } from 'next'

import { locales } from '@/i18n'
import { client } from '@/sanity/lib/client'
import { BLOG_INDEX_QUERY, type BlogSummary } from '@/sanity/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'
const DEFAULT_LOCALE = locales[0]

type BlogSitemapPost = Pick<BlogSummary, '_id' | 'slug' | 'publishedAt'> & {
  updatedAt?: string
}

function buildLocaleAlternates(pathname: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${pathname}`]),
  )
}

function getLastModified(post: BlogSitemapPost): Date {
  return new Date(post.updatedAt ?? post.publishedAt ?? Date.now())
}

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/brands', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/creators', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/managed-services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/brands-faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/creators-faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/creator-terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/site-notice', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await client.fetch(BLOG_INDEX_QUERY)) as BlogSitemapPost[]

  const blogIndexLastModified = posts.length
    ? new Date(
        Math.max(
          ...posts.map((post) => getLastModified(post).getTime()),
        ),
      )
    : new Date()

  const sitemap: MetadataRoute.Sitemap = [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: buildLocaleAlternates(path || '/'),
      },
    })),
    {
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: buildLocaleAlternates('/blog'),
      },
    },
  ]

  for (const post of posts) {
    if (!post.slug?.current) continue

    sitemap.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog/${post.slug.current}`,
      lastModified: getLastModified(post),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: buildLocaleAlternates(`/blog/${post.slug.current}`),
      },
    })
  }

  return sitemap
}
