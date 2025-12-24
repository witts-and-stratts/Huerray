import { CampaignsTable } from '@/components/campaigns/campaigns-table';

export const dynamic = 'force-dynamic';

export default function TestCampaignsPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-6'>Campaigns Table Test</h1>
      <CampaignsTable />
    </div>
  );
}
