'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BrandsCTA() {
  const t = useTranslations( 'brands.cta' );
  const tCommon = useTranslations( 'common' );

  useEffect( () => {
    ( async function () {
      const cal = await getCalApi( { namespace: 'brand-discovery-call' } );
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
    <section className='creators-cta'>
      <div className='creators-cta__container'>
        <p className='creators-cta__subtitle'>
          { t( 'subtitle' ) }
        </p>
        <h2 className='gradient-text creators-cta__title'>
          { t( 'title' ) }
        </h2>
        <div className='hero__actions justify-center'>
          <Link href="/signup?role=brand" title={ tCommon( 'button.startCampaign' ) }>
            <Button variant='gradient'>
              { tCommon( 'button.startCampaign' ) }
              <ArrowRight className='size-4' />
            </Button>
          </Link>
          <Button
            variant='outlineBrand'
            data-cal-link='huerray/brand-discovery-call'
            data-cal-namespace='brand-discovery-call'
            data-cal-origin='https://www.cal.eu'
            title={ tCommon( 'button.bookACall' ) }
          >
            { tCommon( 'button.bookACall' ) }
          </Button>
        </div>
      </div>
    </section>
  );
}
