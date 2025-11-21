'use client';

import Image from 'next/image';
import { TextListItem } from '../ui/TextListItem';
import { TextList } from '../ui/TextList';

const paymentCards = [
  {
    avatar: '/images/brands/16928458b125e91694f633476f7fd34ef6d8cefe.png',
    hasCheckbox: true,
    barLong: 190,
    barShort: 116,
  },
  {
    avatar: '/images/brands/9e691e42275fd5176b1832d6fab1d491d033637c.png',
    hasCheckbox: false,
    barLong: 223,
    barShort: 136,
  },
  {
    avatar: '/images/brands/a1c258df38ed638345ae594b3548de0ec22be9ef.png',
    hasCheckbox: true,
    barLong: 190,
    barShort: 116,
  },
];

export function BrandsMatch() {
  return (
    <section className='section-card section-card--light section-card--spaced'>
      <div className='section-card__container'>
        {/* Left Content */ }
        <div className='section-card__content'>

          <span className='section-card__pill'>Matching</span>

          <h2 className='section-card__title gradient-text'>
            Match with the right creators for your brand
          </h2>

          <p className='section-card__description'>
            Our matching process means 92% of creator matches are approved in
            the first round.
          </p>

          <TextList list={ [ 'Fully opted-in and verified network of creators', 'A large network of diverse creators from underrepresented communities and niche categories' ] } />
        </div>

        {/* Right Image with Cards */ }
        <div className='section-card__image'>
          <Image
            src='/images/brands/7d276a19cd69b3c1a8c1f90f9d7393131ea00d7e.png'
            alt='Creator'
            width={ 545 }
            height={ 634 }
            className='aspect-4/5! object-cover w-full h-full rounded-[128px]'
          />

          {/* Payment Cards */ }
          <div className='brands-match__cards'>
            { paymentCards.map( ( card, index ) => (
              <div key={ index } className='brands-match__card'>
                <div className='brands-match__card-avatar'>
                  <Image
                    src={ card.avatar }
                    alt='Creator avatar'
                    width={ 74 }
                    height={ 74 }
                  />
                </div>
                <div className='brands-match__card-content'>
                  <div className='brands-match__card-title'>
                    Payment made
                    { card.hasCheckbox && (
                      <span className='brands-match__card-checkbox'>
                        <svg
                          width='8'
                          height='6'
                          viewBox='0 0 8 6'
                          fill='none'
                        >
                          <path
                            d='M1 3L3 5L7 1'
                            stroke='#ce3d96'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                    ) }
                  </div>
                  <div className='brands-match__card-bars'>
                    <div
                      className='brands-match__card-bar'
                      style={ { width: card.barLong } }
                    />
                    <div
                      className='brands-match__card-bar'
                      style={ { width: card.barShort } }
                    />
                  </div>
                </div>
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}
