'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { useCreator, useCreatorGigs } from '@/lib/api/hooks/creators';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import {
  CreatorGigMetricsBlock,
  CreatorFinancialsBlock,
  CreatorRecentGigsBlock,
  CreatorProfileBlock,
  toCurrency,
  type CreatorStatRow,
} from '@/components/admin/creators/dashboard';

export default function CreatorDashboardPage() {
  const params = useParams<{ id: string; }>();
  const creatorId = params.id;

  const { data: creatorData, isLoading: isCreatorLoading, error: creatorError } = useCreator( creatorId );
  const { data: gigsData } = useCreatorGigs( { creator_id: creatorId } as any );

  // useCreator returns the standard response, the creator is usually just the object
  const creator = creatorData || null;

  const gigs = useMemo<ModelsGigResponse[]>( () => {
    // Check for different possible response shapes
    if ( gigsData?.data && Array.isArray( gigsData.data ) ) return gigsData.data;
    if ( ( gigsData as unknown as { items?: ModelsGigResponse[]; } )?.items && Array.isArray( ( gigsData as unknown as { items: ModelsGigResponse[]; } ).items ) ) return ( gigsData as unknown as { items: ModelsGigResponse[]; } ).items;
    return [];
  }, [ gigsData ] );

  const gigMetrics = useMemo( () => {
    const total = gigs.length;

    const active = gigs.filter( ( gig ) => {
      const status = String( ( gig as { status?: string; gig_status?: string; } ).gig_status || ( gig as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'active', 'in_progress', 'ongoing', 'open', 'accepted' ].includes( status );
    } ).length;

    const finished = gigs.filter( ( gig ) => {
      const status = String( ( gig as { status?: string; gig_status?: string; } ).gig_status || ( gig as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'completed', 'finished', 'closed', 'paid' ].includes( status );
    } ).length;

    const applied = gigs.filter( ( gig ) => {
      const status = String( ( gig as { status?: string; gig_status?: string; } ).gig_status || ( gig as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'applied', 'pending', 'pending_approval', 'invited' ].includes( status );
    } ).length;

    return { total, active, finished, applied };
  }, [ gigs ] );

  const spendMetrics = useMemo( () => {
    const totalGigs = gigs.length;

    // For creators, maybe it's called earnings or we just check compensation
    const totalEarned = gigs.reduce( ( sum, gig ) => {
      // Logic from brand dashboard reversed/adapted
      if ( typeof gig.compensation === 'number' && typeof gig.number_of_videos === 'number' ) {
        return sum + ( gig.compensation * gig.number_of_videos );
      }
      if ( typeof gig.compensation === 'number' ) return sum + gig.compensation;
      if ( typeof ( gig as { gig_cost?: number; } ).gig_cost === 'number' ) return sum + ( ( gig as { gig_cost?: number; } ).gig_cost || 0 );
      return sum;
    }, 0 );

    const avgGigEarned = totalGigs > 0 ? totalEarned / totalGigs : 0;

    // Simulate pending based on active/applied gigs (simplistic)
    const pendingEarned = gigs.filter( g => {
      const status = String( ( g as { gig_status?: string; status?: string; } ).gig_status || ( g as { status?: string; } ).status || '' ).toLowerCase();
      return ![ 'completed', 'finished', 'closed', 'paid', 'declined', 'withdrawn', 'rejected' ].includes( status );
    } ).reduce( ( sum, gig ) => {
      if ( typeof gig.compensation === 'number' ) return sum + gig.compensation;
      return sum;
    }, 0 );

    return { totalEarned, avgGigEarned, pendingEarned };
  }, [ gigs ] );

  const financialRows = useMemo<CreatorStatRow[]>( () => ( [
    { label: 'Total Earnings', value: toCurrency( spendMetrics.totalEarned ), numeric: spendMetrics.totalEarned || 0 },
    { label: 'Avg per Gig', value: toCurrency( spendMetrics.avgGigEarned ), numeric: spendMetrics.avgGigEarned || 0 },
  ] ), [ spendMetrics.avgGigEarned, spendMetrics.totalEarned ] );

  const gigRows = useMemo<CreatorStatRow[]>( () => ( [
    { label: 'Total', value: `${ gigMetrics.total }`, numeric: gigMetrics.total },
    { label: 'Completed', value: `${ gigMetrics.finished }`, numeric: gigMetrics.finished },
    { label: 'Active', value: `${ gigMetrics.active }`, numeric: gigMetrics.active },
    { label: 'Applied', value: `${ gigMetrics.applied }`, numeric: gigMetrics.applied },
  ] ), [ gigMetrics.active, gigMetrics.applied, gigMetrics.finished, gigMetrics.total ] );


  if ( isCreatorLoading ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( creatorError || ( !isCreatorLoading && !creator ) ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-medium text-red-800">Failed to load creator profile</h3>
        <p className="text-sm text-red-600">{ ( creatorError as Error )?.message || 'Creator not found' }</p>
      </div>
    );
  }

  const creatorName = [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || 'Creator Dashboard';
  const creatorAvatar = ( creator as any )?.profile_photo_url || ( creator as any )?.avatar_url || '';

  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title={ creatorName }
        description="Overview of creator performance and details"
        breadcrumbs={ [
          { label: 'Creators', href: '/admin/creators' },
          { label: creatorName, href: `/admin/creators/${ creatorId }` },
        ] }
      />

      <div className="ad-shell py-4 bg-slate-50/50 mt-0 flex-1">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-5 md:sticky md:top-24 md:self-start h-full">
            <CreatorProfileBlock creator={ creator as any } creatorName={ creatorName } creatorAvatar={ creatorAvatar } />
          </aside>

          <section className="space-y-4 md:col-span-7">
            <div className="flex flex-col gap-4 h-full">
              <div className='flex flex-col md:flex-row gap-4 w-full flex-1'>
                <CreatorFinancialsBlock rows={ financialRows } />
                <CreatorGigMetricsBlock rows={ gigRows } />
              </div>
              <CreatorRecentGigsBlock creatorId={ creatorId } />
              {/* Optional: Add a portfolio block later */ }
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
