import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingPageClient } from '@/components/PricingPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.pricing' ) } - Huerray`,
  };
}

export default function PricingPage() {
  return <PricingPageClient />;
}
