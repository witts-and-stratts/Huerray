import { HomeClient } from '@/components/HomeClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEO(locale, 'home', { pathname: '/' });
}

export default async function Home({ params }: Props) {
  await params;

  return <HomeClient />;
}
