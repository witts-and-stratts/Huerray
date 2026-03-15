'use client';

import Link from 'next/link';
import { Activity, useMemo, useState } from 'react';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useBrandGigs } from '@/lib/api/hooks/brands';
import type { ModelsGigBrandResponse } from '@/lib/api/generated/models';
import { GigsRecentPanel } from '@/components/dashboard/blocks/admin/gigs-recent-panel';
import { GigsStatsPanel } from '@/components/dashboard/blocks/admin/gigs-stats-panel';

export function BrandGigsStatsBlock() {
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: gigsResponse, isLoading, isError } = useBrandGigs( { limit: 100, page: 1 } );
  const gigs = useMemo( () => ( gigsResponse?.data || [] ) as ModelsGigBrandResponse[], [ gigsResponse ] );

  const chartData = useMemo( () => {
    const total = gigsResponse?.pagination?.total || gigs.length;
    const open = gigs.filter( ( gig ) => gig.gig_status === 'open' || gig.gig_status === 'in_progress' || gig.gig_status === 'validated' ).length;
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
      const brand = gig.brand?.company_name || gig.campaign_name || 'Brand';
      const brandLogo = gig.brand?.profile_photo?.asset || '';
      const submittedAt = gig.created_at
        ? new Date( gig.created_at ).toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } )
        : 'N/A';

      return {
        brand,
        brandLogo,
        title: gig.title || 'Untitled Gig',
        url: '/brand/campaigns',
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
            <TabsTrigger value="stats" className={ 'text-xs font-normal' }>Stats</TabsTrigger>
            <TabsTrigger value="recent" className={ 'text-xs font-normal' }>Recent Gigs</TabsTrigger>
          </TabsList>

          <Activity mode={ activeTab === 'stats' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading gigs...</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load gigs.</p> }
            { !isLoading && !isError && <GigsStatsPanel chartData={ chartData } /> }
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading recent gigs...</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load recent gigs.</p> }
            { !isLoading && !isError && recentGigItems.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">No gigs found.</p>
            ) }
            { !isLoading && !isError && recentGigItems.length > 0 && <GigsRecentPanel items={ recentGigItems } /> }
          </Activity>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size={ 'sm' }
          className="mt-2 w-full font-normal"
          render={ <Link href="/brand/campaigns" /> }
        >
          View all Gigs
        </Button>
      </CardFooter>
    </Card>
  );
}
