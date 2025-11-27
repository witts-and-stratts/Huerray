'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function BrandsCTA() {
  const t = useTranslations('brands.cta');

  return (
    <section className='creators-cta bg-orange text-white rounded-[40px]'>
      <div className='creators-cta__container'>
        <h2 className='text-white! creators-cta__subtitle'>
          {t('subtitle')}
        </h2>
        <h3 className='creators-cta__title text-white!'>
          {t('title')}
        </h3>
        <Button variant='hero' size='xl' className='bg-dark-burgundy min-w-200'>
          {t('buttonText')}
        </Button>
      </div>
    </section>
  );
}
