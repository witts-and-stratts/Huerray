import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/AboutPageClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'about', { pathname: '/about' });
}

export default async function AboutPage( { params }: Props ) {
  await params;

  return <AboutPageClient />;
}
