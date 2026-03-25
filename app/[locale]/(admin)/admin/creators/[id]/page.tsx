'use client';

import {
  CreatorFinancialsBlock,
  CreatorGigMetricsBlock,
  CreatorProfileBlock,
  CreatorRecentGigsBlock,
  type CreatorStatRow,
} from '@/components/admin/creators/dashboard';
import { SubHeader } from '@/components/subheader';
import { useCreator } from '@/lib/api/hooks/creators';
import { usePaymentItems, usePayments } from '@/lib/api/hooks/payments';
import { formatCurrency } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function CreatorDashboardPage() {
  const t = useTranslations( 'dashboard.admin' );
  const params = useParams<{ id: string; }>();
  const creatorId = params.id;

  const { data: creatorData, isLoading: isCreatorLoading, error: creatorError } = useCreator( creatorId );
  const { data: paymentsData } = usePayments( { creatorId, limit: 200 } );
  const { data: paymentItemsData } = usePaymentItems( { creatorId, limit: 200 } );

  const creator = creatorData || null;

  const payments = useMemo( () => paymentsData?.data ?? [], [ paymentsData ] );
  const paymentItems = useMemo( () => paymentItemsData?.data ?? [], [ paymentItemsData ] );

  const spendMetrics = useMemo( () => {
    const totalEarned = payments
      .filter( p => [ 'completed' ].includes( ( p.payment_status || '' ).toLowerCase() ) )
      .reduce( ( sum, p ) => sum + ( p.total?.value ?? 0 ), 0 );

    const totalPending = payments
      .filter( p => [ 'pending', 'processing' ].includes( ( p.payment_status || '' ).toLowerCase() ) )
      .reduce( ( sum, p ) => sum + ( p.total?.value ?? 0 ), 0 );

    const uniqueGigCount = new Set( paymentItems.map( i => i.gig_id ).filter( Boolean ) ).size;
    const avgPerGig = uniqueGigCount > 0 ? totalEarned / uniqueGigCount : 0;

    return { totalEarned, totalPending, avgPerGig };
  }, [ payments, paymentItems ] );

  const gigMetrics = useMemo( () => {
    const uniqueGigs = new Set( paymentItems.map( i => i.gig_id ).filter( Boolean ) );
    const total = uniqueGigs.size || paymentItems.length;
    const paid = paymentItems.filter( i => i.item_status === 'paid' ).length;
    const included = paymentItems.filter( i => i.item_status === 'included' ).length;
    const pending = paymentItems.filter( i => i.item_status === 'pending' ).length;

    return { total, paid, included, pending };
  }, [ paymentItems ] );

  const financialRows = useMemo<CreatorStatRow[]>( () => ( [
    { label: t( 'creatorDashboard.metrics.totalEarned' ), value: formatCurrency( spendMetrics.totalEarned ), numeric: spendMetrics.totalEarned },
    { label: t( 'creatorDashboard.metrics.avgPerGig' ), value: formatCurrency( spendMetrics.avgPerGig ), numeric: spendMetrics.avgPerGig },
  ] ), [ spendMetrics, t ] );

  const gigRows = useMemo<CreatorStatRow[]>( () => ( [
    { label: t( 'creatorDashboard.metrics.total' ), value: `${ gigMetrics.total }`, numeric: gigMetrics.total },
    { label: t( 'creatorDashboard.metrics.paid' ), value: `${ gigMetrics.paid }`, numeric: gigMetrics.paid },
    { label: t( 'creatorDashboard.metrics.included' ), value: `${ gigMetrics.included }`, numeric: gigMetrics.included },
    { label: t( 'creatorDashboard.metrics.pending' ), value: `${ gigMetrics.pending }`, numeric: gigMetrics.pending },
  ] ), [ gigMetrics, t ] );

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
        <h3 className="text-lg font-medium text-red-800">{ t( 'creatorDashboard.failedLoad' ) }</h3>
        <p className="text-sm text-red-600">{ ( creatorError as Error )?.message || t( 'creatorDashboard.creatorNotFound' ) }</p>
      </div>
    );
  }

  const creatorName = [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || t( 'creatorDashboard.title' );
  const creatorAvatar = ( creator as any )?.profile_image?.asset || ( creator as any )?.avatar_url || '';

  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title={ creatorName }
        description={ t( 'creatorDashboard.description' ) }
        breadcrumbs={ [
          { label: t( 'creatorsPage.title' ), href: '/admin/creators' },
          { label: creatorName, href: `/admin/creators/${ creatorId }` },
        ] }
      />

      <div className="ad-shell py-4 bg-slate-50/50 mt-0 flex-1 px-5">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-5 md:sticky md:top-24 md:self-start h-full">
            <CreatorProfileBlock creator={ creator! } creatorName={ creatorName } creatorAvatar={ creatorAvatar } />
          </aside>

          <section className="space-y-4 md:col-span-7">
            <div className="flex flex-col gap-4 h-full">
              <div className='flex flex-col md:flex-row gap-4 w-full flex-1'>
                <CreatorFinancialsBlock rows={ financialRows } />
                <CreatorGigMetricsBlock rows={ gigRows } />
              </div>
              <CreatorRecentGigsBlock creatorId={ creatorId } />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
