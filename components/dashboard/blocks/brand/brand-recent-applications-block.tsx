'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { AvatarCollage, type Person } from '@/components/campaigns/avatar-collage';
import { CampaignsApi } from '@/lib/api/generated/api/campaigns-api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import { useBasePath } from '@/lib/providers/path-provider';
import type { ModelsCampaignResponse, ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

interface BrandRecentApplicationsBlockProps {
  campaigns: ModelsCampaignResponse[];
}

const campaignsApi = new CampaignsApi( apiConfiguration, undefined, apiClient );
const MAX_CAMPAIGNS = 20;

export function BrandRecentApplicationsBlock( { campaigns }: BrandRecentApplicationsBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.recentApplications' );
  const router = useRouter();
  const basePath = useBasePath();

  const campaignIds = useMemo( () => {
    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = new Date( a.updated_at || a.created_at || 0 ).getTime();
        const bTime = new Date( b.updated_at || b.created_at || 0 ).getTime();
        return bTime - aTime;
      } )
      .slice( 0, MAX_CAMPAIGNS )
      .map( ( c ) => c.id )
      .filter( ( id ): id is string => !!id );
  }, [ campaigns ] );

  const queries = useQueries( {
    queries: campaignIds.map( ( id ) => ( {
      queryKey: [ 'campaigns', 'detail', id, 'applications' ] as const,
      queryFn: async () => {
        const response = await campaignsApi.campaignsIdApplicationsGet( { id } );
        return response.data;
      },
      enabled: !!id,
      staleTime: 60_000,
    } ) ),
  } );

  const isLoading = queries.length > 0 && queries.some( ( q ) => q.isLoading );

  const { people, peopleCampaignIds, totalApplications } = useMemo( () => {
    const all: Array<{ application: ModelsGigApplicationResponse; campaignId: string; }> = [];
    queries.forEach( ( q, index ) => {
      const list = q.data?.data;
      const campaignId = campaignIds[ index ];
      if ( Array.isArray( list ) && campaignId ) {
        for ( const application of list ) {
          all.push( { application, campaignId } );
        }
      }
    } );

    all.sort( ( a, b ) => {
      const aTime = a.application.applied_at ? new Date( a.application.applied_at ).getTime() : 0;
      const bTime = b.application.applied_at ? new Date( b.application.applied_at ).getTime() : 0;
      return bTime - aTime;
    } );

    const seen = new Set<string>();
    const uniquePeople: Person[] = [];
    const ids: string[] = [];
    for ( const { application, campaignId } of all ) {
      const creator = application.creator;
      if ( !creator ) continue;
      const key = creator.id || `${ creator.first_name }-${ creator.last_name }-${ creator.email }`;
      if ( seen.has( key ) ) continue;
      seen.add( key );
      uniquePeople.push( {
        first_name: creator.first_name || '',
        last_name: creator.last_name || '',
        avatar: creator.profile_image?.asset,
        email: creator.email,
      } );
      ids.push( campaignId );
    }

    return { people: uniquePeople, peopleCampaignIds: ids, totalApplications: all.length };
  }, [ queries, campaignIds ] );

  const handlePersonClick = ( index: number ) => {
    const campaignId = peopleCampaignIds[ index ];
    if ( !campaignId ) return;
    router.push( `${ basePath }/campaigns/${ campaignId }#applications` );
  };

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        { isLoading && people.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'loading' ) }</p>
        ) }
        { !isLoading && people.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
        ) }
        { people.length > 0 && (
          <div className="flex flex-col gap-3">
            <AvatarCollage people={ people } title={ t( 'dialogTitle' ) } size="xl" onPersonClick={ handlePersonClick } />
            <p className="text-xs text-muted-foreground">
              { t( 'summary', { creators: people.length, applications: totalApplications } ) }
            </p>
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
