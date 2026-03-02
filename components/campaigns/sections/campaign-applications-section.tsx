'use client';

import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import { Loader2, FileText } from 'lucide-react';
import { ApplicationCard } from '@/components/campaigns/application-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';

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
      <Empty className='border py-20 my-6 flex-1 bg-white'>
        <EmptyHeader>
          <EmptyMedia>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </EmptyMedia>
          <EmptyTitle className='font-normal font-primary text-primary'>No applications yet</EmptyTitle>
          <EmptyDescription>
            Applications from creators will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
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
