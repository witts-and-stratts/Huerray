'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Button } from '@/components/dashboard-ui/button';
import { Tabs, TabsList, TabsTab, TabsPanel, TabsPanels } from '@/components/animate-ui/components/base/tabs';
import { useGigs } from '@/lib/api/hooks/gigs';
import { GigsRecentPanel } from './gigs-recent-panel';
import { GigsStatsPanel } from './gigs-stats-panel';
import type { ModelsGigResponse } from '@/lib/api/generated/models';

export function GigsStatsBlock() {
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: gigsResponse, isLoading, isError } = useGigs( { limit: 100, page: 1 } );
  const gigs = useMemo( () => ( gigsResponse?.data || [] ) as ModelsGigResponse[], [ gigsResponse ] );

  const chartData = useMemo( () => {
    const total = gigsResponse?.pagination?.total || gigs.length;
    const open = gigs.filter( ( gig ) => gig.gig_status === 'open' || gig.gig_status === 'in_progress' ).length;
    const completed = gigs.filter( ( gig ) => gig.gig_status === 'completed' ).length;

    return [
      { label: 'Total Gigs', gigs: total },
      { label: 'Open Gigs', gigs: open },
      { label: 'Completed Gigs', gigs: completed },
    ];
  }, [ gigs, gigsResponse?.pagination?.total ] );

  const recentGigItems = useMemo( () => {
    const sorted = [ ...gigs ].sort( ( a, b ) => {
      const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
      const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
      return bTime - aTime;
    } );

    return sorted.slice( 0, 5 ).map( ( gig ) => {
      const brand = gig.campaign_name || 'Brand';
      const brandLogo = '';
      const submittedAt = gig.created_at
        ? new Date( gig.created_at ).toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } )
        : 'N/A';

      return {
        brand,
        brandLogo,
        title: gig.title || 'Untitled Gig',
        url: gig.campaign_id && gig.id ? `/admin/campaigns/${ gig.campaign_id }/gigs/${ gig.id }/edit` : '/admin/gigs',
        submittedAt,
        status: gig.gig_status || 'open',
      };
    } );
  }, [ gigs ] );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Gigs</CardTitle>
        <CardDescription className="ad-card-description">Gig lifecycle and delivery progress overview</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTab value="stats" className={ 'text-xs font-normal' }>Stats</TabsTab>
            <TabsTab value="recent" className={ 'text-xs font-normal' }>Recent Gigs</TabsTab>
          </TabsList>

          <TabsPanels>
            <TabsPanel value="stats" keepMounted>
              { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading gigs...</p> }
              { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load gigs.</p> }
              { !isLoading && !isError && <GigsStatsPanel chartData={ chartData } /> }
            </TabsPanel>

            <TabsPanel value="recent" keepMounted>
              { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading recent gigs...</p> }
              { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load recent gigs.</p> }
              { !isLoading && !isError && recentGigItems.length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">No gigs found.</p>
              ) }
              { !isLoading && !isError && recentGigItems.length > 0 && <GigsRecentPanel items={ recentGigItems } /> }
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size={ 'sm' }
          className="mt-2 w-full font-normal"
          render={ <Link href="/admin/gigs" /> }
        >
          View all Gigs
        </Button>
      </CardFooter>
    </Card>
  );
}
