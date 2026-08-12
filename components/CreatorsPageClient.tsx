// 'use client';

import { Header } from '@/components/Header';
import { CreatorsHero } from '@/components/creators/CreatorsHero';
import { CreatorsScroller } from '@/components/creators/CreatorsScroller';
import { CreatorsIntro } from '@/components/creators/CreatorsIntro';
import { CreatorsCollaborations } from '@/components/creators/CreatorsCollaborations';
import { CreatorsDirector } from '@/components/creators/CreatorsDirector';
import { CreatorsManage } from '@/components/creators/CreatorsManage';
import { CreatorsPaid } from '@/components/creators/CreatorsPaid';
import { CreatorsHowItWorks } from '@/components/creators/CreatorsHowItWorks';
import { CreatorsTestimonial } from '@/components/creators/CreatorsTestimonial';
import { CreatorsFAQ } from '@/components/creators/CreatorsFAQ';
import { CreatorsCTA } from '@/components/creators/CreatorsCTA';
import { Footer } from '@/components/Footer';

export function CreatorsPageClient() {
  return (
    <>
      <Header />
      <main className='body-content'>
        <CreatorsHero />
        <CreatorsScroller />
        <CreatorsIntro />
        <CreatorsCollaborations />
        <CreatorsDirector />
        <CreatorsManage />
        <CreatorsPaid />
        <CreatorsHowItWorks />
        <CreatorsTestimonial />
        <div className='bg-maroon-50 w-full h-full pt-10 -mt-16 relative z-20'>
          <CreatorsFAQ />
          <CreatorsCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
