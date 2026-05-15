'use client'

import {useCallback, useEffect, useRef, useState} from 'react'

import {BlogCard} from '@/components/blog/BlogCard'
import {cn} from '@/lib/utils'
import type {BlogSummary} from '@/sanity/lib/blog'

type BlogFeaturedCarouselProps = {
  posts: BlogSummary[]
  locale: string
  byLabel: string
  readTimeLabel: string
}

export function BlogFeaturedCarousel({
  posts,
  locale,
  byLabel,
  readTimeLabel,
}: BlogFeaturedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(index, posts.length - 1))
      const slide = track.children[clamped] as HTMLElement | undefined
      if (slide) {
        track.scrollTo({left: slide.offsetLeft, behavior: 'smooth'})
      }
    },
    [posts.length],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handleScroll = () => {
      setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
    }
    track.addEventListener('scroll', handleScroll, {passive: true})
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  if (posts.length === 0) return null
  if (posts.length === 1) {
    return (
      <BlogCard
        post={posts[0]}
        locale={locale}
        featured
        byLabel={byLabel}
        readTimeLabel={readTimeLabel}
      />
    )
  }

  return (
    <div className="blog-carousel">
      <div className="blog-carousel__track" ref={trackRef}>
        {posts.map((post) => (
          <div className="blog-carousel__slide" key={post._id}>
            <BlogCard
              post={post}
              locale={locale}
              featured
              byLabel={byLabel}
              readTimeLabel={readTimeLabel}
            />
          </div>
        ))}
      </div>

      <div className="blog-carousel__controls">
        <button
          type="button"
          className="blog-carousel__arrow"
          aria-label="Previous featured article"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="blog-carousel__dots" role="tablist" aria-label="Featured articles">
          {posts.map((post, index) => (
            <button
              key={post._id}
              type="button"
              role="tab"
              className={cn(
                'blog-carousel__dot',
                index === activeIndex && 'blog-carousel__dot--active',
              )}
              aria-label={`Go to featured article ${index + 1}`}
              aria-selected={index === activeIndex}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="blog-carousel__arrow"
          aria-label="Next featured article"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === posts.length - 1}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
