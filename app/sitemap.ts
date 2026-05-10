import type { MetadataRoute } from 'next'

import { locales } from '@/i18n'
import { client } from '@/sanity/lib/client'
import { BLOG_INDEX_QUERY, type BlogSummary } from '@/sanity/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.com'
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
    {
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: 'weekly',
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
