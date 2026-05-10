import type { Metadata } from 'next';
import { PricingPageClient } from '@/components/PricingPageClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'pricing', { pathname: '/pricing' });
}

export default function PricingPage() {
  return <PricingPageClient />;
}
