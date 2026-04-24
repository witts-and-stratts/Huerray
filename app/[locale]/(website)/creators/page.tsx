import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CreatorsPageClient } from '@/components/CreatorsPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.forCreators' ) } - Huerray`,
  };
}

export default async function CreatorsPage({ params }: Props) {
  await params;

  return <CreatorsPageClient />;
}
