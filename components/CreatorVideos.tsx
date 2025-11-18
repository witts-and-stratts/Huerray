'use client';

// @ts-expect-error - package "exports" prevents TypeScript from resolving bundled types; this silences the missing declaration-file error
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';

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
      // Play all videos when section is in view
      videoRefs.current.forEach((video, index) => {
        if (video) {
          setTimeout(() => {
            video.play().catch(() => {
              // Ignore play errors
            });
          }, index * 50);
        }
      });
    } else {
      // Pause all videos when section is out of view
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className='creator-videos'>
      <h2 className='creator-videos__title gradient-text'>{t('title')}</h2>

      <div className='creator-videos__scroller'>
        <Splide
          options={{
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 5.5,
            perMove: 5.5,
            gap: '1rem',
            pagination: false,
            arrows: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            autoScroll: {
              speed: 1,
              pauseOnHover: false,
              pauseOnFocus: false,
            },
            breakpoints: {
              768: {
                perPage: 1.5,
                gap: '1.5rem',
              },
              1024: {
                perPage: 3.5,
                perMove: 3.5,
                gap: '2.5rem',
              },
              1280: {
                perPage: 4.5,
                perMove: 4.5,
                gap: '3rem',
              },
            },
          }}
          extensions={{ AutoScroll }}
        >
          {videos.map((video, index) => (
            <SplideSlide key={index}>
              <div className='creator-videos__card'>
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  loop
                  muted
                  playsInline
                  className='creator-videos__video'
                >
                  {
                    <>
                      <source src={video.webm} type='video/webm' />
                      <source src={video.mp4} type='video/mp4' />
                    </>
                  }
                </video>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
