'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { useBrand } from '@/lib/api/hooks/brands';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import { useGigs } from '@/lib/api/hooks/gigs';
import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import type { ModelCampaign } from '@/components/campaigns/types';
import { VideoSubmissionsApi } from '@/lib/api/generated/api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import type { ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Separator } from '@/components/dashboard-ui/separator';
import { getCountryFlag } from '@/lib/country-flags';
import { BrandStatusBadge } from '@/components/admin/brands/brand-status-badge';

function toDateLabel( value?: string ) {
  if ( !value ) return 'N/A';

  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return 'N/A';

  return date.toLocaleDateString( 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } );
}

function toCurrency( value: number ) {
  return new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  } ).format( value );
}

export default function BrandDashboardPage() {
  const params = useParams<{ id: string; }>();
  const brandId = params.id;

  const { data: brandData, isLoading: isBrandLoading, error: brandError } = useBrand( brandId );
  const { data: campaignsData, isLoading: isCampaignsLoading } = useBrandCampaigns( { brandId } );
  const { data: gigsData } = useGigs( { brandId, page: 1, limit: 500 } );

  const brand = useMemo( () => {
    if ( !brandData?.data ) return null;
    return Array.isArray( brandData.data ) ? brandData.data[ 0 ] : brandData.data;
  }, [ brandData ] );

  const campaigns = useMemo<ModelCampaign[]>( () => {
    if ( !campaignsData?.data || !Array.isArray( campaignsData.data ) ) return [];
    return campaignsData.data as unknown as ModelCampaign[];
  }, [ campaignsData ] );

  const gigs = useMemo<ModelsGigResponse[]>( () => {
    if ( !gigsData?.data || !Array.isArray( gigsData.data ) ) return [];
    return gigsData.data;
  }, [ gigsData ] );

  const campaignMetrics = useMemo( () => {
    const total = campaigns.length;

    const active = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'active', 'in_progress', 'ongoing', 'open' ].includes( status );
    } ).length;

    const finished = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'completed', 'finished', 'closed' ].includes( status );
    } ).length;

    const draft = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'draft', 'pending', 'pending_approval' ].includes( status );
    } ).length;

    return { total, active, finished, draft };
  }, [ campaigns ] );

  const spendMetrics = useMemo( () => {
    const totalGigs = gigs.length;

    const totalSpend = gigs.reduce( ( sum, gig ) => {
      if ( typeof gig.gig_cost === 'number' ) return sum + gig.gig_cost;
      if ( typeof gig.compensation === 'number' && typeof gig.number_of_videos === 'number' ) {
        return sum + ( gig.compensation * gig.number_of_videos );
      }
      if ( typeof gig.compensation === 'number' ) return sum + gig.compensation;
      return sum;
    }, 0 );

    const avgGigSpend = totalGigs > 0 ? totalSpend / totalGigs : 0;
    const totalVideosRequested = campaigns.reduce(
      ( sum, campaign ) => sum + ( typeof campaign.number_of_videos_wanted === 'number' ? campaign.number_of_videos_wanted : 0 ),
      0
    );
    const totalCreatorsRequested = campaigns.reduce(
      ( sum, campaign ) => sum + ( typeof campaign.number_of_creators_wanted === 'number' ? campaign.number_of_creators_wanted : 0 ),
      0
    );

    return { totalSpend, avgGigSpend, totalGigs, totalVideosRequested, totalCreatorsRequested };
  }, [ campaigns, gigs ] );

  const financialRows = useMemo( () => ( [
    { label: 'Total Spend', value: toCurrency( spendMetrics.totalSpend ), numeric: spendMetrics.totalSpend || 0 },
    { label: 'Avg Gig Spend', value: toCurrency( spendMetrics.avgGigSpend ), numeric: spendMetrics.avgGigSpend || 0 },
  ] ), [ spendMetrics.avgGigSpend, spendMetrics.totalSpend ] );

  const campaignRows = useMemo( () => ( [
    { label: 'Total Campaigns', value: `${ campaignMetrics.total }`, numeric: campaignMetrics.total },
    { label: 'Active Campaigns', value: `${ campaignMetrics.active }`, numeric: campaignMetrics.active },
    { label: 'Finished Campaigns', value: `${ campaignMetrics.finished }`, numeric: campaignMetrics.finished },
    { label: 'Draft Campaigns', value: `${ campaignMetrics.draft }`, numeric: campaignMetrics.draft },
  ] ), [ campaignMetrics.active, campaignMetrics.draft, campaignMetrics.finished, campaignMetrics.total ] );

  const campaignIds = useMemo(
    () => campaigns
      .map( ( campaign ) => campaign.id || campaign.campaign_id )
      .filter( ( id ): id is string => Boolean( id ) ),
    [ campaigns ]
  );

  const {
    data: recentSubmissions = [],
    isLoading: isRecentSubmissionsLoading,
    isError: isRecentSubmissionsError,
  } = useQuery( {
    queryKey: [ 'brand-recent-submissions', brandId, campaignIds ],
    enabled: campaignIds.length > 0,
    queryFn: async () => {
      const videoSubmissionsApi = new VideoSubmissionsApi( apiConfiguration, undefined, apiClient );
      const responses = await Promise.all(
        campaignIds.slice( 0, 10 ).map( async ( campaignId ) => {
          try {
            const response = await videoSubmissionsApi.videosCampaignCampaignIdGet( { campaignId } );
            return response.data?.data || [];
          } catch {
            return [];
          }
        } )
      );

      const merged = responses.flat() as ModelsVideoSubmissionResponse[];
      const byId = new Map<string, ModelsVideoSubmissionResponse>();

      for ( const submission of merged ) {
        if ( submission.id ) byId.set( submission.id, submission );
      }

      return [ ...byId.values() ]
        .sort( ( a, b ) => {
          const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
          const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
          return bTime - aTime;
        } )
        .slice( 0, 6 );
    },
  } );

  const statusVariant = ( status?: string ) => {
    if ( status === 'approved' ) return 'secondary' as const;
    if ( status === 'returned' || status === 'rejected' ) return 'destructive' as const;
    return 'outline' as const;
  };

  if ( isBrandLoading ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( brandError || ( !isBrandLoading && !brand ) ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-medium text-red-800">Failed to load brand profile</h3>
        <p className="text-sm text-red-600">{ ( brandError as Error )?.message || 'Brand not found' }</p>
      </div>
    );
  }

  const brandName = brand?.company_name || 'Brand Dashboard';
  const brandLogo = brand?.profile_photo_url || brand?.logo_url || brand?.logo || '';
  const flagName = getCountryFlag( brand?.country );
  const location = [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' );
  const address = [ brand?.street, brand?.building_number || brand?.number, brand?.city, brand?.state, brand?.postal_code, brand?.country ]
    .filter( Boolean )
    .join( ', ' );

  return (
    <div>
      <SubHeader
        title={ brandName }
        description="Overview of brand performance and details"
        breadcrumbs={ [
          { label: 'Brands', href: '/admin/brands' },
          { label: brandName, href: `/admin/brands/${ brandId }` },
        ] }
      />

      <div className="ad-shell py-4">
        <section className="grid gap-4 xl:grid-cols-12">
          <aside className="space-y-4 xl:col-span-5 xl:sticky xl:top-24 xl:self-start">
            <Card className="ad-summary-card border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="ad-card-title">Brand Profile</CardTitle>
                <CardDescription className="ad-card-description">Core brand information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-16 border-2 border-primary/20">
                      <AvatarImage src={ brandLogo } alt={ brandName } />
                      <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-primary font-medium text-primary">{ brandName }</p>
                      <p className="text-xs text-muted-foreground">{ brand?.preferred_contact_email || 'No contact email' }</p>
                      <div className="mt-2">
                        <BrandStatusBadge status={ brand?.status || 'inactive' } />
                      </div>
                    </div>
                  </div>

                  { ( brand?.category || brand?.company_size ) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      { brand?.category && (
                        <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap">
                          { brand.category }
                        </Badge>
                      ) }
                      { brand?.company_size && (
                        <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap text-muted-foreground capitalize">
                          { String( brand.company_size ).replace( /_/g, ' ' ) }
                        </Badge>
                      ) }
                    </div>
                  ) }

                  { location && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      { flagName && (
                        <Image
                          src={ `/images/flags/${ flagName }.svg` }
                          alt={ brand?.country || 'Country' }
                          width={ 14 }
                          height={ 10 }
                          className="h-3 w-auto"
                        />
                      ) }
                      <span>{ location }</span>
                    </div>
                  ) }
                </div>

                <div className="space-y-2">
                  <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="ad-stat-label">Website</p>
                      <p className="text-right text-sm font-medium">{ brand?.website_url || 'N/A' }</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="ad-stat-label">Company Size</p>
                      <p className="text-right text-sm font-medium capitalize">{ String( brand?.company_size || 'N/A' ).replace( /_/g, ' ' ) }</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="ad-stat-label">Registered</p>
                      <p className="text-right text-sm font-medium">{ brand?.registration_number || 'N/A' }</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="ad-stat-label">VAT ID</p>
                      <p className="text-right text-sm font-medium">{ brand?.vat_id || 'N/A' }</p>
                    </div>
                  </div>
                </div>

                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="ad-stat-label">Created</span>
                    <span className="text-right">{ toDateLabel( brand?.created_at ) }</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ad-summary-card">
              <CardHeader className="pb-3">
                <CardTitle className="ad-card-title">Contact & Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="ad-stat-label">Email</span>
                  <span className="text-right">{ brand?.preferred_contact_email || 'N/A' }</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="ad-stat-label">Phone</span>
                  <span className="text-right">{ brand?.preferred_contact_phone || 'N/A' }</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="ad-stat-label">Address</span>
                  <span className="text-right">{ address || 'N/A' }</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4 xl:col-span-7">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="ad-summary-card">
                <CardHeader className="pb-2">
                  <CardTitle className="ad-card-title">Financials</CardTitle>
                  <CardDescription className="ad-card-description">Spend performance for this brand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  { financialRows.map( ( item ) => (
                    <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <div className="mb-1.5 flex items-end justify-between gap-3">
                        <p className="ad-stat-label">{ item.label }</p>
                      </div>
                      <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
                    </div>
                  ) ) }
                </CardContent>
              </Card>

              <Card className="ad-summary-card">
                <CardHeader className="pb-2">
                  <CardTitle className="ad-card-title">Campaigns</CardTitle>
                  <CardDescription className="ad-card-description">Campaign lifecycle overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  { campaignRows.map( ( item ) => {
                    const maxValue = Math.max( ...campaignRows.map( ( row ) => row.numeric ), 1 );
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
                </CardContent>
              </Card>

              <Card className="ad-summary-card xl:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
                  <CardDescription className="ad-card-description">Latest video submissions from brand campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  { isRecentSubmissionsLoading && (
                    <p className="py-8 text-center text-xs text-muted-foreground">Loading recent submissions...</p>
                  ) }

                  { isRecentSubmissionsError && (
                    <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p>
                  ) }

                  { !isRecentSubmissionsLoading && !isRecentSubmissionsError && recentSubmissions.length === 0 && (
                    <p className="py-8 text-center text-xs text-muted-foreground">No submissions yet.</p>
                  ) }

                  { !isRecentSubmissionsLoading && !isRecentSubmissionsError && recentSubmissions.map( ( submission ) => {
                    const creatorName = submission.creator?.first_name || submission.creator?.last_name
                      ? `${ submission.creator?.first_name || '' } ${ submission.creator?.last_name || '' }`.trim()
                      : 'Creator';

                    return (
                      <div key={ submission.id || `${ submission.title }-${ submission.created_at }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={ submission.id ? `/admin/submissions/${ submission.id }` : '/admin/submissions' }
                              className="text-sm font-medium text-primary hover:underline underline-offset-2"
                            >
                              { submission.title || 'Untitled Submission' }
                            </Link>
                            <p className="mt-0.5 text-xs text-muted-foreground">Creator: { creatorName }</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">Submitted: { toDateLabel( submission.created_at ) }</p>
                          </div>
                          <Badge variant={ statusVariant( submission.status ) } className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
                            { ( submission.status || 'pending_approval' ).replace( /_/g, ' ' ) }
                          </Badge>
                        </div>
                      </div>
                    );
                  } ) }
                </CardContent>
              </Card>

            </div>

            <Card className="ad-summary-card">
              <CardHeader className="pb-2">
                <CardTitle className="ad-card-title">Campaigns</CardTitle>
                <CardDescription className="ad-card-description">Brand campaign activity and status</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignsTable
                  campaigns={ campaigns }
                  isLoading={ isCampaignsLoading }
                  basePath={ `/admin/brands/${ brandId }/campaigns` }
                />
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </div>
  );
}
