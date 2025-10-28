'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function CreatorsSection() {
  const t = useTranslations('home.creatorsSection');
  const tCommon = useTranslations('common');

  return (
    <section className='creators-section'>
      <div className='creators-section__container'>
        <div className='creators-section__content'>
          <h2 className='creators-section__label'>{t('label')}</h2>
          <h3 className='creators-section__title'>
            {t('title')}
          </h3>
          <p className='creators-section__description'>
            {t('description')}
          </p>
          <Button variant='hero' size='lg' className='min-w-80'>
            {tCommon('button.joinForFree')}
          </Button>
        </div>

        {/* Creator Images */}
        <div className='creators-section__images'>
          {/* Main girl image */}
          <div className='creators-section__main-image'>
            <Image
              src='/images/creators/main-girl.jpg'
              alt='Creator'
              width={500}
              height={500}
            />
          </div>
          {/* Makeup girl image - top right */}
          <div className='creators-section__secondary-image'>
            <Image
              src='/images/creators/makeup-girl.jpg'
              alt='Creator'
              width={177}
              height={153}
            />
          </div>
          {/* Payment Card */}
          <div className='creators-section__payment-card'>
            <div className='creators-section__payment-avatar'>
              <Image
                src='/images/creators/payment-avatar.jpg'
                alt='Avatar'
                width={93}
                height={93}
              />
            </div>
            <div className='creators-section__payment-content'>
              <p className='creators-section__payment-title'>Payment made</p>
              <div className='creators-section__payment-bar' />
              <div className='creators-section__payment-bar--short' />
            </div>
          </div>
          {/* Sample teaser card - right side */}
          <div className='creators-section__teaser-card'>
            <Image
              src={'/images/creators/sample-teaser.svg'}
              alt='Teaser'
              width={246}
              height={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
