'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { EmptySubmission } from '@/components/admin/empty-states/empty-submissions';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';

interface GigSubmissionsSectionProps {
  gigId: string;
}

export function GigSubmissionsSection( { gigId }: GigSubmissionsSectionProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const { data: submissionsData, isLoading, error } = useVideoSubmissionsByGig( gigId );

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
        { t( 'errorLoadingSubmissions' ) }: { error.message }
      </div>
    );
  }

  const submissions = submissionsData?.data ?? [];

  if ( submissions.length === 0 ) {
    return (
      <EmptySubmission
        title={ t( 'noSubmissionsYet' ) }
        description={ t( 'noSubmissionsYetDescription' ) }
        fill
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
