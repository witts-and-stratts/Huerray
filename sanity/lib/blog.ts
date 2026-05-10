import {defineQuery} from 'next-sanity'

export const BLOG_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && status == "published"]
  | order(featured desc, coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    updatedAt,
    featured,
    readingTimeMinutes,
    mainImage,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }
`)

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    updatedAt,
    featured,
    readingTimeMinutes,
    mainImage,
    author->{
      _id,
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title,
      slug
    },
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTimeMinutes,
      mainImage,
      author->{
        _id,
        name,
        image
      },
      categories[]->{
        _id,
        title,
        slug
      }
    },
    seoTitle,
    seoDescription,
    openGraphImage,
    canonicalUrl,
    noIndex
  }
`)

export const BLOG_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && status == "published"]{
    "slug": slug.current
  }
`)

export type LocalizedString = Record<string, string | undefined>

export type BlogCategory = {
  _id: string
  title?: LocalizedString
  slug?: {
    current?: string
  }
}

export type BlogAuthor = {
  _id: string
  name?: string
  image?: unknown
  bio?: Record<string, unknown>
}

export type BlogSummary = {
  _id: string
  title?: LocalizedString
  slug?: {
    current?: string
  }
  excerpt?: LocalizedString
  publishedAt?: string
  updatedAt?: string
  featured?: boolean
  readingTimeMinutes?: number
  mainImage?: unknown
  author?: BlogAuthor
  categories?: BlogCategory[]
}

export type BlogPost = BlogSummary & {
  body?: Record<string, unknown>
  updatedAt?: string
  relatedPosts?: BlogSummary[]
  seoTitle?: LocalizedString
  seoDescription?: LocalizedString
  openGraphImage?: unknown
  canonicalUrl?: string
  noIndex?: boolean
}

export type BlogSlugParam = {
  slug?: string
}

export function getLocalizedValue<T>(
  value: Record<string, T | undefined> | undefined,
  locale: string,
  fallback?: T,
): T | undefined {
  if (!value) return fallback
  return value[locale] ?? value.en ?? Object.values(value).find((item) => item !== undefined) ?? fallback
}
