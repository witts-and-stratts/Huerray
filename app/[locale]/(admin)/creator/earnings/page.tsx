import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SubHeader } from '@/components/subheader';
import { CreatorEarningsClient } from './creator-earnings-client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'creator.earnings' ),
  };
}

export default async function CreatorEarningsPage() {
  const t = await getTranslations( 'dashboard.creator.earningsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <div className='bg-slate-50/50 flex-1'>
        <CreatorEarningsClient />
      </div>
    </>
  );
}
