'use client';

import { useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { Loader2, Video } from 'lucide-react';
import { SubmissionCard } from '@/components/campaigns/submission-card';

interface CampaignSubmissionsSectionProps {
  campaignId: string;
}

export function CampaignSubmissionsSection( { campaignId }: CampaignSubmissionsSectionProps ) {
  const { data: submissionsData, isLoading, error } = useCampaignSubmissions( campaignId );

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        Error loading submissions: { error.message }
      </div>
    );
  }

  const submissions = submissionsData?.data || [];

  if ( submissions.length === 0 ) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
        <div className="p-4 bg-background rounded-full border shadow-sm">
          <Video className="size-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">No submissions yet</p>
        <p className="text-sm text-muted-foreground">Video submissions for this campaign will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { submissions.map( ( submission ) => (
        <SubmissionCard
          key={ submission.id }
          submission={ submission }
          layout="media-overlay"
          overlayDetailsMode="always"
        />
      ) ) }
    </div>
  );
}
