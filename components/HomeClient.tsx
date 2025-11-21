// 'use client';

import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { ContentObjectives } from '@/components/ContentObjectives';
import { Testimonial } from '@/components/Testimonial';
import { PlatformLogos } from '@/components/PlatformLogos';
import { CreatorVideos } from '@/components/CreatorVideos';
import { CreatorsSection } from '@/components/CreatorsSection';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

export function HomeClient() {
  const t = useTranslations('home');

  return (
    <>
      <main className='body-content'>
        <Hero />
        <section>
          <h2 className='h4 text-bright-fuchsia font-regular py-5xl px-4 lg:px-10 text-center max-w-[800px] mx-auto'>
            {t('tagline')}
          </h2>
        </section>

        {/* Platform Logos Section */}
        <PlatformLogos />

        {/* Match with Creators Section */}
        <CreatorVideos />

        {/* Content for Every Objective */}
        <ContentObjectives />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonial Section */}
        <Testimonial />

        {/* Creators Section */}
      </main>
      {/* Footer */}
      <CreatorsSection />
      <Footer />
    </>
  );
}
