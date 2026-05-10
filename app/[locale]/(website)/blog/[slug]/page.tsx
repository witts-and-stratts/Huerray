import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

import {BlogCard} from '@/components/blog/BlogCard'
import {BlogPortableText} from '@/components/blog/BlogPortableText'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {formatDate} from '@/lib/utils/format'
import {client} from '@/sanity/lib/client'
import {
  BLOG_POST_QUERY,
  getLocalizedValue,
  type BlogPost,
  type BlogSummary,
} from '@/sanity/lib/blog'
import {urlFor} from '@/sanity/lib/image'
import type {Locale} from '@/i18n'
import generateSEO from '@/components/seo/SEO'

type Props = {
  params: Promise<{locale: Locale; slug: string}>
}

export const revalidate = 300

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params
  const post = (await client.fetch(BLOG_POST_QUERY, {slug})) as BlogPost | null
  const t = await getTranslations({locale, namespace: 'metadata'})

  if (!post) {
    return {
      title: `${t('website.blog')} - Huerray`,
      description: t('website.blogDescription'),
    }
  }

  const title = getLocalizedValue<string>(post.seoTitle, locale, getLocalizedValue<string>(post.title, locale, 'Huerray')) ?? 'Huerray'
  const description = getLocalizedValue<string>(post.seoDescription, locale, getLocalizedValue<string>(post.excerpt, locale, t('website.blogDescription'))) ?? t('website.blogDescription')
  const imageSource = post.openGraphImage ?? post.mainImage

  const metadata = await generateSEO(locale, 'metadata', {
    title,
    description,
    pathname: `/blog/${slug}`,
    canonical: post.canonicalUrl,
    noIndex: post.noIndex,
  })

  if (imageSource) {
    metadata.openGraph = {
      title,
      description,
      images: [
        {
          url: urlFor(imageSource as any).width(1200).height(630).fit('crop').url(),
          width: 1200,
          height: 630,
        },
      ],
    }
  }

  return metadata
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params
  const t = await getTranslations({locale, namespace: 'metadata'})
  const post = (await client.fetch(BLOG_POST_QUERY, {slug})) as BlogPost | null

  if (!post) notFound()

  const title = getLocalizedValue<string>(post.title, locale, 'Untitled') || 'Untitled'
  const excerpt = getLocalizedValue<string>(post.excerpt, locale, '')
  const body = getLocalizedValue<unknown[]>(post.body as Record<string, unknown[]>, locale, []) as unknown[]
  const categories = (post.categories ?? [])
    .map((category) => ({
      id: category._id,
      title: getLocalizedValue<string>(category.title, locale),
    }))
    .filter((category): category is {id: string; title: string} => Boolean(category.title))
  const relatedPosts = (post.relatedPosts ?? []).filter((relatedPost) => relatedPost.slug?.current && relatedPost._id !== post._id)
  const authorImage = post.author?.image ? urlFor(post.author.image as any).width(96).height(96).fit('crop').url() : null
  const heroImage = post.mainImage ? urlFor(post.mainImage as any).width(1600).height(1100).fit('crop').url() : null

  return (
    <>
      <Header />
      <main className="body-content blog-post">
        <section className="blog-post__hero">
          <div className="blog-post__hero-section">
            <div className="blog-post__container">
              <div className="blog-post__content">
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href={`/${locale}/blog`}>{t('website.blogBack')}</Link>
                </Button>

                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge key={category.id} variant="pill">
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="blog-post__title">{title}</h1>
                {excerpt && <p className="blog-post__excerpt">{excerpt}</p>}

                <div className="blog-post__meta">
                  {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
                  {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} {t('website.blogReadTime')}</span> : null}
                </div>

                {post.author?.name && (
                  <div className="blog-post__author">
                    {authorImage ? (
                      <Image
                        src={authorImage}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="blog-post__author-image"
                      />
                    ) : (
                      <div className="blog-post__author-image bg-burgundy-50" />
                    )}
                    <div>
                      <div className="blog-post__author-name">
                        {t('website.blogBy')} {post.author.name}
                      </div>
                      <div className="blog-post__author-meta">
                        {post.updatedAt && post.updatedAt !== post.publishedAt
                          ? `${t('website.blogUpdated')} ${formatDate(post.updatedAt, locale)}`
                          : t('website.blogPublished')}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="blog-post__media">
                {heroImage ? (
                  <div className="blog-post__image">
                    <Image
                      src={heroImage}
                      alt={title}
                      width={1600}
                      height={1100}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="blog-index__empty">{t('website.blogDescription')}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="blog-post__article">
          <div className="blog-post__article-container">
            <div className="rounded-[32px] border border-burgundy-100 bg-white px-6 py-8 md:px-10 md:py-12 shadow-sm">
              <BlogPortableText value={body} />
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="blog-post__related">
            <div className="blog-post__related-container">
              <h2 className="blog-post__related-title">{t('website.blogRelated')}</h2>
              <div className="blog-index__grid">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost._id}
                    post={relatedPost as BlogSummary}
                    locale={locale}
                    byLabel={t('website.blogBy')}
                    readTimeLabel={t('website.blogReadTime')}
                  />
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
