// 'use client';

import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { CreatorVideos } from '@/components/CreatorVideos';
import { CreatorMatch } from '@/components/CreatorMatch';
import { CreatorsSection } from '@/components/CreatorsSection';
import { ContentObjectives } from '@/components/ContentObjectives';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonial } from '@/components/Testimonial';
import { CreatorCallout } from '@/components/CreatorCallout';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

export function HomeClient() {
  return (
    <>
      <main className='body-content'>
        <Hero />

        {/* Intro Section */}
        <Intro />

        {/* Match with Creators Section */}
        <CreatorVideos />

        {/* Creator Match Tiles */}
        <CreatorMatch />

        {/* Creators Section */}
        <CreatorsSection />

        {/* Content for Every Objective */}
        <ContentObjectives />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonial Section */}
        <Testimonial />

        {/* Creator Callout Section */}
        <CreatorCallout />
      </main>

      {/* Final CTA */}
      <FinalCta />

      {/* Footer */}
      <Footer />
    </>
  );
}
