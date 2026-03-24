'use client';

import { EmptyApplications } from '@/components/admin/empty-states/empty-applications';
import { ApplicationCard } from '@/components/campaigns/application-card';
import { Button } from '@/components/dashboard-ui/button';
import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import { Loader2 } from 'lucide-react';

interface CampaignApplicationsSectionProps {
  campaignId: string;
}

export function CampaignApplicationsSection( { campaignId }: CampaignApplicationsSectionProps ) {
  const { data: applicationsData, isLoading, error, refetch } = useCampaignApplications( campaignId );
  const handleRetry = () => {
    refetch();
  };

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { applications.map( ( application ) => (
        <ApplicationCard key={ application.id } application={ application } />
      ) ) }
    </div>
  );
}
