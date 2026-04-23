import type { Metadata } from 'next';
import { PricingPageClient } from '@/components/PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing - Huerray',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
