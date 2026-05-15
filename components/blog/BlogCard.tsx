import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/format';
import { getLocalizedValue, type BlogSummary } from '@/sanity/lib/blog';
import { urlFor } from '@/sanity/lib/image';

type BlogCardProps = {
  post: BlogSummary;
  locale: string;
  latest?: boolean;
  featured?: boolean;
  byLabel?: string;
  readTimeLabel?: string;
};

export function BlogCard({
  post,
  locale,
  latest = false,
  featured = false,
  byLabel = 'By',
  readTimeLabel = 'min read',
}: BlogCardProps) {
  const slug = post.slug?.current;
  const href = slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;
  const title = getLocalizedValue<string>(post.title, locale, 'Untitled');
  const excerpt = getLocalizedValue<string>(post.excerpt, locale, '');
  const image = post.mainImage
    ? urlFor(post.mainImage as any)
        .width(featured ? 1600 : 1200)
        .height(featured ? 900 : 750)
        .fit('crop')
        .url()
    : null;
  const categoryEntries = (post.categories ?? [])
    .map((category) => ({
      id: category._id,
      label: getLocalizedValue<string>(category.title, locale),
      slug: category.slug?.current,
    }))
    .filter(
      (entry): entry is { id: string; label: string; slug: string | undefined } =>
        Boolean(entry.label),
    )
    .slice(0, featured ? 3 : 2);

  const Meta = () => (
    <>
      {categoryEntries.length > 0 && (
        <div className='blog-card__tags'>
          {categoryEntries.map((entry) =>
            entry.slug ? (
              <Badge
                key={entry.id}
                asChild
                variant='pill'
                className='blog-card__tag'
              >
                <Link
                  href={`/${locale}/blog/categories/${encodeURIComponent(entry.slug)}`}
                >
                  {entry.label}
                </Link>
              </Badge>
            ) : (
              <Badge
                key={entry.id}
                variant='pill'
                className='blog-card__tag'
              >
                {entry.label}
              </Badge>
            ),
          )}
        </div>
      )}

      <div className='blog-card__meta'>
        {post.publishedAt && (
          <span>{formatDate(post.publishedAt, locale)}</span>
        )}
        {post.readingTimeMinutes ? (
          <span>
            {post.readingTimeMinutes} {readTimeLabel}
          </span>
        ) : null}
        {post.author?.name && (
          <span>
            {byLabel} {post.author.name}
          </span>
        )}
      </div>
    </>
  );

  return (
    <article
      className={cn('blog-card group', featured && 'blog-card--featured')}
    >
      <Link
        href={href}
        className={cn(
          'blog-card__image',
          featured && 'blog-card__image--featured',
        )}
        aria-label={title}
      >
        {image ? (
          <Image
            src={image}
            alt={title || 'Blog article image'}
            width={featured ? 1600 : 1200}
            height={featured ? 900 : 750}
            className='blog-card__image-element'
          />
        ) : (
          <div className='blog-card__image-fallback'>
            <span>Huerray</span>
          </div>
        )}
      </Link>

      <div className='blog-card__body'>
        { featured || latest && <Meta /> }
        <h3
          className={cn(
            'blog-card__title group-hover:text-dark-burgundy',
            featured && 'text-h3',
          )}
        >
          <Link href={href}>{title}</Link>
        </h3>

        {excerpt && <p className='blog-card__excerpt'>{excerpt}</p>}

        <div className='mt-4 grid gap-2'>
          { !(featured || latest) && <Meta /> }
        </div>
      </div>
    </article>
  );
}
