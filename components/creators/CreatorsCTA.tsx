'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CreatorsScroller } from './CreatorsScroller';
import Link from 'next/link';

export function CreatorsCTA() {
  const t = useTranslations( 'creators.cta' );
  const tCommon = useTranslations( 'common' );

  return (
    <section className='creators-cta'>
      <div className='creators-cta__container'>
        <p className='creators-cta__subtitle'>{ t( 'subtitle' ) }</p>

        <CreatorsScroller />

        <h2 className='gradient-text creators-cta__title px-10 text-balance'>{ t( 'title' ) }</h2>
        <Link href="/signup?role=creator" title={ tCommon( 'button.createFreeProfile' ) }>
          <Button variant='hero' size='xl' className='bg-dark-burgundy min-w-200'>
            { tCommon( 'button.createFreeProfile' ) }
          </Button>
        </Link>
      </div>
    </section>
  );
}
