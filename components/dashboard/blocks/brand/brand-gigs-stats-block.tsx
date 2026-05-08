'use client';

import Link from 'next/link';
import { Activity, useMemo, useState } from 'react';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useBrandGigs } from '@/lib/api/hooks/brands';
import type { ModelsGigBrandResponse, ModelsGigResponse } from '@/lib/api/generated/models';
import { GigCard } from '@/components/campaigns/gig-card';
import { GigsStatsPanel } from '@/components/dashboard/blocks/admin/gigs-stats-panel';
import { useTranslations } from 'next-intl';

export function BrandGigsStatsBlock() {
  const t = useTranslations( 'dashboard.brand.landing.gigsStats' );
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: gigsResponse, isLoading, isError } = useBrandGigs( { limit: 100, page: 1 } );
  const gigs = useMemo( () => ( gigsResponse?.data || [] ) as ModelsGigBrandResponse[], [ gigsResponse ] );

  const chartData = useMemo( () => {
    const total = gigsResponse?.pagination?.total || gigs.length;
    const open = gigs.filter( ( gig ) => gig.gig_status === 'open' || gig.gig_status === 'in_progress' || gig.gig_status === 'validated' ).length;
    const completed = gigs.filter( ( gig ) => gig.gig_status === 'completed' ).length;

    return [
      { label: t( 'totalGigs' ), gigs: total },
      { label: t( 'openGigs' ), gigs: open },
      { label: t( 'completedGigs' ), gigs: completed },
    ];
  }, [ gigs, gigsResponse?.pagination?.total, t ] );

  const recentGigs = useMemo( () => {
    return [ ...gigs ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 12 ) as unknown as ModelsGigResponse[];
  }, [ gigs ] );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTrigger value="stats" className={ 'text-xs font-normal' }>{ t( 'tabs.stats' ) }</TabsTrigger>
            <TabsTrigger value="recent" className={ 'text-xs font-normal' }>{ t( 'tabs.recent' ) }</TabsTrigger>
          </TabsList>

          <Activity mode={ activeTab === 'stats' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loadingGigs' ) }</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'errorGigs' ) }</p> }
            { activeTab === 'stats' && !isLoading && !isError && <GigsStatsPanel chartData={ chartData } /> }
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loadingRecentGigs' ) }</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'errorRecentGigs' ) }</p> }
            { !isLoading && !isError && recentGigs.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
            ) }
            { !isLoading && !isError && recentGigs.length > 0 && (
              <ScrollArea
                className="w-full p-1 pb-3"
                scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }
              >
                <div className="flex gap-3">
                  { recentGigs.map( ( gig ) => (
                    <div key={ gig.id } className="w-80 shrink-0 m-px">
                      <GigCard gig={ gig } onViewGig={ () => { } } />
                    </div>
                  ) ) }
                </div>
              </ScrollArea>
            ) }
          </Activity>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size={ 'sm' }
          className="mt-2 w-full font-normal"
          nativeButton={ false }
          render={ <Link href="/brand/campaigns" /> }
        >
          { t( 'viewAll' ) }
        </Button>
      </CardFooter>
    </Card>
  );
}
