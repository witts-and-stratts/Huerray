'use client';

import { useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { Loader2, Video } from 'lucide-react';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';
import { EmptySubmission } from '@/components/admin/empty-states/empty-submissions';

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
      <EmptySubmission
        title='No submissions yet'
        description='Video submissions for this campaign will appear here.'
        fill={ true }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { submissions.map( ( submission, index ) => (
        <SubmissionCard
          key={ `${ submission.id }-${ index }` }
          submission={ submission }
          layout="media-overlay"
          overlayDetailsMode="hover"
        />
      ) ) }
    </div>
  );
}
