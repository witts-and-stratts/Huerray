import type {Metadata} from 'next'
import Link from 'next/link'
import {getTranslations} from 'next-intl/server'

import {BlogCard} from '@/components/blog/BlogCard'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import generateSEO from '@/components/seo/SEO'
import {client} from '@/sanity/lib/client'
import {BLOG_INDEX_QUERY, type BlogSummary} from '@/sanity/lib/blog'
import type {Locale} from '@/i18n'

type Props = {
  params: Promise<{locale: Locale}>
}

export const revalidate = 300

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'metadata'})
  return generateSEO(locale, 'metadata', {
    title: t('website.blog'),
    description: t('website.blogDescription'),
    pathname: '/blog',
  })
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'metadata'})
  const posts = (await client.fetch(BLOG_INDEX_QUERY)) as BlogSummary[]
  const featuredPost = posts.find((post) => post.featured) ?? posts[0]
  const latestPosts = featuredPost ? posts.filter((post) => post._id !== featuredPost._id) : posts

  return (
    <>
      <Header />
      <main className="body-content blog-page">
        <section className="blog-hero">
          <div className="blog-hero__section">
            <div className="blog-hero__container">
              <div className="blog-hero__content">
                <Badge variant="pill" className="blog-hero__eyebrow">
                  {t('website.blog')}
                </Badge>
                <h1 className="blog-hero__title">{t('website.blog')}</h1>
                <p className="blog-hero__subtitle">{t('website.blogDescription')}</p>
                <div className="blog-hero__actions">
                  <Button asChild variant="hero" size="xl">
                    <Link href="#latest">{t('website.blogLatest')}</Link>
                  </Button>
                  {featuredPost?.slug?.current && (
                    <Button asChild variant="outline" size="xl">
                      <Link href={`/${locale}/blog/${featuredPost.slug.current}`}>
                        {t('website.blogReadMore')}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="blog-hero__featured">
                {featuredPost ? (
                  <>
                    <span className="blog-hero__featured-label">{t('website.blogFeatured')}</span>
                    <BlogCard
                      post={featuredPost}
                      locale={locale}
                      featured
                      byLabel={t('website.blogBy')}
                      readTimeLabel={t('website.blogReadTime')}
                    />
                  </>
                ) : (
                  <div className="blog-index__empty">{t('website.blogNoPosts')}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="latest" className="blog-index__section">
          <div className="blog-index__container">
            <div className="blog-index__header">
              <div>
                <h2 className="blog-index__title">{t('website.blogLatest')}</h2>
                <p className="blog-index__description">{t('website.blogDescription')}</p>
              </div>
            </div>

            {latestPosts.length > 0 ? (
              <div className="blog-index__grid">
                {latestPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    locale={locale}
                    byLabel={t('website.blogBy')}
                    readTimeLabel={t('website.blogReadTime')}
                  />
                ))}
              </div>
            ) : (
              <div className="blog-index__empty">{t('website.blogNoPosts')}</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
