'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { AboutCTA } from './about/AboutCTA';
import { AboutHero } from './about/AboutHero';
import { AboutTeam } from './about/AboutTeam';
import { AboutWhatWeDo } from './about/AboutWhatWeDo';
import { AboutWhy } from './about/AboutWhy';
import AboutTeaser from './about/AboutTeaser';

export function AboutPageClient() {
  return (
    <>
      <Header />
      <main className='body-content dark-bg'>
        <AboutHero />
        <AboutWhy />
        <AboutTeaser />
        <div className='pb-20' />
        <AboutWhatWeDo />
        <AboutTeam />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
