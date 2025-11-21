'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsDirector() {
  const t = useTranslations( 'creators.director' );

  return (
    <section className='section-card section-card--fuschia mt-10! z-100 relative'>
      <div className='section-card__container section-card__container--reverse'>
        <div className='section-card__image'>
          <Image
            src='/images/creators/source/creative-director.jpg'
            alt='Be the creative director'
            width={ 545 }
            height={ 470 }
            className='section-card__img'
          />
        </div>

        <div className='section-card__content'>
          <span className='section-card__pill'>{ t( 'pill' ) }</span>
          <h2 className='gradient-text section-card__title'>
            { t( 'title' ) }
          </h2>
          <p className='section-card__description'>{ t( 'description' ) }</p>
        </div>
      </div>
    </section>
  );
}
