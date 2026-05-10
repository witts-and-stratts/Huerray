'use client';

import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@/styles/creators-scroller.css';
import '@splidejs/react-splide/css';
import { cn } from '@/lib/utils';

const creators: Array<[ string, [ string, string ]?]> = [
  [ '/images/creators/optimized/creator-10.webp' ],
  [ '/images/creators/optimized/creator-11.webp' ],
  [ '/images/creators/optimized/creator-12.webp' ],
  [ '/images/creators/optimized/creator-13.webp' ],
  [ '/images/creators/optimized/creator-14.webp' ],
  [ '/images/creators/optimized/creator-15.webp' ],
  [ '/images/creators/optimized/creator-16.webp' ],
  [
    '/images/creators/optimized/creator-17.webp',
    [ 'arrow-fashion.svg', 'bottom-right' ],
  ],
  [
    '/images/creators/optimized/creator-18.webp',
    [ 'arrow-health-and-wellness.svg', 'top-right' ],
  ],
  [ '/images/creators/optimized/creator-19.webp' ],
];

interface CreatorsScrollerProps {
  perPageMobile?: number;
  perPageTablet?: number;
  perPageDesktop?: number;
}

export function CreatorsScroller( {
  perPageMobile = 2.5,
  perPageTablet = 3.5,
  perPageDesktop = 4.5,
}: CreatorsScrollerProps ) {
  return (
    <section className='creators-scroller'>
      <Splide
        options={ {
          type: 'loop',
          drag: 'free',
          focus: 'center',
          perPage: perPageMobile,
          perMove: 1,
          gap: '1.5rem',
          pagination: false,
          arrows: false,
          pauseOnHover: false,
          pauseOnFocus: false,
          mediaQuery: 'min',
          autoScroll: {
            speed: 2,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          breakpoints: {
            768: {
              perPage: perPageTablet,
              gap: '2.5rem',
            },
            1024: {
              perPage: perPageDesktop,
              gap: '3.5rem',
            },
            1280: {
              perPage: perPageDesktop,
              gap: '4rem',
            },
          },
        } }
        extensions={ { AutoScroll } }
      >
        { creators.map( ( image, index ) => {
          const [ imgSrc, deco ] = image;
          return (
            <SplideSlide key={ index }>
              <div className='creators-scroller__avatar'>
                <Image
                  src={ imgSrc }
                  alt='Creator'
                  width={ 280 }
                  height={ 315 }
                  className='creators-scroller__image'
                />
                { deco && (
                  <Image
                    src={ `/images/${ deco[ 0 ] }` }
                    alt='Decoration'
                    width={ 180 }
                    height={ 180 }
                    className={ cn(
                      'creators-scroller__avatar-decoration',
                      deco[ 1 ]
                    ) }
                  />
                ) }
              </div>
            </SplideSlide>
          );
        } ) }
      </Splide>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='0'
        height='0'
        className='absolute'
      >
        <defs>
          <clipPath id='rounded-clip' clipPathUnits='objectBoundingBox'>
            <rect width='1' height='1' rx='0.4587' ry='0.3743' />
          </clipPath>
          <clipPath id='square-rounded-clip' clipPathUnits='objectBoundingBox'>
            <path d='M0 0.2723 C0 0.1219 0.1052 0 0.2348 0 H0.7651 C0.8947 0 1 0.1219 1 0.2723 V0.7277 C1 0.8781 0.8947 1 0.7651 1 H0.2348 C0.1052 1 0 0.8781 0 0.7277 V0.2723 Z' />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
