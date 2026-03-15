'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useCreatorEarnings } from '@/lib/api/hooks/payments';
import type { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { formatCurrency } from '@/lib/utils';

function toDate( value?: string ) {
  if ( !value ) return 'N/A';
  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return 'N/A';
  return date.toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } );
}

function paymentStatusVariant( status?: string ): 'secondary' | 'outline' | 'destructive' {
  const value = ( status || '' ).toLowerCase();
  if ( [ 'paid', 'completed', 'approved' ].includes( value ) ) return 'secondary';
  if ( [ 'failed', 'cancelled', 'rejected' ].includes( value ) ) return 'destructive';
  return 'outline';
}

export function CreatorEarningsBlock() {
  const { data: earningsResponse, isLoading } = useCreatorEarnings( { page: 1, limit: 5 } );

  const payments = useMemo<ModelsPaymentResponse[]>(
    () => ( earningsResponse?.data || [] ) as ModelsPaymentResponse[],
    [ earningsResponse?.data ]
  );

  const totalEarned = useMemo( () =>
    payments.reduce( ( sum, payment ) => sum + ( payment.total?.value || 0 ), 0 ),
    [ payments ]
  );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Earnings</CardTitle>
        <CardDescription className="ad-card-description">Recent payments and earnings history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No earnings yet. Complete gigs to start earning!</p>
        ) : (
          <>
            <div className="rounded-lg border border-border/60 bg-white p-2.5">
              <p className="ad-stat-label mb-1.5">Recent Total</p>
              <p className="text-2xl leading-none font-primary font-medium">{ formatCurrency( totalEarned ) }</p>
            </div>
            { payments.slice( 0, 3 ).map( ( payment ) => (
              <div key={ payment.id } className="rounded-lg border border-border/60 bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{ formatCurrency( payment.total?.value || 0 ) }</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      { toDate( payment.created_at ) }
                    </p>
                  </div>
                  <Badge variant={ paymentStatusVariant( payment.payment_status ) }>
                    { ( payment.payment_status || 'pending' ).replace( /_/g, ' ' ) }
                  </Badge>
                </div>
              </div>
            ) ) }
          </>
        ) }
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full font-normal"
          render={ <Link href="/creator/earnings" /> }
        >
          View all earnings
        </Button>
      </CardFooter>
    </Card>
  );
}
