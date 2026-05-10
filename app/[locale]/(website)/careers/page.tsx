import type { Metadata } from 'next';
import { CareerPageClient } from '@/components/CareerPageClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';
import { getOpenPositions } from '@/sanity/lib/careers';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'career', { pathname: '/careers' });
}

export default async function CareerPage( { params }: Props ) {
  await params;
  const openPositions = await getOpenPositions();

  return <CareerPageClient openPositions={ openPositions } />;
}
