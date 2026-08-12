'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CreatorsHero() {
  const tCommon = useTranslations( 'common' );
  const t = useTranslations( 'creators.hero' );

  return (
    <div className='hero creators-hero'>
      {/* Hero Section */ }
      <section className='hero__section creators-hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{ t( 'title' ) }</h1>
            <p className='hero__description'>{ t( 'subtitle' ) }</p>
            <div className='hero__actions'>
              <Link href='/signup?role=creator' title={ tCommon( 'button.createFreeProfile' ) }>
                <Button variant='gradient'>
                  { tCommon( 'button.createFreeProfile' ) }
                  <ArrowRight className='size-4' />
                </Button>
              </Link>
              <Link href='#how-creators' title={ t( 'secondaryButtonText' ) }>
                <Button variant='outlineBrand'>
                  { t( 'secondaryButtonText' ) }
                </Button>
              </Link>
            </div>
          </div>

          <Image
            src='/images/confetti.svg'
            alt=''
            width={ 1000 }
            height={ 1000 }
            className='creators-hero__decoration'
          />

          {/* Hero Image Grid - Horizontal rows on mobile, vertical columns on desktop */ }
          <div className='creators-hero__images'>
            {/* Creator Images */ }
            {/* Main girl image */ }
            <div className='creators-hero__main-image'>
              <Image
                src='/images/creators/main-girl.webp'
                alt='Creator smiling at the camera'
                width={ 800 }
                height={ 800 }
                priority
              />
            </div>
            {/* Mini callout card - "No follower minimum" */ }
            <div className='creators-hero__mini-card'>
              <b>{ t( 'miniCardTitle' ) }</b>
              <span>{ t( 'miniCardText' ) }</span>
            </div>
            {/* Makeup girl image - top right */ }
            <div className='creators-hero__secondary-image'>
              <Image
                src='/images/creators/makeup-girl.webp'
                alt='Creator applying makeup'
                width={ 177 }
                height={ 153 }
              />
            </div>
            {/* Payment Card */ }
            <div className='creators-hero__payment-card'>
              <div className='creators-hero__payment-avatar'>
                <Image
                  src='/images/creators/payment-avatar.webp'
                  alt=''
                  width={ 93 }
                  height={ 93 }
                />
              </div>
              <div className='creators-hero__payment-content'>
                <p className='creators-hero__payment-title'>Payment made</p>
                <div className='creators-hero__payment-bar' />
                <div className='creators-hero__payment-bar--short' />
              </div>
            </div>
            {/* Sample teaser card - right side */ }
            <div className='creators-hero__teaser-card'>
              <Image
                src={ '/images/creators/sample-teaser.svg' }
                alt=''
                width={ 246 }
                height={ 150 }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
