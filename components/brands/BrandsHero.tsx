'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function BrandsHero() {
  const t = useTranslations( 'brands.hero' );
  const tCommon = useTranslations( 'common' );

  useEffect( () => {
    ( async function () {
      const cal = await getCalApi( { namespace: 'brand-discovery-call' } );
      cal( 'init', {
        origin: 'https://cal.com',
      } );
      cal( 'ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      } );
    } )();
  }, [] );

  return (
    <div className='hero brands-hero creators-hero'>
      {/* Hero Section */ }
      <section className='hero__section brands-hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{ t( 'title' ) }</h1>
            <p className='hero__description'>{ t( 'subtitle' ) }</p>
            <div className='hero__actions'>
              <Link href='/signup?role=brand' title={ tCommon( 'button.startCampaign' ) }>
                <Button variant='gradient'>
                  { tCommon( 'button.startCampaign' ) }
                  <ArrowRight className='size-4' />
                </Button>
              </Link>
              <Button
                variant='outlineBrand'
                data-cal-link='huerray-eu/brand-discovery-call'
                data-cal-namespace='brand-discovery-call'
                data-cal-origin='https://cal.com'
                title={ tCommon( 'button.bookACall' ) }
              >
                { tCommon( 'button.bookACall' ) }
              </Button>
            </div>
          </div>

          <Image
            src='/images/confetti.svg'
            alt=''
            width={ 1000 }
            height={ 1000 }
            className='brands-hero__decoration'
          />

          {/* Hero Image Grid */ }
          <div className='brands-hero__images'>
            {/* Campaign brief mini-card */ }
            <div className='brands-hero__brief-card'>
              <span>{ t( 'briefCardEyebrow' ) }</span>
              <b>{ t( 'briefCardTitle' ) }</b>
              <small>{ t( 'briefCardNote' ) }</small>
            </div>
            <div className='brands-hero__main-column'>
              <div className='brands-hero__main-image'>
                <Image
                  src='/images/creators/main-girl-2.webp'
                  alt='Creator with drink'
                  width={ 700 }
                  height={ 700 }
                  className='creators-section__img'
                  priority
                />
              </div>
              <div className='brands-hero__secondary-image'>
                <Image
                  src='/images/creators/mum-with-daughter-creator.webp'
                  alt='Mum and daughter creators'
                  width={ 800 }
                  height={ 600 }
                />
              </div>
            </div>
            <div className='brands-hero__side-column'>
              <div className='brands-hero__circle-image'>
                <Image
                  src='/images/creators/creator-in-swimming-pool.webp'
                  alt='Swimming pool creator'
                  width={ 400 }
                  height={ 400 }
                />
              </div>
              <div className='brands-hero__tall-image'>
                <Image
                  src='/images/creators/couple-vacation-creators.webp'
                  alt='Couple on vacation'
                  width={ 400 }
                  height={ 600 }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
