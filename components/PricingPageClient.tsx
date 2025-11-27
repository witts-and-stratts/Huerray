'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PricingCards } from './pricing/PricingCards';
import { PricingHero } from './pricing/PricingHero';
import { PricingFeatures } from './pricing/PricingFeatures';
import { PricingFAQs } from './pricing/PricingFAQs';

export function PricingPageClient() {
  return (
    <>
      <Header />
      <main className='body-content'>
        <div className='pricing-main'>
          <PricingHero />
          <PricingCards />
        </div>
        <PricingFeatures />
        <PricingFAQs />
      </main>
      <Footer />
    </>
  );
}
