'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CareerHero } from '@/components/career/CareerHero';
import { CareerOpportunities } from '@/components/career/CareerOpportunities';
import { CareerWhy } from '@/components/career/CareerWhy';
import { OurTeams } from '@/components/career/OurTeams';
import { OurValues } from '@/components/career/OurValues';

export function CareerPageClient() {
  return (
    <>
      <Header />
      <main className="career-page__main body-content dark-bg">
        <CareerHero />
        <CareerWhy />
        <div className="career-page__spacer" />
        <OurTeams />
        <OurValues />
        <CareerOpportunities />
        <div className="career-page__bottom-spacer">&nbsp;</div>
      </main>
      <Footer />
    </>
  );
}
