'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsCollaborations() {
  const t = useTranslations( 'creators.collaborations' );
  const tCategories = useTranslations( 'creators.categories' );

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
    <section className='section-card section-card--light section-card--spaced'>
      <div className='section-card__container'>
        <div className='section-card__content'>
          <span className='section-card__pill'>{ t( 'pill' ) }</span>
          <h2 className='gradient-text section-card__title'>
            { t( 'title' ) }
          </h2>
          <p className='section-card__description'>{ t( 'description' ) }</p>
        </div>

        <div className='section-card__image'>
          <Image
            src='/images/creators/source/main girl.jpg'
            alt='Creator collaboration'
            width={ 545 }
            height={ 470 }
            className='section-card__img'
          />
        </div>
        <div className='creators-section__tags absolute right-10 bottom-10 md:right-20 md:bottom-30'>
          <div className='creators-section__tags-row'>
            { categories.slice( 0, 5 ).map( ( category ) => (
              <span key={ category } className='creators-section__tag'>
                { tCategories( category ) }
              </span>
            ) ) }
          </div>
          <div className='creators-section__tags-row creators-section__tags-row--offset'>
            { categories.slice( 5 ).map( ( category ) => (
              <span key={ category } className='creators-section__tag'>
                { tCategories( category ) }
              </span>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}
