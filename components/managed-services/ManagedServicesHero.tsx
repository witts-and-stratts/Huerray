'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function ManagedServicesHero() {
  const t = useTranslations( 'managed-services.hero' );

  useEffect( () => {
    ( async function () {
      const cal = await getCalApi( { namespace: 'enterprise-booking' } );
      cal( 'init', {
        origin: 'https://www.cal.eu',
      } );
      cal( 'ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      } );
    } )();
  }, [] );

  return (
    <div className='hero brands-hero'>
      <section className='hero__section brands-hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{ t( 'title' ) }</h1>
            <h2 className='hero__subtitle'>{ t( 'subtitle' ) }</h2>
            <Button
              variant='hero'
              size='xl'
              data-cal-link='huerray/book-a-free-call'
              data-cal-namespace='enterprise-booking'
              data-cal-origin='https://www.cal.eu'
            >
              { t( 'buttonText' ) }
            </Button>
          </div>

          <div className='brands-hero__images'>
            <div className='brands-hero__main-column'>
              <div className='brands-hero__main-image'>
                <Image
                  src='/images/creators/main-girl.webp'
                  alt='Creator'
                  width={ 700 }
                  height={ 700 }
                  priority
                />
              </div>
              <div className='brands-hero__secondary-image'>
                <Image
                  src='/images/creators/creator-in-swimming-pool.webp'
                  alt='Creator'
                  width={ 800 }
                  height={ 600 }
                />
              </div>
            </div>
            <div className='brands-hero__side-column'>
              <div className='brands-hero__circle-image'>
                <Image
                  src='/images/creators/couple-vacation-creators.webp'
                  alt='Creator'
                  width={ 400 }
                  height={ 400 }
                />
              </div>
              <div className='brands-hero__tall-image'>
                <Image
                  src='/images/creators/making-presentation-new-facial-cream.webp'
                  alt='Creator'
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
