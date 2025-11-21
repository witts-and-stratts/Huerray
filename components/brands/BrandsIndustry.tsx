'use client';

import Image from 'next/image';

export function BrandsIndustry() {
  const categories = [
    'sport',
    'lifestyle',
    'fashion',
    'beauty',
    'skincare',
    'food',
    'tech',
    'fitness',
  ];

  return (
    <section className='creators-section creators-section--light creators-section--spaced'>
      <div className='creators-section__container'>
        <div className='creators-section__content'>
          <h2 className='gradient-text creators-section__title'>
            Content for every industry
          </h2>
        </div>

        <div className='creators-section__image'>
          <Image
            src='/images/creators/source/main girl.jpg'
            alt='Creator collaboration'
            width={ 545 }
            height={ 470 }
            className='creators-section__img'
          />
        </div>
        <div className='creators-section__tags absolute right-10 bottom-10 md:right-20 md:bottom-30'>
          <div className='creators-section__tags-row'>
            { categories.slice( 0, 5 ).map( ( category ) => (
              <span key={ category } className='creators-section__tag'>
                { category }
              </span>
            ) ) }
          </div>
          <div className='creators-section__tags-row creators-section__tags-row--offset'>
            { categories.slice( 5 ).map( ( category ) => (
              <span key={ category } className='creators-section__tag'>
                { category }
              </span>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}
