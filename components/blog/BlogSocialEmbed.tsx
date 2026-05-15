'use client'

import {EarthGlobeIcon, LinkIcon} from '@sanity/icons'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

type BlogSocialEmbedValue = {
  platform?: string
  url?: string
  caption?: string
}

const PLATFORM_LABELS: Record<string, string> = {
  x: 'X / Twitter',
  twitter: 'X / Twitter',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  threads: 'Threads',
}

function getTweetId(url: string) {
  return url.match(/\/status(?:es)?\/(\d+)/)?.[1] ?? null
}

function getInstagramPath(url: string) {
  const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return match ? `${match[1]}/${match[2]}` : null
}

function getTikTokId(url: string) {
  return url.match(/\/(?:video|photo)\/(\d+)/)?.[1] ?? null
}

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') return parsed.pathname.replace(/^\/+/, '') || null
    if (host.includes('youtube')) {
      return parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop() || null
    }
  } catch {
    return null
  }

  return null
}

// Platform embed iframes post their rendered height to the parent window in a
// few different shapes — pull a numeric height out of whichever one arrives.
function extractIframeHeight(data: unknown): number | null {
  let parsed: any = data

  if (typeof data === 'string') {
    try {
      parsed = JSON.parse(data)
    } catch {
      return null
    }
  }

  if (!parsed || typeof parsed !== 'object') return null

  // X / Twitter
  const twitter = parsed['twttr.embed']
  if (twitter?.method === 'twttr.private.resize') {
    const height = twitter.params?.[0]?.data?.height ?? twitter.params?.[0]?.height
    if (typeof height === 'number') return height
  }

  // Instagram
  if (parsed.type === 'MEASURE' && typeof parsed.details?.height === 'number') {
    return parsed.details.height
  }

  // TikTok and other generic { height } messages
  if (typeof parsed.height === 'number') return parsed.height

  return null
}

function ResizableIframe({
  src,
  title,
  minHeight,
  maxWidth,
}: {
  src: string
  title: string
  minHeight: number
  maxWidth: number
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(minHeight)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only react to messages from this specific iframe's window.
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return

      const reported = extractIframeHeight(event.data)
      if (reported && reported > 50) setHeight(reported)
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="blog-rich-text__social-embed">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="blog-rich-text__social-iframe"
        style={{height, maxWidth}}
      />
    </div>
  )
}

function YouTubeEmbed({videoId}: {videoId: string}) {
  return (
    <div className="blog-rich-text__video-shell">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="blog-rich-text__video"
      />
    </div>
  )
}

function SocialLinkCard({platform, url}: {platform: string; url: string}) {
  return (
    <div className="blog-rich-text__social-card">
      <div className="blog-rich-text__social-header">
        <Badge variant="pill" className="blog-rich-text__badge">
          <EarthGlobeIcon className="size-4" />
          {PLATFORM_LABELS[platform] || 'Social post'}
        </Badge>
      </div>
      <Button asChild variant="outline" className="blog-rich-text__social-button">
        <Link href={url} target="_blank" rel="noreferrer noopener">
          Open post
          <LinkIcon className="size-4" />
        </Link>
      </Button>
    </div>
  )
}

function renderSocialEmbed(platform: string, url: string) {
  switch (platform) {
    case 'x':
    case 'twitter': {
      const id = getTweetId(url)
      if (!id) return null
      return (
        <ResizableIframe
          src={`https://platform.twitter.com/embed/Tweet.html?id=${id}&dnt=true&theme=light`}
          title="X post"
          minHeight={300}
          maxWidth={550}
        />
      )
    }
    case 'instagram': {
      const path = getInstagramPath(url)
      if (!path) return null
      return (
        <ResizableIframe
          src={`https://www.instagram.com/${path}/embed/`}
          title="Instagram post"
          minHeight={500}
          maxWidth={540}
        />
      )
    }
    case 'tiktok': {
      const id = getTikTokId(url)
      if (!id) return null
      return (
        <ResizableIframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          title="TikTok video"
          minHeight={600}
          maxWidth={605}
        />
      )
    }
    case 'youtube': {
      const id = getYouTubeId(url)
      if (!id) return null
      return <YouTubeEmbed videoId={id} />
    }
    case 'facebook':
      return (
        <ResizableIframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`}
          title="Facebook post"
          minHeight={500}
          maxWidth={500}
        />
      )
    case 'linkedin':
      // LinkedIn only renders inline when an /embed/ URL is supplied.
      return url.includes('/embed/') ? (
        <ResizableIframe src={url} title="LinkedIn post" minHeight={400} maxWidth={550} />
      ) : null
    default:
      return null
  }
}

export function BlogSocialEmbed({value}: {value?: BlogSocialEmbedValue}) {
  if (!value?.url) return null

  const platform = (value.platform || '').toLowerCase()
  const embed = renderSocialEmbed(platform, value.url)

  return (
    <figure className="blog-rich-text__embed">
      {embed ?? <SocialLinkCard platform={platform} url={value.url} />}
      {value.caption && <figcaption className="blog-rich-text__caption">{value.caption}</figcaption>}
    </figure>
  )
}
