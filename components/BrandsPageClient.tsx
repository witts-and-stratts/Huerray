'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { BrandsBeyondFeed } from './brands/BrandsBeyondFeed';
import { BrandsContentObjective } from './brands/BrandsContentObjective';
import { BrandsCTA } from './brands/BrandsCTA';
import { BrandsExpertSupport } from './brands/BrandsExpertSupport';
import { BrandsFAQ } from './brands/BrandsFAQ';
import { BrandsHero } from './brands/BrandsHero';
import { BrandsIntro } from './brands/BrandsIntro';
import { BrandsMatch } from './brands/BrandsMatch';
import { BrandsScroller } from './brands/BrandsScroller';
import { BrandsStopAssuming } from './brands/BrandsStopAssuming';
import { BrandsSupportSteps } from './brands/BrandsSupportSteps';
import { PlatformLogos } from './PlatformLogos';

export function BrandsPageClient() {
  return (
    <>
      <Header />
      <main className='body-content'>
        <BrandsHero />
        <BrandsScroller />
        <BrandsIntro />
        <BrandsMatch />
        <BrandsContentObjective />
        <BrandsExpertSupport />
        <BrandsSupportSteps />
        <BrandsBeyondFeed />
        <div className='pb-20' />
        <PlatformLogos />
        <div className='pb-20' />
        <BrandsStopAssuming />
        <BrandsFAQ />
        <BrandsCTA />
      </main>
      <Footer />
    </>
  );
}
