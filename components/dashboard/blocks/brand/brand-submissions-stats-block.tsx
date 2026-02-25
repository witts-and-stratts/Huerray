'use client';

import { Activity, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { SubmissionsRecentPanel, type RecentSubmissionItem } from '@/components/dashboard/blocks/admin/submissions-recent-panel';
import { SubmissionsStatsPanel } from '@/components/dashboard/blocks/admin/submissions-stats-panel';

export function BrandSubmissionsStatsBlock() {
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
      { label: 'Total Submissions', value: `${ total }`, delta: '+0.0%', numeric: total },
      { label: 'Pending Submissions', value: `${ pending }`, delta: pending > 0 ? '-0.0%' : '+0.0%', numeric: pending },
      { label: 'Approved Submissions', value: `${ approved }`, delta: '+0.0%', numeric: approved },
    ];
  }, [ submissions, submissionsResponse?.pagination?.total ] );

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
        <CardTitle className="ad-card-title">Submissions</CardTitle>
        <CardDescription className="ad-card-description">Submission review status and throughput snapshot</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTrigger value="stats" className={ 'text-xs font-normal' }>Stats</TabsTrigger>
            <TabsTrigger value="recent" className={ 'text-xs font-normal' }>Recent Submissions</TabsTrigger>
          </TabsList>

          <Activity mode={ activeTab === 'stats' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading submissions...</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load submissions.</p> }
            { !isLoading && !isError && <SubmissionsStatsPanel items={ parsed } /> }
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading recent submissions...</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p> }
            { !isLoading && !isError && recentItems.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">No submissions found.</p>
            ) }
            { !isLoading && !isError && recentItems.length > 0 && <SubmissionsRecentPanel items={ recentItems } /> }
          </Activity>
        </Tabs>
      </CardContent>
    </Card>
  );
}
