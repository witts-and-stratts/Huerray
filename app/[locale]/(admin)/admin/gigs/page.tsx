import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminGigsClient } from './admin-gigs-client';

export default async function AdminGigsPage() {
  const t = await getTranslations( 'dashboard.admin.gigsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <div className='h-full overflow-hidden'><AdminGigsClient /></div>
    </>
  );
}
