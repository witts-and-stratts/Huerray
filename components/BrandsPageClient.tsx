'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { BrandsBeyondFeed } from './brands/BrandsBeyondFeed';
import { BrandsContentObjective } from './brands/BrandsContentObjective';
import { BrandsCTA } from './brands/BrandsCTA';
import { BrandsExpertSupport } from './brands/BrandsExpertSupport';
import { BrandsFAQ } from './brands/BrandsFAQ';
import { BrandsHero } from './brands/BrandsHero';
import { BrandsIndustry } from './brands/BrandsIndustry';
import { BrandsMatch } from './brands/BrandsMatch';
import { BrandsScroller } from './brands/BrandsScroller';
import { BrandsStopAssuming } from './brands/BrandsStopAssuming';
import { ContentObjectives } from './ContentObjectives';
import { PlatformLogos } from './PlatformLogos';

export function BrandsPageClient() {
  return (
    <>
      <Header />
      <main className='body-content'>
        <BrandsHero />
        <BrandsScroller />
        <BrandsMatch />
        <BrandsContentObjective />
        <BrandsExpertSupport />
        <BrandsBeyondFeed />
        <div className='pb-20' />
        <PlatformLogos />
        <div className='pb-20' />
        <BrandsStopAssuming />
        <div className='pb-20' />
        <ContentObjectives />
        <BrandsFAQ />
        <BrandsCTA />
      </main>
      <Footer />
    </>
  );
}
