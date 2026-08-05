import {Facebook, Linkedin, Mail, XIcon} from 'lucide-react'
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

import {BlogCard} from '@/components/blog/BlogCard'
import {BlogPortableText, getPortableTextHeadings} from '@/components/blog/BlogPortableText'
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

// lucide-react has no WhatsApp glyph, so the brand mark is inlined here.
function WhatsAppIcon({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.462 3.486 1.34 5.003l-1.425 5.203a.75.75 0 0 0 .92.92l5.302-1.402a9.958 9.958 0 0 0 4.86 1.276h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.671-1.04-5.182-2.929-7.071a9.933 9.933 0 0 0-7.072-2.929zm0 18.245h-.003a8.457 8.457 0 0 1-4.312-1.182l-.31-.184-3.146.832.84-3.066-.202-.315a8.462 8.462 0 0 1-1.298-4.503c0-4.687 3.813-8.5 8.5-8.5a8.44 8.44 0 0 1 6.01 2.489 8.44 8.44 0 0 1 2.49 6.011c0 4.687-3.813 8.5-8.5 8.5z" />
    </svg>
  )
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
  const tableOfContents = getPortableTextHeadings(body)
  const categories = (post.categories ?? [])
    .map((category) => ({
      id: category._id,
      title: getLocalizedValue<string>(category.title, locale),
      slug: category.slug?.current,
    }))
    .filter(
      (category): category is {id: string; title: string; slug: string | undefined} =>
        Boolean(category.title),
    )
  const tags = (post.tags ?? []).filter(Boolean)
  const relatedPosts = [
    ...(post.relatedPosts ?? []),
    ...(post.automaticRelatedPosts ?? []),
    ...(post.latestRelatedPosts ?? []),
  ].reduce<BlogSummary[]>((items, relatedPost) => {
    if (!relatedPost.slug?.current || relatedPost._id === post._id) return items
    if (items.some((item) => item._id === relatedPost._id)) return items
    return [...items, relatedPost]
  }, []).slice(0, 6)
  const authorImage = post.author?.image ? urlFor(post.author.image as any).width(96).height(96).fit('crop').url() : null
  const heroImage = post.mainImage ? urlFor(post.mainImage as any).width(1600).height(1100).fit('crop').url() : null
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'}/${locale}/blog/${slug}`

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt || undefined,
    url: articleUrl,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    inLanguage: locale,
    image: heroImage ?? undefined,
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'Huerray' },
    publisher: {
      '@type': 'Organization',
      name: 'Huerray',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.de'}/images/huerray-logo.png`,
    },
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <Header />
      <main className="body-content blog-post">
        <section className="blog-post__hero">
          <div className="blog-post__container">
            <div className="blog-post__kicker">
              <Link href={`/${locale}/blog`}>{t('website.blogBack')}</Link>
              {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
            </div>

            {categories.length > 0 && (
              <div className="blog-post__categories">
                {categories.map((category) =>
                  category.slug ? (
                    <Badge key={category.id} asChild variant="pill">
                      <Link
                        href={`/${locale}/blog/categories/${encodeURIComponent(category.slug)}`}
                      >
                        {category.title}
                      </Link>
                    </Badge>
                  ) : (
                    <Badge key={category.id} variant="pill">
                      {category.title}
                    </Badge>
                  ),
                )}
              </div>
            )}

            <h1 className="blog-post__title">{title}</h1>
            {excerpt && <p className="blog-post__excerpt">{excerpt}</p>}

            <div className="blog-post__meta">
              {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} {t('website.blogReadTime')}</span> : null}
              {post.updatedAt && post.updatedAt !== post.publishedAt
                ? <span>{t('website.blogUpdated')} {formatDate(post.updatedAt, locale)}</span>
                : null}
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
                  {/* <div className="blog-post__author-meta">{t('website.blogPublished')}</div> */}
                </div>
              </div>
            )}
          </div>
        </section>

        {heroImage && (
          <section className="blog-post__media">
            <div className="blog-post__media-container">
              <Image
                src={heroImage}
                alt={title}
                width={1600}
                height={1100}
                className="blog-post__image"
                priority
              />
            </div>
          </section>
        )}

        <section className="blog-post__article">
          <div className="blog-post__article-layout">
            <aside className="blog-post__toc" aria-label="Table of contents">
              <span>{tableOfContents.length > 0 ? 'Table of contents' : t('website.blog')}</span>
              {tableOfContents.length > 0 && (
                <nav>
                  {tableOfContents.map((heading) => (
                    <a key={heading.id} href={`#${heading.id}`}>
                      {heading.text}
                    </a>
                  ))}
                </nav>
              )}
            </aside>

            <article className="blog-post__article-container">
              <BlogPortableText value={body} />

              {tags.length > 0 && (
                <div className="blog-tag-list blog-post__tags">
                  {tags.map((tag) => (
                    <Badge key={tag} asChild variant="pill" className="blog-tag">
                      <Link href={`/${locale}/blog/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>
                    </Badge>
                  ))}
                </div>
              )}
            </article>

            <aside className="blog-post__share" aria-label="Share">
              <span>Share</span>
              <div className="blog-post__share-icons">
                {[
                  {
                    name: 'LinkedIn',
                    href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}`,
                    icon: Linkedin,
                  },
                  {
                    name: 'X',
                    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`,
                    icon: XIcon,
                  },
                  {
                    name: 'Facebook',
                    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
                    icon: Facebook,
                  },
                  {
                    name: 'WhatsApp',
                    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${articleUrl}`)}`,
                    icon: WhatsAppIcon,
                  },
                  {
                    name: 'Email',
                    href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(articleUrl)}`,
                    icon: Mail,
                  },
                ].map(({name, href, icon: Icon}) => (
                  <Link
                    key={name}
                    href={href}
                    target={name === 'Email' ? undefined : '_blank'}
                    rel={name === 'Email' ? undefined : 'noreferrer noopener'}
                    aria-label={`Share on ${name}`}
                    title={`Share on ${name}`}
                    className="blog-post__share-icon"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </aside>
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
