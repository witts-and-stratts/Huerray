'use client';

import { CreatorCard } from '@/components/admin/creators/creator-card';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';

interface CampaignCreatorsSectionProps {
  creators: ModelsCreatorResponse[];
}

export function CampaignCreatorsSection( { creators }: CampaignCreatorsSectionProps ) {
  if ( !creators || creators.length === 0 ) {
    return (
      <div className='flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl'>
        <p className='text-muted-foreground'>No creators assigned yet</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      { creators.map( ( creator, index ) => (
        <CreatorCard
          key={ index }
          creator={ creator }
          onViewDetails={ () => { } }
        />
      ) ) }
    </div>
  );
}
