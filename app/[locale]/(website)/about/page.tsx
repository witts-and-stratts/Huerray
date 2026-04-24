import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AboutPageClient } from '@/components/AboutPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.about' ) } - Huerray`,
  };
}

export default async function AboutPage( { params }: Props ) {
  await params;

  return <AboutPageClient />;
}
