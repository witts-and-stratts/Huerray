'use client';

import Image from 'next/image';
import { TextListItem } from '../ui/TextListItem';
import { TextList } from '../ui/TextList';

const listItems = [
  'Too busy? Let us handle back and forth with creators',
  "Campaign reviews before your approval, so you don't have to go through request that are not aligned",
  "We manage live campaigns and deliverables for you, so you don't miss your launch date",
];

export function BrandsExpertSupport() {
  return (
    <section className='section-card section-card--maroon -mt-40 md:-mt-20 z-0 pt-60!'>
      <div className='section-card__container'>
        {/* Left - Content */ }
        <div className='section-card__content'>
          <span className='section-card__pill'>Dedicated Support</span>

          <h2 className='section-card__title gradient-text'>Expert level support</h2>

          <p className='section-card__description'>
            Our team is here to ensure that you&apos;re matched with the right
            creators, deliverables are handed off on time, and to make sure
            that your campaign and creative strategy is a success.
          </p>
          <TextList list={ listItems } />
        </div>

        {/* Right - Image Collage with Stars */ }
        <div className='section-card__image'>
          <div className='flex flex-col gap-6 justify-end content-end'>
            <div className='flex gap-4 items-end'>
              <Image
                src='/images/brands/expert-support/42bdc11cc7775a1b800fd5480be693158f9a2f40.png'
                alt='Creator'
                width={ 223 }
                height={ 170 }
                className='h-1/2 rounded-4xl'
              />
              <Image
                src='/images/brands/expert-support/185f2fd7ea251a00b874bee58763148aa815fa3b.png'
                alt='Creator'
                width={ 362 }
                height={ 276 }
                className='section-card__img w-2/3'
              />
            </div>
            <div className='relative'>
              <Image
                src='/images/brands/expert-support/b746afa7d90f4c22913780f492525bf4cb291ea3.png'
                alt='Creator'
                width={ 435 }
                height={ 312 }
                className='section-card__img w-2/3! aspect-5/4! float-end'
              />
            </div>
            <div className='@apply absolute bottom-4 left-4 bg-white rounded-2xl px-2 py-2 flex gap-1 shadow-lg'>
              { [ 1, 2, 3, 4, 5 ].map( ( star ) => (
                <svg
                  key={ star }
                  width='34'
                  height='34'
                  viewBox='0 0 24 24'
                  className='fill-amber-400 mx-1.5'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              ) ) }
            </div>
          </div>
          {/* Star Rating */ }
        </div>
      </div>
    </section>
  );
}
