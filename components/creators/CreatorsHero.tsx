'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function CreatorsHero() {
  const tCommon = useTranslations('common');
  const t = useTranslations('creators.hero');

  return (
    <div className='hero creators-hero'>
      {/* Hero Section */}
      <section className='hero__section creators-hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{t('title')}</h1>
            <h2 className='hero__subtitle'>{t('subtitle')}</h2>
            <Button variant='hero' size='xl'>
              {t('buttonText')}
            </Button>
          </div>

          <Image
            src='/images/confetti.svg'
            alt='Confetti Decoration'
            width={1000}
            height={1000}
            className='creators-hero__decoration'
          />

          {/* Hero Image Grid - Horizontal rows on mobile, vertical columns on desktop */}
          <div className='creators-hero__images'>
            {/* Creator Images */}
            {/* Main girl image */}
            <div className='creators-hero__main-image'>
              <Image
                src='/images/creators/main-girl.jpg'
                alt='Creator'
                width={800}
                height={800}
              />
            </div>
            {/* Makeup girl image - top right */}
            <div className='creators-hero__secondary-image'>
              <Image
                src='/images/creators/makeup-girl.jpg'
                alt='Creator'
                width={177}
                height={153}
              />
            </div>
            {/* Payment Card */}
            <div className='creators-hero__payment-card'>
              <div className='creators-hero__payment-avatar'>
                <Image
                  src='/images/creators/payment-avatar.jpg'
                  alt='Avatar'
                  width={93}
                  height={93}
                />
              </div>
              <div className='creators-hero__payment-content'>
                <p className='creators-hero__payment-title'>Payment made</p>
                <div className='creators-hero__payment-bar' />
                <div className='creators-hero__payment-bar--short' />
              </div>
            </div>
            {/* Sample teaser card - right side */}
            <div className='creators-hero__teaser-card'>
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
    </div>
  );
}
