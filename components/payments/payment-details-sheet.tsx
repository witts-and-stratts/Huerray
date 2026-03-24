'use client';

import * as React from 'react';
import { Activity } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/dashboard-ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Separator } from '@/components/dashboard-ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { Row } from '@/components/admin/creators/details-sheet/creator-details-shared';
import { PaymentStatusBadge } from './payment-status-badge';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { CopyText } from '../dashboard-ui/copy-text';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function PaymentSheetHeader( { payment, total, creatorImageUrl }: { payment: ModelsPaymentResponse; total: string; creatorImageUrl?: string; } ) {
  return (
    <SheetHeader className="relative flex flex-row items-start justify-between gap-3 bg-burgundy-100 p-4 pb-8 m-6 rounded-lg mt-16 mb-0 text-center">
      <div className="flex flex-col items-start gap-1.5">
        <SheetTitle className="text-xl font-normal tracking-tight dialog__title text-primary">
          { payment.reference || `Payment ${ payment.id?.slice( 0, 8 ) || '' }` }
        </SheetTitle>

        <span className="text-sm flex gap-1">
          Payment ID: <CopyText text='copy id'>{ payment.id?.slice( 0, 8 ) || '' }</CopyText>
        </span>

        <PaymentStatusBadge status={ payment.payment_status } />
      </div>

      <SheetDescription className="sr-only">
        Payment details for { payment.reference || payment.id }.
      </SheetDescription>
    </SheetHeader>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function PaymentOverviewTab( {
  payment,
  creatorImageUrl,
  formattedDate,
  formattedCreated,
}: {
  payment: ModelsPaymentResponse;
  creatorImageUrl?: string;
  formattedDate: string;
  formattedCreated: string;
} ) {
  return (
    <div className="space-y-3">
      { /* Creator */ }
      { payment.creator_id && (
        <WrappedCard title="Creator">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 bg-muted-foreground/10">
              { creatorImageUrl && (
                <AvatarImage src={ imgpresets.avatar( creatorImageUrl ) } alt={ payment.creator_name } className="object-cover" />
              ) }
              <AvatarFallback className="text-sm">{ getInitials( payment.creator_name ) }</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="dt-table__col-title truncate">{ payment.creator_name || '—' }</p>
              {/* <p className="text-xs text-muted-foreground truncate">{ payment.creator_id }</p> */ }
            </div>
          </div>
        </WrappedCard>
      ) }

      { /* Details */ }
      <WrappedCard title="Payment Details">
        <Row label="Method" value={ payment.payment_method || '—' } />
        <Row label="Date" value={ formattedDate || '—' } />
        <Row label="Created" value={ formattedCreated || '—' } />
        { payment.reference && (
          <Row label="Reference" value={ payment.reference } />
        ) }
      </WrappedCard>

      { /* Notes */ }
      { payment.notes && (
        <WrappedCard title="Notes">
          <p className="text-sm text-muted-foreground leading-relaxed">{ payment.notes }</p>
        </WrappedCard>
      ) }
    </div>
  );
}

// ─── Items tab ────────────────────────────────────────────────────────────────

function PaymentItemsTab( { payment }: { payment: ModelsPaymentResponse; } ) {
  const items = payment.payment_items || [];

  return (
    <div className="space-y-3">
      { items.length > 0 ? (
        <WrappedCard title={ `Line Items (${ items.length })` }>
          { items.map( ( item, i ) => (
            <React.Fragment key={ item.id || i }>
              { i > 0 && <Separator /> }
              <div className="flex items-start justify-between gap-3 py-0.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">{ item.description || item.gig_title || '—' }</p>
                  { item.gig_title && item.description && (
                    <p className="text-xs text-muted-foreground truncate">{ item.gig_title }</p>
                  ) }
                  { item.item_count && item.cost_per_item?.value && (
                    <p className="text-xs text-muted-foreground">
                      { item.item_count } × { new Intl.NumberFormat( 'en-US', { style: 'currency', currency: item.cost_per_item.currency || 'EUR' } ).format( item.cost_per_item.value ) }
                    </p>
                  ) }
                </div>
                <span className="text-sm font-medium shrink-0 text-muted-foreground">
                  { item.amount?.value != null
                    ? new Intl.NumberFormat( 'en-US', { style: 'currency', currency: item.amount.currency || 'EUR' } ).format( item.amount.value )
                    : '—'
                  }
                </span>
              </div>
            </React.Fragment>
          ) ) }
        </WrappedCard>
      ) : (
        <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
          No line items
        </div>
      ) }
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface PaymentDetailsSheetProps {
  payment: ModelsPaymentResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function PaymentDetailsSheet( { payment, open, onOpenChange }: PaymentDetailsSheetProps ) {
  const [ activeTab, setActiveTab ] = React.useState( 'overview' );

  const { data: creatorData } = useCreator( payment?.creator_id || '', { enabled: !!payment?.creator_id && open } );

  const formattedDate = useFormatDate( payment?.payment_date || '' );
  const formattedCreated = useFormatDate( payment?.created_at || '' );
  const formattedTotal = useFormatCurrency( payment?.total?.value ?? 0, payment?.total?.currency || 'EUR' );

  if ( !payment ) return null;

  const creatorImageUrl = creatorData?.profile_image?.asset;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! flex flex-col overflow-hidden bg-background/90">
        <div className="flex-1 overflow-y-auto">
          <PaymentSheetHeader payment={ payment } total={ formattedTotal } creatorImageUrl={ creatorImageUrl } />

          <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6 mt-3">
            <TabsList className="w-full border">
              <TabsTrigger value="overview" className="text-xs font-normal">Overview</TabsTrigger>
              <TabsTrigger value="items" className="text-xs font-normal">
                Line Items
                { ( payment.payment_items?.length ?? 0 ) > 0 && (
                  <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                    { payment.payment_items!.length }
                  </span>
                ) }
              </TabsTrigger>
            </TabsList>

            <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
              <PaymentOverviewTab
                payment={ payment }
                creatorImageUrl={ creatorImageUrl }
                formattedDate={ formattedDate }
                formattedCreated={ formattedCreated }
              />
            </Activity>

            <Activity mode={ activeTab === 'items' ? 'visible' : 'hidden' }>
              <PaymentItemsTab payment={ payment } />
            </Activity>
          </Tabs>
        </div>

        <div className="px-6 pb-6 pt-3 border-t space-y-3 bg-slate-50/50">
          { payment.total?.value != null && (
            <WrappedCard title="Total">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total amount</span>
                <span className="text-xl font-primary text-primary leading-none">{ formattedTotal }</span>
              </div>
            </WrappedCard>
          ) }
        </div>
      </SheetContent>
    </Sheet>
  );
}
