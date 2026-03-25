'use client';
import Link from 'next/link';
import { Activity, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Tabs, TabsList, TabsTab, TabsPanel, TabsPanels } from '@/components/animate-ui/components/base/tabs';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

export function CampaignStatsBlock() {
  const t = useTranslations( 'dashboard.admin' );
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: campaignsResponse, isLoading, isError } = useCampaigns( { limit: 100, page: 1 } );
  const campaigns = useMemo( () => ( campaignsResponse?.data || [] ) as ModelsCampaignResponse[], [ campaignsResponse ] );

  const parsed = useMemo( () => {
    const total = campaignsResponse?.pagination?.total || campaigns.length;
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
      { label: t( 'dashboardBlocks.campaigns.stats.total' ), value: `${ total }`, numeric: total },
      { label: t( 'dashboardBlocks.campaigns.stats.active' ), value: `${ active }`, numeric: active },
      { label: t( 'dashboardBlocks.campaigns.stats.finished' ), value: `${ finished }`, numeric: finished },
      { label: t( 'dashboardBlocks.campaigns.stats.draft' ), value: `${ draft }`, numeric: draft },
    ];
  }, [ campaigns, campaignsResponse?.pagination?.total, t ] );

  const recentCampaigns = useMemo( () => {
    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 10 );
  }, [ campaigns ] );

  const maxValue = Math.max( ...parsed.map( ( item ) => item.numeric ), 1 );

  const statusVariant = ( status: string ) => {
    const normalized = status.toLowerCase();
    if ( [ 'active', 'in_progress', 'ongoing', 'open' ].includes( normalized ) ) return 'secondary' as const;
    if ( [ 'rejected', 'returned' ].includes( normalized ) ) return 'destructive' as const;
    return 'outline' as const;
  };

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.campaigns.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'dashboardBlocks.campaigns.description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTab value="stats" className={ 'text-xs font-normal' }>{ t( 'dashboardBlocks.campaigns.tabs.stats' ) }</TabsTab>
            <TabsTab value="recent" className={ 'text-xs font-normal' }>{ t( 'dashboardBlocks.campaigns.tabs.recent' ) }</TabsTab>
          </TabsList>

          <TabsPanels>
            <TabsPanel value="stats" keepMounted>
              { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'dashboardBlocks.campaigns.states.loading' ) }</p> }
              { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'dashboardBlocks.campaigns.states.error' ) }</p> }
              { !isLoading && !isError && (
                <div className="grid grid-cols-2 gap-2">
                  { parsed.map( ( item ) => {
                    const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

                    return (
                      <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
                        <div className="mb-1.5 flex items-end justify-between gap-3">
                          <p className="ad-stat-label">{ item.label }</p>
                        </div>
                        <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={ { width: `${ widthPct }%` } }
                          />
                        </div>
                      </div>
                    );
                  } ) }
                </div>
              ) }
            </TabsPanel>

            <TabsPanel value="recent" keepMounted>
              { isLoading && (
                <div className="space-y-2">
                  { Array.from( { length: 4 } ).map( ( _, index ) => (
                    <div key={ `recent-campaign-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                          <div className="min-w-0 space-y-1.5">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-56" />
                            <Skeleton className="h-3 w-28" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </div>
                  ) ) }
                </div>
              ) }
              { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'dashboardBlocks.campaigns.states.recentError' ) }</p> }
              { !isLoading && !isError && recentCampaigns.length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'dashboardBlocks.campaigns.states.empty' ) }</p>
              ) }
              { !isLoading && !isError && recentCampaigns.length > 0 && (
                <ScrollArea className="h-[240px] pr-2" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
                  <motion.div className="space-y-2">
                    <AnimatePresence>
                      { recentCampaigns.map( ( campaign, index ) => {
                        const campaignId = campaign.id || campaign.campaign_id;
                        const campaignName = campaign.campaign_name || t( 'dashboardBlocks.campaigns.labels.untitled' );
                        const status = String( campaign.campaign_status || 'draft' );
                        const submittedAt = campaign.created_at
                          ? new Date( campaign.created_at ).toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } )
                          : t( 'campaignOverview.workflow.labels.na' );

                        return (
                          <motion.div
                            initial={ { opacity: 0, y: 10 } }
                            animate={ { opacity: 1, y: 0 } }
                            exit={ { opacity: 0, y: -10 } }
                            transition={ { duration: 0.8, delay: index * 0.05 } }
                            key={ campaignId || `${ campaignName }-${ submittedAt }` }
                            className="rounded-lg border border-border/60 bg-white p-2.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-start gap-2.5">
                                <Avatar size="sm" className="shrink-0">
                                  <AvatarImage
                                    src={ campaign.brand?.profile_photo?.asset || '' }
                                    alt={ campaign.brand?.company_name || campaignName }
                                  />
                                  <AvatarFallback>{ ( campaign.brand?.company_name || campaignName ).slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <Link
                                    href={ campaignId ? `/admin/campaigns/${ campaignId }` : '/admin/campaigns' }
                                    className="text-sm font-medium text-primary hover:underline underline-offset-2"
                                  >
                                    { campaignName }
                                  </Link>
                                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={ { __html: campaign.description?.replace( '<p>', '' ).replace( '</p>', '' ) || t( 'dashboardBlocks.campaigns.labels.noDescription' ) } } />
                                  <p className="mt-0.5 text-xs text-muted-foreground/60">{ t( 'dashboardBlocks.campaigns.labels.created' ) } { submittedAt }</p>
                                </div>
                              </div>
                              <Badge variant={ statusVariant( status ) } className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
                                { status.replace( /_/g, ' ' ) }
                              </Badge>
                            </div>
                          </motion.div>
                        );
                      } ) }
                    </AnimatePresence>
                  </motion.div>
                </ScrollArea>
              ) }
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size={ 'sm' }
          className="mt-2 w-full font-normal"
          render={ <Link href="/admin/campaigns" /> }
        >
          { t( 'dashboardBlocks.campaigns.labels.viewAll' ) }
        </Button>
      </CardFooter>
    </Card>
  );
}
