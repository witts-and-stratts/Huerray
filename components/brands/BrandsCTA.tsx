'use client';

import { Button } from '@/components/ui/button';

export function BrandsCTA() {
  return (
    <section className='creators-cta bg-orange text-white rounded-[40px]'>
      <div className='creators-cta__container'>
        <h2 className='text-white! creators-cta__subtitle'>
          Join thousands of brands getting awesome content
        </h2>
        <h3 className='creators-cta__title text-white!'>
          Join the marketplace. Find your next brand ambassadors
        </h3>
        <Button variant='hero' size='xl' className='bg-dark-burgundy min-w-200'>
          Get started
        </Button>
      </div>
    </section>
  );
}
