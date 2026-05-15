import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

import {BlogCard} from '@/components/blog/BlogCard'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import type {Locale} from '@/i18n'
import {client} from '@/sanity/lib/client'
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_CATEGORY_QUERY,
  getLocalizedValue,
  type BlogCategoryListItem,
  type BlogSummary,
} from '@/sanity/lib/blog'

type Props = {
  params: Promise<{locale: Locale; category: string}>
}

export const revalidate = 300

function decodeCategory(category: string) {
  try {
    return decodeURIComponent(category)
  } catch {
    return category
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, category} = await params
  const decodedCategory = decodeCategory(category)
  const t = await getTranslations({locale, namespace: 'metadata'})
  const categories = await client.fetch<BlogCategoryListItem[]>(BLOG_CATEGORIES_QUERY)
  const current = categories.find((entry) => entry.slug?.current === decodedCategory)
  const title = getLocalizedValue<string>(current?.title, locale, decodedCategory) ?? decodedCategory
  const description = getLocalizedValue<string>(current?.description, locale, t('website.blogDescription'))

  return {
    title: `${title} | ${t('website.blog')} | Huerray`,
    description,
  }
}

export default async function BlogCategoryPage({params}: Props) {
  const {locale, category} = await params
  const decodedCategory = decodeCategory(category)
  const t = await getTranslations({locale, namespace: 'metadata'})
  const [posts, allCategories] = await Promise.all([
    client.fetch<BlogSummary[]>(BLOG_CATEGORY_QUERY as string, {category: decodedCategory} as any),
    client.fetch<BlogCategoryListItem[]>(BLOG_CATEGORIES_QUERY),
  ])

  if (posts.length === 0) notFound()

  const current = allCategories.find((entry) => entry.slug?.current === decodedCategory)
  const title = getLocalizedValue<string>(current?.title, locale, decodedCategory) ?? decodedCategory
  const description = getLocalizedValue<string>(current?.description, locale)
  const relatedCategories = allCategories
    .filter((entry) => entry.slug?.current && entry.slug.current !== decodedCategory)
    .slice(0, 12)

  return (
    <>
      <Header />
      <main className="body-content blog-page">
        <section className="blog-hero">
          <div className="blog-hero__container">
            <div className="blog-hero__content">
              <Badge variant="pill" className="blog-hero__eyebrow">
                {t('website.blog')}
              </Badge>
              <h1 className="blog-hero__title">{title}</h1>
              {/* <p className="blog-hero__subtitle">
                {description ??
                  `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} in ${title}.`}
              </p> */}
            </div>
          </div>
        </section>

        <section className="blog-index__section">
          <div className="blog-index__container">
            <div className="blog-section__header">
              <h2>{t('website.blogLatest')}</h2>
            </div>
            <div className="blog-index__grid">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  locale={locale}
                  byLabel={t('website.blogBy')}
                  readTimeLabel={t('website.blogReadTime')}
                />
              ))}
            </div>
          </div>
        </section>

        {relatedCategories.length > 0 && (
          <section className="blog-index__section blog-index__section--compact">
            <div className="blog-index__container">
              <div className="blog-section__header">
                <h2>More categories</h2>
              </div>
              <div className="blog-tag-list blog-tag-list--large">
                {relatedCategories.map((entry) => {
                  const slug = entry.slug?.current
                  if (!slug) return null
                  const label = getLocalizedValue<string>(entry.title, locale, slug) ?? slug
                  return (
                    <Badge key={entry._id} asChild variant="pill" className="blog-tag">
                      <Link href={`/${locale}/blog/categories/${encodeURIComponent(slug)}`}>
                        {label}
                      </Link>
                    </Badge>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
