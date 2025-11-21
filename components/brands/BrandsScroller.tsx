'use client';

import Image from 'next/image';
// @ts-expect-error - Types are not properly exported in package.json
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import { cn } from '@/lib/utils';

const creators: Array<[ string, [ string, string ]?]> = [
  [ '/images/creators/expressive-young-girl-posing-indoor.jpg' ],
  [ '/images/creators/medium-shot-woman-with-tasty-kombucha.jpg' ],
  [
    '/images/creators/front-view-male-courier-yellow-uniform-cape-with-round-delivery-bowl-his-hands-light-pink-background.jpg',
  ],
  [ '/images/creators/best-friends-couple-stylish-girls-posing-white.jpg' ],
  [ '/images/creators/woman-training-outdoors.jpg' ],
  [ '/images/creators/making-presentation-new-facial-cream.jpg' ],
  [ '/images/creators/man-applying-anti-aging-treatment.jpg' ],
  [ '/images/creators/side-view-smiley-women-with-smartphone.jpg' ],
  [ '/images/creators/smiling-young-couple-looking-into-cardboard-box.jpg' ],
];

export function BrandsScroller() {
  return (
    <div className='py-16 bg-white'>
      <h4 className='text-h4 text-center mb-8 gradient-text font-heading max-w-150 mx-auto'>
        Match with experienced creators
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
      </section>
    </div>
  );
}
