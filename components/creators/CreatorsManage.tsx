'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsManage() {
  const t = useTranslations('creators.manage');

  return (
    <section className='creators-section creators-section--pink pt-50! -mt-20! z-0! relative'>
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
            src='/images/creators/source/automation.jpg'
            alt='We manage everything'
            width={545}
            height={470}
            className='creators-section__img'
          />
        </div>
      </div>
    </section>
  );
}
