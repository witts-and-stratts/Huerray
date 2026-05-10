import Image from 'next/image'
import Link from 'next/link'

import {Badge} from '@/components/ui/badge'
import {cn} from '@/lib/utils'
import {formatDate} from '@/lib/utils/format'
import {getLocalizedValue, type BlogSummary} from '@/sanity/lib/blog'
import {urlFor} from '@/sanity/lib/image'

type BlogCardProps = {
  post: BlogSummary
  locale: string
  featured?: boolean
  byLabel?: string
  readTimeLabel?: string
}

export function BlogCard({post, locale, featured = false, byLabel = 'By', readTimeLabel = 'min read'}: BlogCardProps) {
  const slug = post.slug?.current
  const title = getLocalizedValue<string>(post.title, locale, 'Untitled')
  const excerpt = getLocalizedValue<string>(post.excerpt, locale, '')
  const image = post.mainImage ? urlFor(post.mainImage as any).width(featured ? 1600 : 1200).height(featured ? 900 : 750).fit('crop').url() : null
  const categoryLabels = (post.categories ?? [])
    .map((category) => getLocalizedValue<string>(category.title, locale))
    .filter(Boolean)
    .slice(0, featured ? 3 : 2) as string[]

  return (
    <Link
      href={slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`}
      className={cn('blog-card group', featured && 'blog-card--featured')}
    >
      {image && (
        <div className={cn('blog-card__image', featured && 'blog-card__image--featured')}>
          <Image
            src={image}
            alt={title || 'Blog article image'}
            width={featured ? 1600 : 1200}
            height={featured ? 900 : 750}
            className="blog-card__image-element"
          />
        </div>
      )}

      <div className="blog-card__body">
        <div className="blog-card__meta">
          {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
          {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} {readTimeLabel}</span> : null}
          {post.author?.name && <span>{byLabel} {post.author.name}</span>}
        </div>

        <h3 className={cn('blog-card__title group-hover:text-dark-burgundy', featured && 'text-h3')}>
          {title}
        </h3>

        {excerpt && <p className="blog-card__excerpt">{excerpt}</p>}

        {categoryLabels.length > 0 && (
          <div className="blog-card__tags">
            {categoryLabels.map((label) => (
              <Badge key={label} variant="pill" className="blog-card__tag">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
