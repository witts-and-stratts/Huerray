'use client';

import { CreatorCard } from '@/components/admin/creators/creator-card';
import { Person } from '../types';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';

interface CampaignCreatorsSectionProps {
  creators: Person[];
}

export function CampaignCreatorsSection( { creators }: CampaignCreatorsSectionProps ) {
  if ( !creators || creators.length === 0 ) {
    return (
      <div className='flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl'>
        <p className='text-muted-foreground'>No creators assigned yet</p>
      </div>
    );
  }

  // Map Person to ModelsCreatorResponse type for the card
  const mapPersonToCreator = ( person: Person, index: number ): ModelsCreatorResponse => {
    return {
      id: `CREATOR-${ index }`, // Person doesn't have ID, using index
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email || 'No email provided',
      creator_status: 'approved' as any, // Default status
      created_at: new Date().toISOString(), // Default date
      // username: `${ person.first_name }${ person.last_name }`.toLowerCase().replace( /\s/g, '' ), // Not in CreatorResponse? Check definition if needed, but CreatorResponse separates user mostly.
      // Actually ModelsCreatorResponse flat structure might differ. 
      // Let's rely on common fields or check definition.
      // Based on CreatorCard: fullName uses creator.first_name etc. 
      // CreatorResponse might not have username directly if it's in user.
      // But let's populate what we have.
    } as ModelsCreatorResponse;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      { creators.map( ( person, index ) => (
        <CreatorCard
          key={ index }
          creator={ mapPersonToCreator( person, index ) }
          onViewDetails={ () => { } }
        />
      ) ) }
    </div>
  );
}
