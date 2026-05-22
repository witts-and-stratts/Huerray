import {CodeIcon, PlayIcon} from '@sanity/icons'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import type {ReactNode} from 'react'

import {BlogSocialEmbed} from '@/components/blog/BlogSocialEmbed'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {urlFor} from '@/sanity/lib/image'

type BlogPortableTextProps = {
  value?: unknown
}

export type PortableTextHeading = {
  id: string
  text: string
}

export function getPortableTextPlainText(value: any): string {
  if (!value?._type || value._type !== 'block' || !Array.isArray(value.children)) {
    return ''
  }

  return value.children
    .map((child: {text?: string}) => child.text ?? '')
    .join('')
    .trim()
}

export function getPortableTextHeadingId(value: any): string {
  const text = getPortableTextPlainText(value)

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function getPortableTextHeadings(value?: unknown): PortableTextHeading[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((block) => block?._type === 'block' && block?.style === 'h2')
    .map((block) => ({
      id: getPortableTextHeadingId(block),
      text: getPortableTextPlainText(block),
    }))
    .filter((heading) => heading.id && heading.text)
}

function getVideoEmbedUrl(rawUrl?: string) {
  if (!rawUrl) return null

  try {
    const parsed = new URL(rawUrl)
    const host = parsed.hostname.replace(/^www\./, '')
    const pathname = parsed.pathname.replace(/^\/+/, '')

    if (host.includes('youtu.be')) {
      return `https://www.youtube-nocookie.com/embed/${pathname}`
    }

    if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
      const id = parsed.searchParams.get('v') || pathname.split('/').pop()
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }

    if (host.includes('vimeo.com')) {
      const id = pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    return null
  }

  return null
}

function PortableTextImage({value}: {value?: any}) {
  if (!value?.asset) return null

  const src = urlFor(value).width(1600).height(1100).fit('crop').url()

  return (
    <figure className="blog-rich-text__figure">
      <Image
        src={src}
        alt={value.alt || ''}
        width={1600}
        height={1100}
        className="blog-rich-text__image"
      />
      {(value.caption || value.credit) && (
        <figcaption className="blog-rich-text__caption">
          {value.caption && <span>{value.caption}</span>}
          {value.credit && <span>{value.caption ? ' ' : ''}Credit: {value.credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}

function BlogVideoEmbed({value}: {value?: {title?: string; url?: string; caption?: string}}) {
  const embedUrl = getVideoEmbedUrl(value?.url)

  if (!value?.url) return null

  return (
    <figure className="blog-rich-text__embed">
      {embedUrl ? (
        <div className="blog-rich-text__video-shell">
          <iframe
            src={embedUrl}
            title={value.title || value.caption || 'Video embed'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="blog-rich-text__video"
          />
        </div>
      ) : (
        <Link
          href={value.url}
          target="_blank"
          rel="noreferrer noopener"
          className="blog-rich-text__link-card"
        >
          <PlayIcon className="blog-rich-text__link-icon" />
          <span>
            <strong className="block text-primary font-primary">{value.title || 'Watch video'}</strong>
            <span className="block text-sm text-slate-600 break-all">{value.url}</span>
          </span>
        </Link>
      )}
      {value.caption && <figcaption className="blog-rich-text__caption">{value.caption}</figcaption>}
    </figure>
  )
}

function BlogCallout({value}: {value?: {tone?: string; title?: string; message?: string}}) {
  if (!value?.message) return null

  return (
    <aside
      className={cn(
        'blog-rich-text__callout',
        value.tone === 'success' && 'blog-rich-text__callout--success',
        value.tone === 'warning' && 'blog-rich-text__callout--warning',
        value.tone === 'danger' && 'blog-rich-text__callout--danger',
      )}
    >
      {value.title && <strong className="block font-primary text-lg mb-1">{value.title}</strong>}
      <p className="m-0 leading-7">{value.message}</p>
    </aside>
  )
}

function BlogCta({value}: {value?: {label?: string; href?: string; description?: string; style?: string}}) {
  if (!value?.label || !value?.href) return null

  return (
    <aside className="blog-rich-text__cta">
      <div>
        <strong className="block font-primary text-h5 text-primary">{value.label}</strong>
        {value.description && <p className="mt-2 mb-0 text-slate-700">{value.description}</p>}
      </div>
      <Button asChild variant={value.style === 'secondary' ? 'outline' : 'heroAlt'} size="lg">
        <Link href={value.href} target="_blank" rel="noreferrer noopener">
          {value.label}
        </Link>
      </Button>
    </aside>
  )
}

function BlogCodeBlock({value}: {value?: {language?: string; filename?: string; code?: string}}) {
  if (!value?.code) return null

  return (
    <figure className="blog-rich-text__code">
      <div className="blog-rich-text__code-header">
        <span className="blog-rich-text__code-language">
          <CodeIcon className="size-4" />
          {value.language || 'code'}
        </span>
        {value.filename && <span className="blog-rich-text__code-filename">{value.filename}</span>}
      </div>
      <pre className="blog-rich-text__pre">
        <code>{value.code}</code>
      </pre>
    </figure>
  )
}

function BlogSeparator() {
  return <hr className="blog-rich-text__separator" />
}

const blogPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="blog-rich-text__paragraph">{children}</p>,
    h2: ({children, value}) => (
      <h2 id={getPortableTextHeadingId(value)} className="blog-rich-text__heading blog-rich-text__heading--2">
        {children}
      </h2>
    ),
    h3: ({children, value}) => (
      <h3 id={getPortableTextHeadingId(value)} className="blog-rich-text__heading blog-rich-text__heading--3">
        {children}
      </h3>
    ),
    h4: ({children}) => <h4 className="blog-rich-text__heading blog-rich-text__heading--4">{children}</h4>,
    h5: ({children}) => <h5 className="blog-rich-text__heading blog-rich-text__heading--5">{children}</h5>,
    blockquote: ({children}) => <blockquote className="blog-rich-text__blockquote">{children}</blockquote>,
  },
  marks: {
    link: ({children, value}: {children: ReactNode; value?: {href?: string; blank?: boolean}}) => {
      if (!value?.href) return <>{children}</>

      const isExternal = /^https?:\/\//.test(value.href)
      const target = value.blank || isExternal ? '_blank' : undefined
      const rel = target ? 'noreferrer noopener' : undefined

      return (
        <a href={value.href} target={target} rel={rel} className="blog-rich-text__link">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({children}) => <ul className="blog-rich-text__list blog-rich-text__list--bullet">{children}</ul>,
    number: ({children}) => <ol className="blog-rich-text__list blog-rich-text__list--number">{children}</ol>,
  },
  types: {
    image: PortableTextImage,
    blogVideoEmbed: BlogVideoEmbed,
    blogSocialEmbed: ({value}) => <BlogSocialEmbed value={value} />,
    blogCallout: BlogCallout,
    blogCta: BlogCta,
    blogCodeBlock: BlogCodeBlock,
    blogSeparator: BlogSeparator,
  },
}

export function BlogPortableText({value}: BlogPortableTextProps) {
  if (!value) return null

  return (
    <div className="blog-rich-text">
      <PortableText value={value as any} components={blogPortableTextComponents} />
    </div>
  )
}
