'use client';

import { useState } from 'react';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { EmptyApplications } from '@/components/admin/empty-states/empty-applications';
import { ApplicationCard } from '@/components/campaigns/application-card';
import { Button } from '@/components/dashboard-ui/button';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useCampaignApplications } from '@/lib/api/hooks/campaigns';

interface CampaignApplicationsSectionProps {
  campaignId: string;
}

function ApplicationCardSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
      <Skeleton className="absolute inset-0 rounded-2xl" />
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <Skeleton className="h-4 w-16 rounded-full bg-white/20" />
        <Skeleton className="size-6 rounded-md bg-white/20" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex flex-col gap-2 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">
        <Skeleton className="h-4 w-2/3 bg-white/20" />
        <Skeleton className="h-3 w-3/4 bg-white/20" />
        <Skeleton className="h-px w-full bg-white/20" />
        <Skeleton className="h-3 w-4/5 bg-white/20" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-3.5 bg-white/20" />
          <Skeleton className="h-3 w-16 bg-white/20" />
          <Skeleton className="h-3 w-px bg-white/20" />
          <Skeleton className="h-3 w-8 bg-white/20" />
        </div>
        <Skeleton className="h-3 w-1/2 bg-white/20" />
      </div>
    </div>
  );
}

export function CampaignApplicationsSection( { campaignId }: CampaignApplicationsSectionProps ) {
  const { data: applicationsData, isLoading, error, refetch } = useCampaignApplications( campaignId );
  const [ selectedCreator, setSelectedCreator ] = useState<ModelsCreatorResponse | null>( null );
  const [ creatorSheetOpen, setCreatorSheetOpen ] = useState( false );

  const handleViewCreatorDetails = ( creator: ModelsCreatorResponse | undefined ) => {
    if ( !creator ) return;
    setSelectedCreator( creator );
    setCreatorSheetOpen( true );
  };

  const handleRetry = () => {
    refetch();
  };

  if ( isLoading ) {
    return (
      <div className='@container'>
        <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-6">
          { Array.from( { length: 8 } ).map( ( _, index ) => (
            <ApplicationCardSkeleton key={ `application-skeleton-${ index }` } />
          ) ) }
        </div>
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        Error loading applications: { error.message }

        <Button variant={ 'outline' } onClick={ handleRetry }>Retry</Button>
      </div>
    );
  }

  const applications = applicationsData?.data || [];

  if ( applications.length === 0 ) {
    return (
      <EmptyApplications fill />
    );
  }

  return (
    <div className='@container'>
      <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-6">
        { applications.map( ( application ) => (
          <ApplicationCard
            key={ application.id }
            application={ application }
            onClick={ () => handleViewCreatorDetails( application.creator ) }
          />
        ) ) }
      </div>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ creatorSheetOpen }
        onOpenChange={ setCreatorSheetOpen }
      />
    </div>
  );
}
