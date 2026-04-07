'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function BrandsCTA() {
  const t = useTranslations( 'brands.cta' );

  return (
    <section className='creators-cta bg-orange text-white rounded-[40px] px-10'>
      <div className='creators-cta__container'>
        <h2 className='text-white! creators-cta__subtitle'>
          { t( 'subtitle' ) }
        </h2>
        <h3 className='creators-cta__title text-white!'>
          { t( 'title' ) }
        </h3>
        <Link href="/signup?role=brand" title={ t( 'buttonText' ) } className='cursor-pointer'>
          <Button variant='heroAlt' size='xl' className='bg-dark-burgundy w-100'>
            { t( 'buttonText' ) }
          </Button>
        </Link>
      </div>
    </section>
  );
}
