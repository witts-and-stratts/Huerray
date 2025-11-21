'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsManage() {
  const t = useTranslations( 'creators.manage' );

  return (
    <section className='section-card section-card--pink pt-50! -mt-20! z-0! relative'>
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
            src='/images/creators/source/automation.jpg'
            alt='We manage everything'
            width={ 545 }
            height={ 470 }
            className='section-card__img'
          />
        </div>
      </div>
    </section>
  );
}
