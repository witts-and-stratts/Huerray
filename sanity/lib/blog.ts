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
    tags,
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
    tags,
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
      tags,
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
    "automaticRelatedPosts": *[
      _type == "blog" &&
      defined(slug.current) &&
      status == "published" &&
      _id != ^._id &&
      count(categories[]._ref[@ in ^.categories[]._ref]) > 0
    ] | order(coalesce(publishedAt, _createdAt) desc)[0...6] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTimeMinutes,
      mainImage,
      tags,
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
    "latestRelatedPosts": *[
      _type == "blog" &&
      defined(slug.current) &&
      status == "published" &&
      _id != ^._id
    ] | order(coalesce(publishedAt, _createdAt) desc)[0...6] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTimeMinutes,
      mainImage,
      tags,
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

export const BLOG_TAG_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && status == "published" && $tag in tags[]]
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
    tags,
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

export const BLOG_TAGS_QUERY = defineQuery(/* groq */ `
  array::unique(*[_type == "blog" && defined(slug.current) && status == "published" && defined(tags)].tags[])
`)

export const BLOG_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && status == "published" && $category in categories[]->slug.current]
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
    tags,
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

export const BLOG_CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "category" &&
    defined(slug.current) &&
    count(*[_type == "blog" && status == "published" && defined(slug.current) && references(^._id)]) > 0
  ] | order(title.en asc) {
    _id,
    title,
    slug,
    description,
    "count": count(*[_type == "blog" && status == "published" && defined(slug.current) && references(^._id)])
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

export type BlogCategoryListItem = BlogCategory & {
  description?: LocalizedString
  count?: number
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
  tags?: string[]
  author?: BlogAuthor
  categories?: BlogCategory[]
}

export type BlogPost = BlogSummary & {
  body?: Record<string, unknown>
  updatedAt?: string
  relatedPosts?: BlogSummary[]
  automaticRelatedPosts?: BlogSummary[]
  latestRelatedPosts?: BlogSummary[]
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
