'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

// Creator images for Hero section
const heroColumn1Images = [
  '/images/creators/hero-creator-7.webp',
  '/images/creators/hero-creator-12.webp',
  '/images/creators/hero-creator-15.webp',
  '/images/creators/hero-creator-19.webp',
  '/images/creators/hero-creator-9.webp',
];

const heroColumn2Images = [
  '/images/creators/hero-creator-13.webp',
  '/images/creators/hero-creator-2.webp',
  '/images/creators/hero-creator-3.webp',
  '/images/creators/hero-creator-4.webp',
  '/images/creators/hero-creator-17.webp',
  '/images/creators/hero-creator-8.webp',
];

export function Hero() {
  const tCommon = useTranslations( 'common' );
  const t = useTranslations( 'home.hero' );

  return (
    <div className='hero'>
      <Header />
      {/* Hero Section */ }
      <section className='hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{ t( 'title' ) }</h1>
            <h2 className='hero__subtitle'>{ t( 'subtitle' ) }</h2>
            <p className='hero__description'>{ t( 'description' ) }</p>
            <Button variant='hero' size='xl'>
              <Link href="/signup" title={ tCommon( 'button.getStarted' ) }>
                { tCommon( 'button.getStarted' ) }
              </Link>
            </Button>
          </div>

          {/* Hero Image Grid - Horizontal rows on mobile, vertical columns on desktop */ }
          <div className='hero__image-grid' style={ { pointerEvents: 'none' } }>
            {/* Column/Row 1 - Horizontal on mobile, Vertical up on desktop */ }
            <div className='hero__carousel'>
              <div className='hero__carousel-track hero__carousel-track--scroll-1 pointer-events-none'>
                { Array( 4 )
                  .fill( heroColumn1Images )
                  .flat()
                  .map( ( src, index ) => (
                    <Image
                      key={ `col1-${ index }` }
                      src={ src }
                      alt='Creator'
                      width={ 229 }
                      height={ 285 }
                    />
                  ) ) }
              </div>
            </div>

            {/* Column/Row 2 - Horizontal reverse on mobile, Vertical down on desktop */ }
            <div className='hero__carousel'>
              <div className='hero__carousel-track hero__carousel-track--scroll-2 pointer-events-none'>
                { Array( 4 )
                  .fill( heroColumn2Images )
                  .flat()
                  .map( ( src, index ) => (
                    <Image
                      key={ `col2-${ index }` }
                      src={ src }
                      alt='Creator'
                      width={ 229 }
                      height={ 285 }
                    />
                  ) ) }
              </div>
            </div>

            {/* Top Gradient Overlay - Desktop only */ }
            <div className='hero__gradient-top' />

            {/* Bottom Gradient Overlay - Desktop only */ }
            <div className='hero__gradient-bottom' />
          </div>
        </div>
      </section>
    </div>
  );
}
