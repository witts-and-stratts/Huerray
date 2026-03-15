'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/dashboard-ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Separator } from '@/components/dashboard-ui/separator';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PaymentStatusBadge } from './payment-status-badge';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

const Row = ( { label, value }: { label: string; value: React.ReactNode } ) => (
  <div className="flex items-start justify-between gap-3">
    <span className="text-xs text-muted-foreground shrink-0">{ label }</span>
    <span className="text-xs text-right">{ value ?? '—' }</span>
  </div>
);

interface PaymentDetailsSheetProps {
  payment: ModelsPaymentResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function PaymentDetailsSheet( { payment, open, onOpenChange }: PaymentDetailsSheetProps ) {
  const { data: creatorData } = useCreator( payment?.creator_id || '', { enabled: !!payment?.creator_id && open } );

  if ( !payment ) return null;

  const creator = creatorData;
  const creatorImageUrl = creator?.profile_image?.asset;
  const items = payment.payment_items || [];

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[480px]! overflow-y-auto">
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle className="text-lg font-medium">
                { payment.reference || `Payment ${ payment.id?.slice( 0, 8 ) || '' }` }
              </SheetTitle>
              <SheetDescription className="mt-1">
                Payment details and line items
              </SheetDescription>
            </div>
            <PaymentStatusBadge status={ payment.payment_status } />
          </div>
        </SheetHeader>

        <div className="px-6 space-y-5 pb-8">
          { /* Creator */ }
          { payment.creator_id && (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
              <Avatar size="sm" className="size-8">
                { creatorImageUrl && <AvatarImage src={ creatorImageUrl } alt={ payment.creator_name } /> }
                <AvatarFallback>{ getInitials( payment.creator_name ) }</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Creator</p>
                <p className="text-sm font-medium">{ payment.creator_name || '—' }</p>
              </div>
            </div>
          ) }

          <Separator />

          { /* Payment details */ }
          <div className="space-y-2">
            { payment.payment_method && (
              <Row label="Method" value={ payment.payment_method } />
            ) }
            { payment.payment_date && (
              <Row label="Payment Date" value={ formatDate( payment.payment_date ) } />
            ) }
            <Row label="Created" value={ payment.created_at ? formatDate( payment.created_at ) : '—' } />
            { payment.reference && (
              <Row label="Reference" value={ payment.reference } />
            ) }
          </div>

          <Separator />

          { /* Line items */ }
          { items.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Items ({ items.length })
              </p>
              <div className="rounded-lg border overflow-hidden">
                { items.map( ( item, i ) => (
                  <div
                    key={ item.id || i }
                    className="flex items-start justify-between gap-3 px-3 py-2.5 border-b last:border-b-0 bg-background"
                  >
                    <div className="min-w-0">
                      <p className="text-sm">{ item.description || item.gig_title || '—' }</p>
                      { item.gig_title && item.description && (
                        <p className="text-xs text-muted-foreground truncate">{ item.gig_title }</p>
                      ) }
                      { item.item_count && item.cost_per_item?.value && (
                        <p className="text-xs text-muted-foreground">
                          { item.item_count } × { formatCurrency( item.cost_per_item.value ) }
                        </p>
                      ) }
                    </div>
                    <span className="text-sm font-medium shrink-0">
                      { item.amount?.value != null ? formatCurrency( item.amount.value ) : '—' }
                    </span>
                  </div>
                ) ) }
              </div>
            </div>
          ) }

          { /* Total */ }
          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <span className="text-sm font-medium">Total</span>
            <span className="text-base font-semibold">
              { payment.total?.value != null ? formatCurrency( payment.total.value ) : '—' }
            </span>
          </div>

          { /* Notes */ }
          { payment.notes && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</p>
              <p className="text-sm text-muted-foreground">{ payment.notes }</p>
            </div>
          ) }
        </div>
      </SheetContent>
    </Sheet>
  );
}
