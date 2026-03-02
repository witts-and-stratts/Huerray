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
import { InvoiceStatusBadge } from './invoice-status-badge';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useBrand } from '@/lib/api/hooks/brands';
import { useCampaign } from '@/lib/api/hooks/campaigns';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

const Row = ( { label, value }: { label: string; value: React.ReactNode; } ) => (
  <div className="flex items-start justify-between gap-3">
    <span className="text-xs text-muted-foreground shrink-0">{ label }</span>
    <span className="text-xs text-right">{ value ?? '—' }</span>
  </div>
);

interface InvoiceDetailsSheetProps {
  invoice: ModelsInvoiceResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function InvoiceDetailsSheet( { invoice, open, onOpenChange }: InvoiceDetailsSheetProps ) {
  const { data: brandData } = useBrand( invoice?.brand_id || '', { enabled: !!invoice?.brand_id && open } );
  const { data: campaignData } = useCampaign( invoice?.campaign_id || '', { enabled: !!invoice?.campaign_id && open } );

  if ( !invoice ) return null;

  const brand = brandData?.data;
  const campaign = campaignData;
  const items = invoice.invoice_items || [];

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[480px]! overflow-y-auto">
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle className="text-lg font-medium">
                { invoice.invoice_number || 'Invoice' }
              </SheetTitle>
              <SheetDescription className="mt-1">
                Invoice details and line items
              </SheetDescription>
            </div>
            <InvoiceStatusBadge status={ invoice.invoice_status } />
          </div>
        </SheetHeader>

        <div className="px-6 space-y-5 pb-8">
          { /* Brand */ }
          { invoice.brand_id && (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
              <Avatar size="sm" className="size-8">
                { brand?.profile_photo_url && <AvatarImage src={ brand.profile_photo_url } alt={ invoice.brand_name } /> }
                <AvatarFallback>{ getInitials( invoice.brand_name ) }</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{ invoice.brand_name || '—' }</p>
                <p className="text-xs text-muted-foreground">{ brand?.preferred_contact_email || '' }</p>
              </div>
            </div>
          ) }

          { /* Campaign */ }
          { invoice.campaign_name && (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
              <Avatar size="sm" className="size-8">
                { campaign?.product_image_url && <AvatarImage src={ campaign.product_image_url } alt={ invoice.campaign_name } /> }
                <AvatarFallback>{ getInitials( invoice.campaign_name ) }</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Campaign</p>
                <p className="text-sm font-medium">{ invoice.campaign_name }</p>
              </div>
            </div>
          ) }

          <Separator />

          { /* Dates */ }
          <div className="space-y-2">
            <Row label="Issued" value={ invoice.issued_date ? formatDate( invoice.issued_date ) : '—' } />
            <Row label="Due" value={ invoice.due_date ? formatDate( invoice.due_date ) : '—' } />
            { invoice.paid_date && (
              <Row label="Paid" value={ formatDate( invoice.paid_date ) } />
            ) }
            <Row label="Created" value={ invoice.created_at ? formatDate( invoice.created_at ) : '—' } />
          </div>

          <Separator />

          { /* Line items */ }
          { items.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Line Items</p>
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
                    </div>
                    <span className="text-sm font-medium shrink-0">
                      { item.amount != null ? formatCurrency( item.amount ) : '—' }
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
              { invoice.total_amount != null ? formatCurrency( invoice.total_amount ) : '—' }
            </span>
          </div>

          { /* Notes */ }
          { invoice.notes && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</p>
              <p className="text-sm text-muted-foreground">{ invoice.notes }</p>
            </div>
          ) }
        </div>
      </SheetContent>
    </Sheet>
  );
}
