'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ManagedServicesHero } from './managed-services/ManagedServicesHero';
import { ManagedServicesFeatures } from './managed-services/ManagedServicesFeatures';
import { ManagedServicesCTA } from './managed-services/ManagedServicesCTA';
import { ManagedServicesFAQ } from './managed-services/ManagedServicesFAQ';

export function ManagedServicesClient() {
  return (
    <>
      <Header />
      <main className='body-content'>
        <ManagedServicesHero />
        <ManagedServicesFeatures />
        <ManagedServicesCTA />
        <ManagedServicesFAQ />
      </main>
      <Footer />
    </>
  );
}
