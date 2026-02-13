'use client';

// import { Person } from '../types';

interface CampaignInvitationsSectionProps {
  campaignId: string;
}

export function CampaignInvitationsSection( { campaignId: _campaignId }: CampaignInvitationsSectionProps ) {
  return (
    <div className='flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl'>
      <p className='text-muted-foreground'>Invitations management coming soon</p>
    </div>
  );
}
