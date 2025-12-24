import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { Button } from '@/components/dashboard-ui/button';
import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';

export default async function CampaignsPage() {
  const t = await getTranslations( 'dashboard.campaigns' );
  const tCommon = await getTranslations( 'dashboard.common' );

  return (
    <>
      <SubHeader
        title='Campaigns'
        description='Manage and track all your marketing campaigns'
      >
        <Button className='gap-2 rounded-md'>Create</Button>
        <Button className='gap-2 rounded-md'>Create</Button>
      </SubHeader>

      <CampaignsTable />
    </>
  );
}
