'use client';

import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import { Loader2, FileText } from 'lucide-react';
import { ApplicationCard } from '@/components/campaigns/application-card';

interface CampaignApplicationsSectionProps {
  campaignId: string;
}

export function CampaignApplicationsSection( { campaignId }: CampaignApplicationsSectionProps ) {
  const { data: applicationsData, isLoading, error } = useCampaignApplications( campaignId );

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
        Error loading applications: { error.message }
      </div>
    );
  }

  const applications = applicationsData?.data || [];

  if ( applications.length === 0 ) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
        <div className="p-4 bg-background rounded-full border shadow-sm">
          <FileText className="size-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">No applications yet</p>
        <p className="text-sm text-muted-foreground">Applications from creators will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { applications.map( ( application ) => (
        <ApplicationCard key={ application.id } application={ application } />
      ) ) }
    </div>
  );
}
