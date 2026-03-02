import { getTranslations } from 'next-intl/server';
import { SubHeader } from '@/components/subheader';
import { CreatorEarningsClient } from './creator-earnings-client';

export default async function CreatorEarningsPage() {
  const t = await getTranslations( 'dashboard.creator.earningsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <CreatorEarningsClient />
    </>
  );
}
