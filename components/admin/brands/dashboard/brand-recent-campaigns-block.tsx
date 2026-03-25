'use client';

import { useMemo } from 'react';
import { CampaignCard } from '@/components/campaigns/campaign-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { useTranslations } from "next-intl";

interface BrandRecentCampaignsBlockProps {
  brandId: string;
}

function CampaignCardSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-white p-3">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function BrandRecentCampaignsBlock( { brandId }: BrandRecentCampaignsBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const { data: campaignsResponse, isLoading, isError } = useCampaigns( { brandId, limit: 20, page: 1 } );

  const recentCampaigns = useMemo<ModelsCampaignResponse[]>( () => {
    const campaigns = ( campaignsResponse?.data || [] ) as ModelsCampaignResponse[];

    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 6 )
      .map( ( campaign ) => ( { ...campaign } ) );
  }, [ campaignsResponse?.data ] );

  return (
    <Card className="ad-summary-card xl:col-span-2 grow">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'brandRecentCampaignsBlock.recentCampaigns' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'brandRecentCampaignsBlock.latestCampaignsForThis' ) }</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        { isLoading && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            { Array.from( { length: 4 } ).map( ( _, index ) => (
              <CampaignCardSkeleton key={ `recent-campaign-card-skeleton-${ index }` } />
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">{ t( 'brandRecentCampaignsBlock.unableToLoadRecent' ) }</p>
        ) }

        { !isLoading && !isError && recentCampaigns.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'brandRecentCampaignsBlock.noCampaignsYet' ) }</p>
        ) }

        { !isLoading && !isError && recentCampaigns.length > 0 && (
          <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
            <div className="flex w-max gap-2 p-0.5">
              { recentCampaigns.map( ( campaign ) => (
                <div key={ campaign.id || campaign.campaign_id || campaign.campaign_name } className="w-[320px] md:w-[360px] shrink-0">
                  <CampaignCard
                    campaign={ campaign }
                  />
                </div>
              ) ) }
            </div>
          </ScrollArea>
        ) }
      </CardContent>
    </Card>
  );
}
