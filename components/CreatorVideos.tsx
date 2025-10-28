'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const videos = [
  {
    webm: '/videos/creator-video-1.webm',
    mp4: '/videos/creator-video-1.mp4',
  },
  {
    webm: '/videos/creator-video-2.webm',
    mp4: '/videos/creator-video-2-compressed.mp4',
  },
  {
    webm: '/videos/creator-video-3.webm',
    mp4: '/videos/creator-video-3-compressed.mp4',
  },
  {
    webm: '/videos/creator-video-4.webm',
    mp4: '/videos/creator-video-4-compressed.mp4',
  },
  {
    webm: '/videos/creator-video-5.webm',
    mp4: '/videos/creator-video-5-compressed.mp4',
  },
];

export function CreatorVideos() {
  const t = useTranslations('home.creatorVideos');
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      requestAnimationFrame(() => {
        // Stagger video playback to reduce load
        videoRefs.current.forEach((video, index) => {
          if (video) {
            setTimeout(() => {
              requestAnimationFrame(() => {
                video.play().catch(() => {
                  // Ignore play errors
                });
              });
            }, index * 50);
          }
        });
      });
    } else {
      requestAnimationFrame(() => {
        videoRefs.current.forEach((video) => {
          if (video) {
            video.pause();
          }
        });
      });
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className='creator-videos'>
      <h2 className='creator-videos__title gradient-text'>
        {t('title')}
      </h2>

      {/* Horizontal Infinite Scroller */}
      <div className='creator-videos__scroller'>
        <div className='creator-videos__track animate-scroll-horizontal'>
          {/* Duplicate the videos 3 times for seamless loop */}
          {Array(3)
            .fill(videos)
            .flat()
            .map((video, index) => (
              <div key={`creator-${index}`} className='creator-videos__card'>
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  loop
                  muted
                  playsInline
                  preload='auto'
                  className='creator-videos__video'
                >
                  <source src={video.webm} type='video/webm' />
                  <source src={video.mp4} type='video/mp4' />
                </video>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
