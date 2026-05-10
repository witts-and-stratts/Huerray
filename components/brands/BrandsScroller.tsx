'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@/styles/creators-scroller.css';
import '@splidejs/react-splide/css';
import { cn } from '@/lib/utils';

const creators: Array<[ string, [ string, string ]?]> = [
  [ '/images/creators/expressive-young-girl-posing-indoor.webp' ],
  [ '/images/creators/medium-shot-woman-with-tasty-kombucha.webp' ],
  [
    '/images/creators/front-view-male-courier-yellow-uniform-cape-with-round-delivery-bowl-his-hands-light-pink-background.webp',
  ],
  [ '/images/creators/best-friends-couple-stylish-girls-posing-white.webp' ],
  [ '/images/creators/woman-training-outdoors.webp' ],
  [ '/images/creators/making-presentation-new-facial-cream.webp' ],
  [ '/images/creators/man-applying-anti-aging-treatment.webp' ],
  [ '/images/creators/side-view-smiley-women-with-smartphone.webp' ],
  [ '/images/creators/smiling-young-couple-looking-into-cardboard-box.webp' ],
];

export function BrandsScroller() {
  const t = useTranslations( 'brands.scroller' );

  return (
    <div className='py-16 bg-white'>
      <h4 className='text-h4 text-center mb-8 gradient-text font-heading max-w-150 mx-auto'>
        { t( 'title' ) }
      </h4>
      <section className='creators-scroller -my-16'>
        <Splide
          options={ {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 2.5,
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
                perPage: 3.5,
                gap: '2.5rem',
              },
              1024: {
                perPage: 4.5,
                gap: '3.5rem',
              },
              1280: {
                perPage: 4.5,
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
    </div>
  );
}
