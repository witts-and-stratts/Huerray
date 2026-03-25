'use client';

import { Activity, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { SubmissionsRecentPanel, type RecentSubmissionItem } from '@/components/dashboard/blocks/admin/submissions-recent-panel';
import { SubmissionsStatsPanel } from '@/components/dashboard/blocks/admin/submissions-stats-panel';
import { useTranslations } from 'next-intl';

export function BrandSubmissionsStatsBlock() {
  const t = useTranslations( 'dashboard.brand.landing.submissionsStats' );
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: submissionsResponse, isLoading, isError } = useBrandVideoSubmissions( { limit: 20, page: 1 } );

  const submissions = useMemo(
    () => ( submissionsResponse?.data || [] ) as ModelsVideoSubmissionResponse[],
    [ submissionsResponse ]
  );

  const parsed = useMemo( () => {
    const total = submissionsResponse?.pagination?.total || submissions.length;
    const pending = submissions.filter( ( item ) => item.status === 'pending_approval' ).length;
    const approved = submissions.filter( ( item ) => item.status === 'approved' ).length;

    return [
      { label: t( 'totalSubmissions' ), value: `${ total }`, delta: '+0.0%', numeric: total },
      { label: t( 'pendingSubmissions' ), value: `${ pending }`, delta: pending > 0 ? '-0.0%' : '+0.0%', numeric: pending },
      { label: t( 'approvedSubmissions' ), value: `${ approved }`, delta: '+0.0%', numeric: approved },
    ];
  }, [ submissions, submissionsResponse?.pagination?.total, t ] );

  const recentItems = useMemo<RecentSubmissionItem[]>( () => {
    return [ ...submissions ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 12 )
      .map( ( item ) => ( { raw: item } ) );
  }, [ submissions ] );

  return (
    <Card className="ad-summary-card justify-start">
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
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loadingSubmissions' ) }</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'errorSubmissions' ) }</p> }
            { !isLoading && !isError && <SubmissionsStatsPanel items={ parsed } /> }
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loadingRecentSubmissions' ) }</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">{ t( 'errorRecentSubmissions' ) }</p> }
            { !isLoading && !isError && recentItems.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
            ) }
            { !isLoading && !isError && recentItems.length > 0 && <SubmissionsRecentPanel items={ recentItems } /> }
          </Activity>
        </Tabs>
      </CardContent>
    </Card>
  );
}
