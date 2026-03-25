'use client';

import Link from 'next/link';
import { Activity, useMemo, useState } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useTranslations } from "next-intl";
import { ModelsCampaignResponse } from '@/lib/api/generated';

interface BrandCampaignsTableBlockProps {
  brandId: string;
  campaigns: ModelsCampaignResponse[];
  isLoading: boolean;
}

export function BrandCampaignsTableBlock( { brandId, campaigns, isLoading }: BrandCampaignsTableBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );

  const stats = useMemo( () => {
    const total = campaigns.length;
    const active = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'active', 'in_progress', 'ongoing', 'open' ].includes( status );
    } ).length;
    const finished = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'completed', 'finished', 'closed' ].includes( status );
    } ).length;
    const draft = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'draft', 'pending', 'pending_approval' ].includes( status );
    } ).length;

    return [
      { label: 'Total', value: `${ total }`, numeric: total },
      { label: 'Active', value: `${ active }`, numeric: active },
      { label: 'Finished', value: `${ finished }`, numeric: finished },
      { label: 'Draft', value: `${ draft }`, numeric: draft },
    ];
  }, [ campaigns ] );

  const recentCampaigns = useMemo( () => {
    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 10 );
  }, [ campaigns ] );

  const maxValue = Math.max( ...stats.map( ( item ) => item.numeric ), 1 );

  const statusVariant = ( status: string ) => {
    const normalized = status.toLowerCase();
    if ( [ 'active', 'in_progress', 'ongoing', 'open' ].includes( normalized ) ) return 'secondary' as const;
    if ( [ 'rejected', 'returned' ].includes( normalized ) ) return 'destructive' as const;
    return 'outline' as const;
  };

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'brandCampaignsTableBlock.campaigns' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'brandCampaignsTableBlock.brandCampaignActivityAnd' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTrigger value="stats" className={ 'text-xs font-normal' }>{ t( 'brandCampaignsTableBlock.stats' ) }</TabsTrigger>
            <TabsTrigger value="recent" className={ 'text-xs font-normal' }>{ t( 'brandCampaignsTableBlock.recentCampaigns' ) }</TabsTrigger>
          </TabsList>

          <Activity mode={ activeTab === 'stats' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'brandCampaignsTableBlock.loadingCampaignStats' ) }</p> }
            { !isLoading && (
              <div className="grid grid-cols-2 gap-2">
                { stats.map( ( item ) => {
                  const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

                  return (
                    <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="mb-1.5 flex items-end justify-between gap-3">
                        <p className="ad-stat-label">{ item.label }</p>
                      </div>
                      <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary transition-all" style={ { width: `${ widthPct }%` } } />
                      </div>
                    </div>
                  );
                } ) }
              </div>
            ) }
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'brandCampaignsTableBlock.loadingRecentCampaigns' ) }</p> }
            { !isLoading && recentCampaigns.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'brandCampaignsTableBlock.noCampaignsYet' ) }</p>
            ) }
            { !isLoading && recentCampaigns.length > 0 && (
              <ScrollArea className="h-[420px] pr-2" scrollbar={ {
                orientation: 'horizontal',
                style: { width: '6px', opacity: 0.5 }
              } }>
                { recentCampaigns.map( ( campaign ) => {
                  const campaignId = campaign.id || campaign.campaign_id;
                  const campaignName = campaign.campaign_name || t( 'brandCampaignsTableBlock.untitledCampaign' );
                  const status = String( campaign.campaign_status || 'draft' );
                  const submittedAt = campaign.created_at
                    ? new Date( campaign.created_at ).toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } )
                    : 'N/A';

                  return (
                    <div key={ campaignId || `${ campaignName }-${ submittedAt }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={ campaignId ? `/admin/campaigns/${ campaignId }` : `/admin/brands/${ brandId }/campaigns` }
                            className="text-sm font-medium text-primary hover:underline underline-offset-2"
                          >
                            { campaignName }
                          </Link>
                          <p className="mt-0.5 text-xs text-muted-foreground">{ t( 'brandCampaignsTableBlock.created' ) }{ submittedAt }</p>
                        </div>
                        <Badge variant={ statusVariant( status ) } className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
                          { status.replace( /_/g, ' ' ) }
                        </Badge>
                      </div>
                    </div>
                  );
                } ) }
              </ScrollArea>
            ) }
          </Activity>
        </Tabs>
      </CardContent>
    </Card>
  );
}
