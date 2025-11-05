'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsCollaborations() {
  const t = useTranslations('creators.collaborations');
  const tCategories = useTranslations('creators.categories');

  const categories = ['sport', 'lifestyle', 'fashion', 'beauty', 'skincare', 'food', 'tech', 'fitness'];

  return (
    <section className='creators-section creators-section--light'>
      <div className='creators-section__container'>
        <div className='creators-section__content'>
          <span className='creators-section__pill'>{t('pill')}</span>
          <h2 className='gradient-text creators-section__title'>
            {t('title')}
          </h2>
          <p className='creators-section__description'>{t('description')}</p>
        </div>

        <div className='creators-section__image'>
          <Image
            src='/images/creators/creator-4.jpg'
            alt='Creator collaboration'
            width={545}
            height={470}
            className='creators-section__img'
          />
        </div>
      </div>

      <div className='creators-section__tags'>
        <div className='creators-section__tags-row'>
          {categories.slice(0, 5).map((category) => (
            <span key={category} className='creators-section__tag'>
              {tCategories(category)}
            </span>
          ))}
        </div>
        <div className='creators-section__tags-row creators-section__tags-row--offset'>
          {categories.slice(5).map((category) => (
            <span key={category} className='creators-section__tag'>
              {tCategories(category)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
