'use client'

import {useMemo, useState} from 'react'

import {BlogCard} from '@/components/blog/BlogCard'
import {Button} from '@/components/ui/button'
import type {BlogSummary} from '@/sanity/lib/blog'

type BlogMoreListProps = {
  posts: BlogSummary[]
  locale: string
  byLabel: string
  readTimeLabel: string
  initialCount?: number
  increment?: number
}

export function BlogMoreList({
  posts,
  locale,
  byLabel,
  readTimeLabel,
  initialCount = 9,
  increment = 9,
}: BlogMoreListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount])
  const hasMore = visibleCount < posts.length

  if (posts.length === 0) return null

  return (
    <>
      <div className="blog-list">
        {visiblePosts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            locale={locale}
            byLabel={byLabel}
            readTimeLabel={readTimeLabel}
          />
        ))}
      </div>

      {hasMore && (
        <div className="blog-list__more">
          <Button
            type="button"
            variant="hero"
            size="xl"
            onClick={() => setVisibleCount((count) => Math.min(count + increment, posts.length))}
          >
            See more
          </Button>
        </div>
      )}
    </>
  )
}
