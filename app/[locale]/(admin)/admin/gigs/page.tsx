import type { Metadata } from 'next';
import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminGigsClient } from './admin-gigs-client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'admin.gigs' ),
  };
}

export default async function AdminGigsPage() {
  const t = await getTranslations( 'dashboard.admin.gigsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <AdminGigsClient />
    </>
  );
}
