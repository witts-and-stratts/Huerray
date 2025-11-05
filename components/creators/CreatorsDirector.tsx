'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsDirector() {
  const t = useTranslations('creators.director');

  return (
    <section className='creators-section creators-section--beige'>
      <div className='creators-section__container creators-section__container--reverse'>
        <div className='creators-section__image'>
          <Image
            src='/images/creators/creator-5.jpg'
            alt='Be the creative director'
            width={545}
            height={470}
            className='creators-section__img'
          />
        </div>

        <div className='creators-section__content'>
          <span className='creators-section__pill'>{t('pill')}</span>
          <h2 className='gradient-text creators-section__title'>
            {t('title')}
          </h2>
          <p className='creators-section__description'>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}
