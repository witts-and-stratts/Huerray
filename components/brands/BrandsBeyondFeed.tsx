'use client';

import Image from 'next/image';
import { TextList } from '../ui/TextList';

const listItems = [
  'Repurpose creator content across all your marketing channels',
  'No guess work and unplanned expenses. Zero extra cost for multiple platform usage',
];

const contentUsageItems = [
  'Store on Shopify',
  'Cinema',
  'Inflight entertainment',
  'In-Game',
];

export function BrandsBeyondFeed() {
  return (
    <section className='section-card section-card--white'>
      <div className='section-card__container'>
        {/* Left - Image with Card */ }
        <div className='section-card__image'>
          <div className='section-card__main-image'>
            <Image
              src='/images/brands/beyond-feed/f5ca756a549dbd9088646531c76a8dab0d4f32f4.png'
              alt='Creators traveling'
              width={ 545 }
              height={ 470 }
              className='section-card__img'
            />
            <div className='brands-beyond__card'>
              <div className='brands-beyond__card-title'>Content Usage</div>
              <div className='brands-beyond__card-list'>
                { contentUsageItems.map( ( item, index ) => (
                  <div key={ index } className='brands-beyond__card-item'>
                    <span className='brands-beyond__card-checkbox'>
                      <svg width='8' height='6' viewBox='0 0 8 6' fill='none'>
                        <path
                          d='M1 3L3 5L7 1'
                          stroke='#ce3d96'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span>{ item }</span>
                  </div>
                ) ) }
              </div>
              <div className='brands-beyond__card-bars'>
                <div className='brands-beyond__card-bar w-full' />
                <div className='brands-beyond__card-bar w-3/5' />
              </div>
            </div>
          </div>
        </div>

        <div className='section-card__content section-card__content--right'>
          <span className='section-card__pill'>Omni-Channel</span>

          <h2 className='section-card__title gradient-text'>Beyond your content feed</h2>

          <p className='section-card__description'>
            Content created by creators are licensed to you for use in all
            your marketing channels. From your Website, E-commerce platform,
            Youtube or in-flight entertainment, create a truly omni-channel
            creator marketing experience.
          </p>

          <TextList list={ listItems } />
        </div>
      </div>
    </section>
  );
}
