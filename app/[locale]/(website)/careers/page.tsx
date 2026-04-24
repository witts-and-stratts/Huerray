import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CareerPageClient } from '@/components/CareerPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.careers' ) } - Huerray`,
  };
}

export default async function CareerPage( { params }: Props ) {
  await params;

  return <CareerPageClient />;
}
