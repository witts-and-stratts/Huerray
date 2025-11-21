'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function BrandsHero() {
  const t = useTranslations('brands.hero');

  return (
    <div className='hero brands-hero creators-hero'>
      {/* Hero Section */}
      <section className='hero__section brands-hero__section'>
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
            className='brands-hero__decoration'
          />

          {/* Hero Image Grid */}
          <div className='brands-hero__images'>
            <div className='brands-hero__main-column'>
              <div className='brands-hero__main-image'>
                <Image
                  src='/images/creators/main-girl-2.jpg'
                  alt='Creator with drink'
                  width={700}
                  height={700}
                  className='creators-section__img'
                />
              </div>
              <div className='brands-hero__secondary-image'>
                <Image
                  src='/images/creators/mum-with-daughter-creator.jpg'
                  alt='Mum and daughter creators'
                  width={800}
                  height={600}
                />
              </div>
            </div>
            <div className='brands-hero__side-column'>
              <div className='brands-hero__circle-image'>
                <Image
                  src='/images/creators/creator-in-swimming-pool.jpg'
                  alt='Swimming pool creator'
                  width={400}
                  height={400}
                />
              </div>
              <div className='brands-hero__tall-image'>
                <Image
                  src='/images/creators/couple-vacation-creators.jpg'
                  alt='Couple on vacation'
                  width={400}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
