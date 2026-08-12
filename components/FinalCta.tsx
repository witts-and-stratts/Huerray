'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FinalCta() {
  const t = useTranslations( 'home.finalCta' );
  const tCommon = useTranslations( 'common' );

  return (
    <section className='final-cta'>
      <h2 className='final-cta__title gradient-text'>{ t( 'title' ) }</h2>
      <p className='final-cta__description'>{ t( 'description' ) }</p>
      <div className='final-cta__actions'>
        <Button variant='gradient' asChild>
          <Link href='/signup?role=brand' title={ tCommon( 'button.startCampaign' ) }>
            { tCommon( 'button.startCampaign' ) }
            <ArrowRight className='size-4' />
          </Link>
        </Button>
        <Button variant='outlineBrand' asChild>
          <Link href='/signup?role=creator' title={ tCommon( 'button.joinAsCreator' ) }>
            { tCommon( 'button.joinAsCreator' ) }
          </Link>
        </Button>
      </div>
    </section>
  );
}
