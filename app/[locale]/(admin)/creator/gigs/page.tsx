import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MyGigsView } from '@/components/creator/my-gigs-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'creator.gigs' ),
  };
}

export default function GigsPage() {
  return <MyGigsView />;
}
