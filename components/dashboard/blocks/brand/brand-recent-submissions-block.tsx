'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsList, TabsTab, TabsPanel, TabsPanels } from '@/components/animate-ui/components/base/tabs';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { StatsBarChart } from '@/components/dashboard/blocks/shared/stats-bar-chart';
import { useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

export function BrandRecentSubmissionsBlock() {
  const t = useTranslations( 'dashboard.brand.landing.recentSubmissions' );
  const [ activeTab, setActiveTab ] = useState<'recent' | 'stats'>( 'recent' );
  const { data: submissionsResponse, isLoading, isError } = useBrandVideoSubmissions( { limit: 50, page: 1 } );

  const submissions = useMemo<ModelsVideoSubmissionResponse[]>( () => {
    const list = ( submissionsResponse?.data || [] ) as ModelsVideoSubmissionResponse[];
    return [ ...list ].sort( ( a, b ) => {
      const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
      const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
      return bTime - aTime;
    } );
  }, [ submissionsResponse ] );

  const recentSubmissions = useMemo( () => submissions.slice( 0, 12 ), [ submissions ] );

  const stats = useMemo( () => {
    const total = submissionsResponse?.pagination?.total || submissions.length;
    const pending = submissions.filter( ( item ) => item.status === 'pending_approval' ).length;
    const approved = submissions.filter( ( item ) => item.status === 'approved' ).length;

    return [
      { label: t( 'stats.total' ), value: total },
      { label: t( 'stats.approved' ), value: approved },
      { label: t( 'stats.pending' ), value: pending },
    ];
  }, [ submissions, submissionsResponse?.pagination?.total, t ] );

  return (
    <Card className="ad-summary-card flex flex-col bg-burgundy-50">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'recent' | 'stats' ) }>
          <TabsList variant="default" className="mb-2 w-full bg-primary/5">
            <TabsTab value="recent" className="text-xs font-normal">{ t( 'tabs.recent' ) }</TabsTab>
            <TabsTab value="stats" className="text-xs font-normal">{ t( 'tabs.stats' ) }</TabsTab>
          </TabsList>

          <TabsPanels>
            <TabsPanel value="recent" keepMounted>
              { isLoading && (
                <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loading' ) }</p>
              ) }
              { isError && (
                <p className="py-8 text-center text-xs text-destructive">{ t( 'error' ) }</p>
              ) }
              { !isLoading && !isError && recentSubmissions.length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
              ) }
              { !isLoading && !isError && recentSubmissions.length > 0 && (
                <ScrollArea
                  className="h-full w-full pb-3"
                  scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }
                >
                  <div className="flex gap-3">
                    { recentSubmissions.map( ( submission ) => (
                      <div
                        key={ submission.id || `${ submission.title }-${ submission.created_at }` }
                        className="h-[180px] aspect-16/9 lg:aspect-4/3 lg:h-[270px] shrink-0"
                      >
                        <SubmissionCard submission={ submission } layout="media-overlay" fullHeight />
                      </div>
                    ) ) }
                  </div>
                </ScrollArea>
              ) }
            </TabsPanel>

            <TabsPanel value="stats" keepMounted>
              { isLoading && (
                <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loading' ) }</p>
              ) }
              { isError && (
                <p className="py-8 text-center text-xs text-destructive">{ t( 'error' ) }</p>
              ) }
              { activeTab === 'stats' && !isLoading && !isError && (
                <StatsBarChart chartData={ stats } dataLabel={ t( 'title' ) } color="var(--chart-3)" />
              ) }
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
    </Card>
  );
}
