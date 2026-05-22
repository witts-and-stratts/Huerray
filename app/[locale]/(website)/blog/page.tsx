import type {Metadata} from 'next'
import Link from 'next/link'
import {getTranslations} from 'next-intl/server'

import {BlogCard} from '@/components/blog/BlogCard'
import {BlogFeaturedCarousel} from '@/components/blog/BlogFeaturedCarousel'
import {BlogMoreList} from '@/components/blog/BlogMoreList'
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
  const featuredCandidates = posts.filter((post) => post.featured)
  const featuredPosts = [
    ...featuredCandidates,
    ...posts.filter((post) => !featuredCandidates.includes(post)),
  ].slice(0, 4)
  const featuredIds = new Set(featuredPosts.map((post) => post._id))
  const latestPosts = posts.filter((post) => !featuredIds.has(post._id))
  const leadPosts = latestPosts.slice(0, 6)
  const morePosts = latestPosts.slice(6)
  const byLabel = t('website.blogBy')
  const readTimeLabel = t('website.blogReadTime')

  return (
    <>
      <Header />
      <main className="body-content blog-page">
        <section className="blog-hero">
          <div className="blog-hero__container">
            <div className="blog-hero__content">
              <h1 className="blog-hero__title">{t('website.blog')}</h1>
              <p className="blog-hero__subtitle">{t('website.blogDescription')}</p>
            </div>
          </div>
        </section>

        <section className="blog-featured">
          <div className="blog-index__container">
            {featuredPosts.length > 0 ? (
              <BlogFeaturedCarousel
                posts={featuredPosts}
                locale={locale}
                byLabel={byLabel}
                readTimeLabel={readTimeLabel}
              />
            ) : (
              <div className="blog-index__empty">{t('website.blogNoPosts')}</div>
            )}
          </div>
        </section>

        <section id="latest" className="blog-index__section">
          <div className="blog-index__container">
            <div className="blog-section__header">
              <h2>{t('website.blogLatest')}</h2>
            </div>

            {leadPosts.length > 0 ? (
              <div className="blog-index__grid">
                {leadPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    locale={locale}
                    latest
                    byLabel={byLabel}
                    readTimeLabel={readTimeLabel}
                  />
                ))}
              </div>
            ) : (
              <div className="blog-index__empty">{t('website.blogNoPosts')}</div>
            )}
          </div>
        </section>

        {morePosts.length > 0 && (
          <section className="blog-index__section blog-index__section--compact">
            <div className="blog-index__container">
              <div className="blog-section__header">
                <h2>{t('website.blog')}</h2>
              </div>
              <BlogMoreList
                posts={morePosts}
                locale={locale}
                byLabel={byLabel}
                readTimeLabel={readTimeLabel}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
