'use client';

import * as React from 'react';
import { Activity } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/dashboard-ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { Separator } from '@/components/dashboard-ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { Row } from '@/components/admin/creators/details-sheet/creator-details-shared';
import { PaymentStatusBadge } from './payment-status-badge';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { useCreatorPayment, usePayment } from '@/lib/api/hooks/payments';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { CopyText } from '../dashboard-ui/copy-text';
import { useTranslations, useLocale } from 'next-intl';
import { PaymentActionMenu } from './payment-action-menu';
import { ChevronDown } from 'lucide-react';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function PaymentSheetHeader( { payment, total, creatorImageUrl }: { payment: ModelsPaymentResponse; total: string; creatorImageUrl?: string; } ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <SheetHeader className="relative flex flex-row items-start justify-between gap-3 bg-burgundy-100 p-4 pb-8 m-6 rounded-lg mt-16 mb-0 text-center">
      <div className="flex flex-col items-start gap-1.5">
        <SheetTitle className="text-xl font-normal tracking-tight dialog__title text-primary">
          { payment.reference || `${ t( 'payments.table.payment' ) } ${ payment.id?.slice( 0, 8 ) || '' }` }
        </SheetTitle>

        <span className="text-sm flex gap-1">
          { t( 'payments.details.paymentId' ) }: <CopyText text={ payment.id || '' }>{ payment.id?.slice( 0, 8 ) || '' }</CopyText>
        </span>

        <PaymentStatusBadge status={ payment.payment_status } />
      </div>

      <SheetDescription className="sr-only">
        { t( 'payments.details.accessibilityDesc', { reference: payment.reference || payment.id || '' } ) }
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
  const t = useTranslations( 'dashboard.common' );
  return (
    <div className="space-y-3">
      { /* Creator */ }
      { payment.creator_id && (
        <WrappedCard title={ t( 'payments.table.creator' ) }>
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
      <WrappedCard title={ t( 'sheets.details' ) }>
        <Row label={ t( 'payments.table.method' ) } value={ payment.payment_method || '—' } />
        <Row label={ t( 'payments.table.date' ) } value={ formattedDate || '—' } />
        <Row label={ t( 'payments.details.created' ) } value={ formattedCreated || '—' } />
        { payment.reference && (
          <Row label={ t( 'payments.details.reference' ) } value={ payment.reference } />
        ) }
      </WrappedCard>

      { /* Notes */ }
      { payment.notes && (
        <WrappedCard title={ t( 'payments.details.notes' ) }>
          <p className="text-sm text-muted-foreground leading-relaxed">{ payment.notes }</p>
        </WrappedCard>
      ) }
    </div>
  );
}

// ─── Items tab ────────────────────────────────────────────────────────────────

function PaymentItemsTab( { payment }: { payment: ModelsPaymentResponse; } ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();
  const items = payment.payment_items || [];

  return (
    <div className="space-y-3">
      { items.length > 0 ? (
        <WrappedCard title={ `${ t( 'payments.table.items' ) } (${ items.length })` }>
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
                      { item.item_count } × { new Intl.NumberFormat( locale, { style: 'currency', currency: item.cost_per_item.currency || 'EUR' } ).format( item.cost_per_item.value ) }
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
          { t( 'payments.details.noLineItems' ) }
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
  isAdmin?: boolean;
}

export function PaymentDetailsSheet( { payment, open, onOpenChange, isAdmin = false }: PaymentDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.common' );
  const [ activeTab, setActiveTab ] = React.useState( 'overview' );
  const paymentId = payment?.id || '';

  const { data: adminPaymentResponse } = usePayment( paymentId, { enabled: isAdmin && open && !!paymentId } );
  const { data: creatorPaymentResponse } = useCreatorPayment( paymentId, { enabled: !isAdmin && open && !!paymentId } );
  const resolvedPayment = ( isAdmin ? adminPaymentResponse?.data : creatorPaymentResponse?.data ) || payment;

  const { data: creatorData } = useCreator( resolvedPayment?.creator_id || '', { enabled: !!resolvedPayment?.creator_id && open } );

  const formattedDate = useFormatDate( resolvedPayment?.payment_date || '' );
  const formattedCreated = useFormatDate( resolvedPayment?.created_at || '' );
  const formatCurrency = useFormatCurrency();
  const formattedTotal = formatCurrency( resolvedPayment?.total?.value ?? 0, resolvedPayment?.total?.currency || 'EUR' );

  if ( !resolvedPayment ) return null;

  const creatorImageUrl = creatorData?.profile_image?.asset;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! flex flex-col overflow-hidden bg-background/90">
        <div className="flex-1 overflow-y-auto">
          <PaymentSheetHeader payment={ resolvedPayment } total={ formattedTotal } creatorImageUrl={ creatorImageUrl } />

          <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6 mt-3">
            <TabsList className="w-full border">
              <TabsTrigger value="overview" className="text-xs font-normal">{ t( 'payments.details.overview' ) }</TabsTrigger>
              <TabsTrigger value="items" className="text-xs font-normal">
                { t( 'payments.details.lineItems' ) }
                { ( resolvedPayment.payment_items?.length ?? 0 ) > 0 && (
                  <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                    { resolvedPayment.payment_items!.length }
                  </span>
                ) }
              </TabsTrigger>
            </TabsList>

            <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
              <PaymentOverviewTab
                payment={ resolvedPayment }
                creatorImageUrl={ creatorImageUrl }
                formattedDate={ formattedDate }
                formattedCreated={ formattedCreated }
              />
            </Activity>

            <Activity mode={ activeTab === 'items' ? 'visible' : 'hidden' }>
              <PaymentItemsTab payment={ resolvedPayment } />
            </Activity>
          </Tabs>
        </div>

        <div className="px-6 pb-6 pt-3 border-t space-y-3 bg-slate-50/50">
          { resolvedPayment.total?.value != null && (
            <WrappedCard title={ t( 'total' ) }>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{ t( 'payments.details.totalAmount' ) }</span>
                <span className="text-xl font-primary text-primary leading-none">{ formattedTotal }</span>
              </div>
            </WrappedCard>
          ) }
          <SheetFooter className="sticky bottom-0 px-0 pb-0 pt-0 border-0 bg-transparent">
            <PaymentActionMenu
              payment={ resolvedPayment }
              isAdmin={ isAdmin }
              showViewButton={ false }
              trigger={
                <ButtonGroup className="self-start min-w-[240px]">
                  <Button variant="outline" size="sm" className="font-regular flex-1">
                    { t( 'actions' ) }
                  </Button>
                  <Button variant="outline" size="sm" className="font-regular shrink-0">
                    <ChevronDown className="size-4" />
                  </Button>
                </ButtonGroup>
              }
            />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
