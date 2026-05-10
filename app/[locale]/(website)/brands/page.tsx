import type { Metadata } from 'next';
import { BrandsPageClient } from '@/components/BrandsPageClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'brands', { pathname: '/brands' });
}

export default async function BrandsPage({ params }: Props) {
  await params;

  return <BrandsPageClient />;
}
