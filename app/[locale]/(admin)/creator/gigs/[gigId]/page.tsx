'use client';

import { useParams } from 'next/navigation';
import { useGig } from '@/lib/api/hooks/gigs';
import { GigDetailsPageView } from '@/components/campaigns/gig-details-page-view';
import { Button } from '@/components/dashboard-ui/button';
import { Loader2 } from 'lucide-react';

export default function CreatorGigDetailsPage() {
  const params = useParams<{ gigId: string; }>();
  const { data: response, isLoading, error, refetch } = useGig( params.gigId );

  const handleRetry = () => refetch();

  if ( isLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const gigData = response?.data;

  if ( error || !gigData ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-2'>
        <p className='text-destructive font-medium'>Failed to load gig</p>
        <p className='text-muted-foreground text-sm'>{ error?.message || 'Gig not found' }</p>
        <Button variant={ 'outline' } onClick={ handleRetry }>Retry</Button>
      </div>
    );
  }

  return <GigDetailsPageView gig={ gigData } />;
}
