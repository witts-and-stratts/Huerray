import type { Metadata } from 'next';
import { CreatorsPageClient } from '@/components/CreatorsPageClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'creators', { pathname: '/creators' });
}

export default async function CreatorsPage({ params }: Props) {
  await params;

  return <CreatorsPageClient />;
}
