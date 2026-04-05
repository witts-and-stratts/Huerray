'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from 'next/navigation';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { CampaignDetailsView } from '@/components/campaigns/campaign-details-view';
import { CampaignDetailSkeleton } from '@/components/campaigns/campaign-detail-skeleton';
import { Button } from '@/components/dashboard-ui/button';
import { useTranslations } from 'next-intl';

export default function CampaignPage() {
  const t = useTranslations( 'dashboard.brand.campaignDetailPage' );
  const params = useParams<{ id: string; }>();
  const { data, isLoading, error, refetch } = useCampaign( params.id );

  const handleRetry = () => refetch();

  if ( isLoading ) {
    return <CampaignDetailSkeleton />;
  }

  if ( error || !data ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-2'>
        <p className='text-destructive font-medium'>{ t( 'failedToLoad' ) }</p>
        <p className='text-muted-foreground text-sm'>{ error?.message || t( 'notFound' ) }</p>
        <Button variant={ 'outline' } onClick={ handleRetry } className={ 'text-sm' }>{ t( 'retry' ) }</Button>
      </div>
    );
  }

  return <CampaignDetailsView campaign={ data } />;
}
