'use client';

import Image from 'next/image';
import { TextListItem } from '../ui/TextListItem';
import { TextList } from '../ui/TextList';

const listItems = [
  "Whether it's a beauty commercial, review for automotive or showcase of baby products, you will find the specialised creator content",
  'From UGC to specialised content, you can pick based on your goals',
  'From additional content to entertainment content, to product reviews and live events, creator content is versatile',
];

export function BrandsContentObjective() {
  return (
    <section className='section-card section-card--pink mt-10 z-100'>
      <div className='section-card__container'>
        {/* Left - Image Collage */ }
        <div className='section-card__image'>
          <div className='brands-content-objective__images'>
            <div className='brands-content-objective__image brands-content-objective__image--large'>
              <Image
                src='/images/brands/content-objective/ff36e4040fea432abfe66356bcfa58ee12e20e25.png'
                alt='Creator content'
                width={ 545 }
                height={ 282 }
                className='section-card__img'
              />
            </div>
            <div className='grid grid-cols-6 gap-4 h-40'>
              <div className='rounded-[64px] overflow-hidden col-span-4'>
                <Image
                  src='/images/brands/content-objective/orange-products.png'
                  alt='Beauty products'
                  width={ 262 }
                  height={ 172 }
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='rounded-[64px] overflow-hidden col-span-2'>
                <Image
                  src='/images/brands/content-objective/woman-yellow.png'
                  alt='Creator'
                  width={ 262 }
                  height={ 172 }
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='section-card__content'>

          {/* Right - Content */ }
          <div className='section-card__content section-card__content--right'>
            <span className='section-card__pill'>Quality Content</span>

            <h2 className='section-card__title gradient-text'>
              Content for every objective
            </h2>

            <p className='section-card__description'>
              Creators produce high-quality content, with a range of output that
              is adapted to match your goals and requirements.
            </p>

            <TextList list={ listItems } />
          </div>
        </div>
      </div>
    </section>
  );
}
