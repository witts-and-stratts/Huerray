'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CreatorsScroller } from '../creators/CreatorsScroller';
import { PlatformLogos } from '../PlatformLogos';
import Link from 'next/link';

export function AboutCTA() {
  const t = useTranslations( 'about.cta' );

  return (
    <section className="about-cta">
      <h2 className="about-cta__subtitle">
        { t( 'subtitle' ) }
      </h2>

      <CreatorsScroller />

      <Button variant="heroAlt" size="xl" className="about-cta__button">
        <Link href="/signup" title={ t( 'buttonText' ) } className='flex-1'>
          { t( 'buttonText' ) }
        </Link>
      </Button>

      <PlatformLogos title="" />
    </section>
  );
}
