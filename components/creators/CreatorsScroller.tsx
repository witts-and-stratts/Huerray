'use client';

import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import { cn } from '@/lib/utils';

export function CreatorsScroller() {
  const creators = [
    ['/images/creators/optimized/creator-10.jpg'],
    ['/images/creators/optimized/creator-11.jpg'],
    ['/images/creators/optimized/creator-12.jpg'],
    ['/images/creators/optimized/creator-13.jpg'],
    ['/images/creators/optimized/creator-14.jpg'],
    ['/images/creators/optimized/creator-15.jpg'],
    ['/images/creators/optimized/creator-16.jpg'],
    [
      '/images/creators/optimized/creator-17.jpg',
      ['arrow-fashion.svg', 'bottom-right'],
    ],
    [
      '/images/creators/optimized/creator-18.jpg',
      ['arrow-health-and-wellness.svg', 'top-right'],
    ],
    ['/images/creators/optimized/creator-19.jpg'],
  ];

  return (
    <section className='creators-scroller'>
      <Splide
        options={{
          type: 'loop',
          drag: 'free',
          focus: 'center',
          perPage: 4.5,
          perMove: 1,
          gap: '4rem',
          pagination: false,
          arrows: false,
          pauseOnHover: false,
          pauseOnFocus: false,
          autoScroll: {
            speed: 2,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          breakpoints: {
            768: {
              perPage: 2,
              gap: '2.5rem',
            },
            1024: {
              perPage: 3.5,
              gap: '3.5rem',
            },
            1280: {
              perPage: 3.5,
              gap: '4rem',
            },
          },
        }}
        extensions={{ AutoScroll }}
      >
        {creators.map((image, index) => (
          <SplideSlide key={index}>
            <div className='creators-scroller__avatar'>
              <Image
                src={image[0]}
                alt='Creator'
                width={280}
                height={315}
                className='creators-scroller__image'
              />
              {image[1] && (
                <Image
                  src={`/images/${image[1][0]}`}
                  alt='Decoration'
                  width={180}
                  height={180}
                  className={cn(
                    'creators-scroller__avatar-decoration',
                    image[1][1]
                  )}
                />
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
