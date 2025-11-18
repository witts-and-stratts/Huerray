'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CreatorsScroller } from './CreatorsScroller';

export function CreatorsCTA() {
  const t = useTranslations('creators.cta');
  const tCommon = useTranslations('common');

  return (
    <section className='creators-cta'>
      <div className='creators-cta__container'>
        <h2 className='creators-cta__subtitle'>{t('subtitle')}</h2>

        <CreatorsScroller />

        <h3 className='gradient-text creators-cta__title'>{t('title')}</h3>
        <Button variant='hero' size='xl' className='bg-dark-burgundy min-w-200'>
          {tCommon('button.getStarted')}
        </Button>
      </div>
    </section>
  );
}
