'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CreatorsScroller } from '../creators/CreatorsScroller';
import { PlatformLogos } from '../PlatformLogos';

export function AboutCTA() {
  const t = useTranslations('creators.cta');
  const tCommon = useTranslations('common');

  return (
    <section className='text-center pb-40'>
      <h2 className='creators-cta__subtitle max-w-220 mx-auto px-6'>
        Join thousands of creators & businesses collaborating to create
        impactful content for their everyone
      </h2>

      <CreatorsScroller />

      <Button variant='heroAlt' size='xl' className='w-80'>
        Begin Here
      </Button>

      <PlatformLogos title='' />
    </section>
  );
}
