import type { MetadataRoute } from 'next'

import { locales } from '@/i18n'
import { client } from '@/sanity/lib/client'
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_INDEX_QUERY,
  BLOG_TAGS_QUERY,
  type BlogCategoryListItem,
  type BlogSummary,
} from '@/sanity/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'

// Sitemap entries require a lastModified value (Next's serializer doesn't
// handle it being omitted, despite the type marking it optional). Since we
// don't track a real per-page "last changed" date for static marketing
// pages, we compute this once at module load rather than calling `new
// Date()` on every request/revalidation — it stays stable for the life of
// this server instance instead of always claiming "changed today".
const BUILD_TIME = new Date()

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

type LocalizedEntryMeta = {
  lastModified: Date
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// Every locale gets its own first-class sitemap entry (self-canonical, with
// the full hreflang alternates map including itself) rather than only the
// default locale being listed and de/fr/es existing solely as alternates
// nested inside it — each localized URL is a real, independently
// submittable page.
function pushLocalizedEntries(
  sitemap: MetadataRoute.Sitemap,
  pathname: string,
  meta: LocalizedEntryMeta,
) {
  const alternates = { languages: buildLocaleAlternates(pathname) }

  for (const locale of locales) {
    sitemap.push({
      url: `${SITE_URL}/${locale}${pathname}`,
      ...meta,
      alternates,
    })
  }
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
  const [posts, tags, categories] = await Promise.all([
    client.fetch(BLOG_INDEX_QUERY) as Promise<BlogSitemapPost[]>,
    client.fetch(BLOG_TAGS_QUERY) as Promise<string[]>,
    client.fetch(BLOG_CATEGORIES_QUERY) as Promise<BlogCategoryListItem[]>,
  ])

  const blogIndexLastModified = posts.length
    ? new Date(
        Math.max(
          ...posts.map((post) => getLastModified(post).getTime()),
        ),
      )
    : BUILD_TIME

  const sitemap: MetadataRoute.Sitemap = []

  for (const { path, changeFrequency, priority } of STATIC_ROUTES) {
    pushLocalizedEntries(sitemap, path, { lastModified: BUILD_TIME, changeFrequency, priority })
  }

  pushLocalizedEntries(sitemap, '/blog', {
    lastModified: blogIndexLastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  })

  for (const post of posts) {
    if (!post.slug?.current) continue

    pushLocalizedEntries(sitemap, `/blog/${post.slug.current}`, {
      lastModified: getLastModified(post),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const tag of tags) {
    if (!tag) continue

    pushLocalizedEntries(sitemap, `/blog/tags/${encodeURIComponent(tag)}`, {
      lastModified: BUILD_TIME,
      changeFrequency: 'weekly',
      priority: 0.4,
    })
  }

  for (const category of categories) {
    const slug = category.slug?.current
    if (!slug) continue

    pushLocalizedEntries(sitemap, `/blog/categories/${encodeURIComponent(slug)}`, {
      lastModified: BUILD_TIME,
      changeFrequency: 'weekly',
      priority: 0.4,
    })
  }

  return sitemap
}
