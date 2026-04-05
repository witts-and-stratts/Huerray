'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function ManagedServicesCTA() {
  const t = useTranslations( 'managed-services.cta' );

  return (
    <section className='creators-cta bg-orange text-white rounded-[40px]'>
      <div className='creators-cta__container'>
        <h3 className='creators-cta__title text-white!'>{ t( 'text' ) }</h3>
        <Button
          variant='heroAlt'
          size='xl'
          className='bg-dark-burgundy w-100'
          data-cal-link='huerray/book-a-free-call'
          data-cal-namespace='enterprise-booking'
          data-cal-origin='https://www.cal.eu'
        >
          { t( 'buttonText' ) }
        </Button>
      </div>
    </section>
  );
}
