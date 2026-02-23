'use client';

import { Activity, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { useVideoSubmissionsSearch } from '@/lib/api/hooks/video-submissions';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';

export function SubmissionsStatsBlock() {
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: submissionsResponse, isLoading, isError } = useVideoSubmissionsSearch( { limit: 20, page: 1 } );
  const submissions = useMemo( () => ( submissionsResponse?.data || [] ) as ModelsVideoSubmissionResponse[], [ submissionsResponse ] );

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

  const maxValue = Math.max( ...parsed.map( ( item ) => item.numeric ), 1 );

  const recentItems = useMemo( () => {
    const sorted = [ ...submissions ].sort( ( a, b ) => {
      const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
      const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
      return bTime - aTime;
    } );

    const asRecord = ( value: unknown ) => ( value && typeof value === 'object' ? value as Record<string, unknown> : undefined );
    const asString = ( value: unknown ) => ( typeof value === 'string' ? value : undefined );

    return sorted.slice( 0, 12 ).map( ( item ) => {
      const gig = asRecord( item.gig );
      const brandDetails = asRecord( gig?.brand );
      const campaign = asRecord( gig?.campaign );
      const brand = asString( brandDetails?.company_name ) || asString( gig?.campaign_name ) || 'Brand';
      const brandLogo = asString( brandDetails?.profile_photo_url ) || asString( brandDetails?.logo_url ) || '';
      const creator = item.creator?.first_name || item.creator?.last_name
        ? `${ item.creator?.first_name || '' } ${ item.creator?.last_name || '' }`.trim()
        : 'Creator';
      const campaignName = asString( campaign?.campaign_name ) || asString( gig?.campaign_name ) || 'Campaign';
      const submittedAt = item.created_at
        ? new Date( item.created_at ).toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } )
        : 'N/A';

      return {
        title: item.title || 'Untitled Submission',
        url: item.id ? `/admin/submissions/${ item.id }` : '/admin/submissions',
        videoUrl: item.video_url || '',
        brand,
        brandLogo,
        creator,
        submittedAt,
        status: item.status || 'pending_approval',
        campaign: campaignName,
      };
    } );
  }, [ submissions ] );

  const statusVariant = ( status: string ) => {
    if ( status === 'approved' ) return 'secondary' as const;
    if ( status === 'returned' ) return 'destructive' as const;
    return 'outline' as const;
  };

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
            { !isLoading && !isError && (
              <div className="space-y-2">
                { parsed.map( ( item ) => {
                  const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

                  return (
                    <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="mb-1.5 flex items-end justify-between gap-3">
                        <p className="ad-stat-label">{ item.label }</p>
                        <span className={ item.delta.startsWith( '-' ) ? 'ad-delta-negative-compact' : 'ad-delta-positive-compact' }>
                          { item.delta }
                        </span>
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
          </Activity>

          <Activity mode={ activeTab === 'recent' ? 'visible' : 'hidden' }>
            { isLoading && <p className="py-8 text-center text-xs text-muted-foreground">Loading recent submissions...</p> }
            { isError && <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p> }
            { !isLoading && !isError && recentItems.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">No submissions found.</p>
            ) }
            { !isLoading && !isError && recentItems.length > 0 && (
              <ScrollArea className="h-[420px] pr-2" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
                <div className="space-y-2">
                  { recentItems.map( ( submission ) => (
                    <div key={ `${ submission.title }-${ submission.submittedAt }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                        <div className="md:col-span-5">
                          <video
                            src={ submission.videoUrl }
                            className="aspect-video w-full rounded-sm bg-black/10 object-cover"
                            controls
                            preload="metadata"
                          />
                          <div className="mt-2 flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarImage src={ submission.brandLogo } alt={ submission.brand } />
                              <AvatarFallback>{ submission.brand.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                            </Avatar>
                            <p className="text-xs text-muted-foreground">{ submission.brand }</p>
                          </div>
                        </div>
                        <div className="md:col-span-7">
                          <div>
                            <Link href={ submission.url } className="text-sm font-medium text-primary hover:underline underline-offset-2">
                              { submission.title }
                            </Link>
                            <p className="mt-0.5 text-xs text-muted-foreground">Creator: { submission.creator }</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">Campaign: { submission.campaign }</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">Submitted: { submission.submittedAt }</p>
                            <Badge
                              variant={ statusVariant( submission.status ) }
                              className="mt-2 h-5 px-1.5 py-0 text-[10px] font-medium capitalize"
                            >
                              { submission.status.replace( /_/g, ' ' ) }
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) ) }
                </div>
              </ScrollArea>
            ) }
          </Activity>
        </Tabs>
      </CardContent>
    </Card>
  );
}
