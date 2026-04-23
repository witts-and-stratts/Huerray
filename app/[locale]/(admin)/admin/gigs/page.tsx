import type { Metadata } from 'next';
import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminGigsClient } from './admin-gigs-client';

export const metadata: Metadata = {
  title: 'Gigs',
};

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
