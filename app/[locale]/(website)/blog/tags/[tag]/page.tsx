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
import {BLOG_TAG_QUERY, BLOG_TAGS_QUERY, type BlogSummary} from '@/sanity/lib/blog'

type Props = {
  params: Promise<{locale: Locale; tag: string}>
}

export const revalidate = 300

function decodeTag(tag: string) {
  try {
    return decodeURIComponent(tag)
  } catch {
    return tag
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, tag} = await params
  const decodedTag = decodeTag(tag)
  const t = await getTranslations({locale, namespace: 'metadata'})

  return {
    title: `#${decodedTag} | ${t('website.blog')} | Huerray`,
    description: `${t('website.blogDescription')} #${decodedTag}`,
  }
}

export default async function BlogTagPage({params}: Props) {
  const {locale, tag} = await params
  const decodedTag = decodeTag(tag)
  const t = await getTranslations({locale, namespace: 'metadata'})
  const [posts, allTags] = await Promise.all([
    client.fetch<BlogSummary[]>(BLOG_TAG_QUERY as string, {tag: decodedTag} as any),
    client.fetch<string[]>(BLOG_TAGS_QUERY),
  ])
  const relatedTags = allTags
    .filter((tagLabel) => tagLabel && tagLabel !== decodedTag)
    .slice(0, 12)

  if (posts.length === 0) notFound()

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
              <h1 className="blog-hero__title">#{decodedTag}</h1>
              <p className="blog-hero__subtitle">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged with #{decodedTag}.
              </p>
              <div className="blog-hero__actions">
                <Button asChild variant="outline" size="xl">
                  <Link href={`/${locale}/blog`}>{t('website.blogBack')}</Link>
                </Button>
              </div>
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

        {relatedTags.length > 0 && (
          <section className="blog-index__section blog-index__section--compact">
            <div className="blog-index__container">
              <div className="blog-section__header">
                <h2>More tags</h2>
              </div>
              <div className="blog-tag-list blog-tag-list--large">
                {relatedTags.map((tagLabel) => (
                  <Badge key={tagLabel} asChild variant="pill" className="blog-tag">
                    <Link href={`/${locale}/blog/tags/${encodeURIComponent(tagLabel)}`}>#{tagLabel}</Link>
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
