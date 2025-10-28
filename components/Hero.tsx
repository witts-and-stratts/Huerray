'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import Image from 'next/image';

// Creator images for Hero section
const heroColumn1Images = [
  '/images/creators/creator-1.jpg',
  '/images/creators/creator-2.jpg',
  '/images/creators/creator-3.jpg',
];

const heroColumn2Images = [
  '/images/creators/creator-4.jpg',
  '/images/creators/creator-5.jpg',
  '/images/creators/creator-6.jpg',
];

export function Hero() {
  const tCommon = useTranslations('common');
  const t = useTranslations('home.hero');

  return (
    <div className='hero'>
      <Header />
      {/* Hero Section */}
      <section className='hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{t('title')}</h1>
            <h2 className='hero__subtitle'>{t('subtitle')}</h2>
            <p className='hero__description'>{t('description')}</p>
            <Button variant='hero' size='xl'>
              {tCommon('button.getStarted')}
            </Button>
          </div>

          {/* Hero Image Grid - Horizontal rows on mobile, vertical columns on desktop */}
          <div className='hero__image-grid'>
            {/* Column/Row 1 - Horizontal on mobile, Vertical up on desktop */}
            <div className='hero__carousel'>
              <div className='hero__carousel-track hero__carousel-track--scroll-1'>
                {Array(4)
                  .fill(heroColumn1Images)
                  .flat()
                  .map((src, index) => (
                    <Image
                      key={`col1-${index}`}
                      src={src}
                      alt='Creator'
                      width={229}
                      height={285}
                    />
                  ))}
              </div>
            </div>

            {/* Column/Row 2 - Horizontal reverse on mobile, Vertical down on desktop */}
            <div className='hero__carousel'>
              <div className='hero__carousel-track hero__carousel-track--scroll-2'>
                {Array(4)
                  .fill(heroColumn2Images)
                  .flat()
                  .map((src, index) => (
                    <Image
                      key={`col2-${index}`}
                      src={src}
                      alt='Creator'
                      width={229}
                      height={285}
                    />
                  ))}
              </div>
            </div>

            {/* Top Gradient Overlay - Desktop only */}
            <div className='hero__gradient-top' />

            {/* Bottom Gradient Overlay - Desktop only */}
            <div className='hero__gradient-bottom' />
          </div>
        </div>
      </section>
    </div>
  );
}
