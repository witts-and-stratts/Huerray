'use client';

import { MetaBadge, Row } from '@/components/admin/creators/details-sheet/creator-details-shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Button } from '@/components/dashboard-ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/dashboard-ui/hover-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { DownloadIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ModelsBrandResponse, ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { ModelsCampaignResponse } from '@/lib/api/generated/models/models-campaign-response';
import { useBrand } from '@/lib/api/hooks/brands';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { useInvoice } from '@/lib/api/hooks/invoices';
import { config } from '@/lib/config';
import { getCountryFlag } from '@/lib/country-flags';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import * as React from 'react';
import { Activity } from 'react';
import { InvoiceStatusBadge } from './invoice-status-badge';
import { BrandHoverCard } from '../campaigns/brand-hover-card';
import { useTranslations } from 'next-intl';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function InvoiceSheetHeader( { invoice, total, brand }: { invoice: ModelsInvoiceResponse; total: string; brand?: ModelsBrandResponse; } ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const logo = brand?.profile_photo?.asset;
  const flagName = getCountryFlag( brand?.country );
  const location = [ brand?.city, brand?.state, brand?.country ].filter( Boolean ).join( ', ' );

  return (
    <SheetHeader className="relative flex flex-row items-start justify-between gap-3 bg-textured p-4 pb-8 m-6 rounded-lg mt-16 mb-0 text-center">
      <div className="flex flex-col items-start gap-1.5">
        <SheetTitle className="text-xl font-normal text-white font-primary tracking-tight">
          { invoice.invoice_number || t( 'details.invoiceFallback' ) }
        </SheetTitle>

        { invoice.campaign_name && (
          <span className="text-sm text-white/60">{ invoice.campaign_name }</span>
        ) }

        <InvoiceStatusBadge status={ invoice.invoice_status } />
      </div>

      { brand && (
        <BrandHoverCard brand={ brand }>
          <Avatar className="size-8 bg-background ring-2 ring-white/20 cursor-pointer">
            { logo && <AvatarImage src={ imgpresets.avatar( logo ) } alt={ brand?.company_name } className="object-cover rounded-sm" /> }
            <AvatarFallback className="text-xs rounded-sm text-white bg-white/10">{ getInitials( brand?.company_name ) }</AvatarFallback>
          </Avatar>
        </BrandHoverCard>
      ) }

      <SheetDescription className="sr-only">
        { t( 'details.invoiceDetailsFor' ) } { invoice.invoice_number }.
      </SheetDescription>
    </SheetHeader>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function InvoiceOverviewTab( {
  invoice,
  brand,
  campaign,
  formattedIssued,
  formattedDue,
  formattedPaid,
  formattedCreated,
}: {
  invoice: ModelsInvoiceResponse;
  brand?: ModelsBrandResponse;
  campaign?: ModelsCampaignResponse;
  formattedIssued: string;
  formattedDue: string;
  formattedPaid: string;
  formattedCreated: string;
} ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );

  const campaignImage = campaign?.product_image?.asset || campaign?.campaign_images?.[ 0 ]?.asset;

  return (
    <div className="space-y-3">
      { /* Campaign */ }
      { invoice.campaign_name && (
        <WrappedCard title={ t( 'details.campaign' ) }>
          <div className="flex items-center gap-3">
            <Avatar className="size-10 bg-muted-foreground/10">
              { campaignImage && (
                <AvatarImage src={ imgpresets.avatar( campaignImage ) } alt={ invoice.campaign_name } className="object-cover rounded-sm" />
              ) }
              <AvatarFallback className="text-sm rounded-sm">{ getInitials( invoice.campaign_name ) }</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="dt-table__col-title truncate">{ invoice.campaign_name }</p>
            </div>
          </div>
        </WrappedCard>
      ) }

      { /* Dates */ }
      <WrappedCard title={ t( 'details.dates' ) }>
        <Row label={ t( 'details.issued' ) } value={ formattedIssued || '—' } />
        <Row label={ t( 'details.due' ) } value={ formattedDue || '—' } />
        { invoice.paid_date && (
          <>
            <Row label={ t( 'details.paid' ) } value={ formattedPaid } />
          </>
        ) }
        <Row label={ t( 'details.created' ) } value={ formattedCreated || '—' } />
      </WrappedCard>

      { /* Notes */ }
      { invoice.notes && (
        <WrappedCard title={ t( 'details.notes' ) }>
          <p className="text-sm text-muted-foreground leading-relaxed">{ invoice.notes }</p>
        </WrappedCard>
      ) }
    </div>
  );
}

// ─── Items tab ────────────────────────────────────────────────────────────────

function InvoiceItemsTab( { invoice, total }: { invoice: ModelsInvoiceResponse; total: string; } ) {
  const items = invoice.invoice_items || [];
  const t = useTranslations( 'dashboard.brand.invoicesPage' );

  return (
    <div className="space-y-3">
      { items.length > 0 ? (
        <WrappedCard title={ t( 'details.lineItems', { count: items.length } ) }>
          { items.map( ( item, i ) => (
            <React.Fragment key={ item.id || i }>
              { i > 0 && <Separator /> }
              <div className="flex items-start justify-between gap-3 py-0.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">{ item.description || item.gig_title || '—' }</p>
                  { item.gig_title && item.description && (
                    <p className="text-xs text-muted-foreground truncate">{ item.gig_title }</p>
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
          { t( 'details.noLineItems' ) }
        </div>
      ) }

    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface InvoiceDetailsSheetProps {
  invoice: ModelsInvoiceResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function InvoiceDetailsSheet( { invoice, open, onOpenChange }: InvoiceDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const [ activeTab, setActiveTab ] = React.useState( 'overview' );
  const invoiceId = invoice?.id || invoice?.invoice_id || '';

  const { data: invoiceResponse } = useInvoice( invoiceId, { enabled: open && !!invoiceId } );
  const resolvedInvoice = invoiceResponse?.data || invoice;

  const { data: brandData } = useBrand( resolvedInvoice?.brand_id || '', { enabled: !!resolvedInvoice?.brand_id && open } );
  const { data: campaign } = useCampaign( resolvedInvoice?.campaign_id || '', { enabled: !!resolvedInvoice?.campaign_id && open } );

  const formattedIssued = useFormatDate( resolvedInvoice?.issued_date || '' );
  const formattedDue = useFormatDate( resolvedInvoice?.due_date || '' );
  const formattedPaid = useFormatDate( resolvedInvoice?.paid_date || '' );
  const formattedCreated = useFormatDate( resolvedInvoice?.created_at || '' );
  const formattedTotal = useFormatCurrency( resolvedInvoice?.total?.value ?? 0, resolvedInvoice?.total?.currency || 'EUR' );

  if ( !resolvedInvoice ) return null;

  const brand = brandData?.data;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! flex flex-col overflow-hidden bg-background/90">

        <div className="flex-1 overflow-y-auto">
          <InvoiceSheetHeader invoice={ resolvedInvoice } total={ formattedTotal } brand={ brand } />

          <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6 mt-3">
            <TabsList className="w-full border">
              <TabsTrigger value="overview" className="text-xs font-normal">{ t( 'details.overviewTab' ) }</TabsTrigger>
              <TabsTrigger value="items" className="text-xs font-normal">
                { t( 'details.lineItemsTab' ) }
                { ( resolvedInvoice.invoice_items?.length ?? 0 ) > 0 && (
                  <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                    { resolvedInvoice.invoice_items!.length }
                  </span>
                ) }
              </TabsTrigger>
            </TabsList>

            <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
              <InvoiceOverviewTab
                invoice={ resolvedInvoice }
                brand={ brand }
                campaign={ campaign }
                formattedIssued={ formattedIssued }
                formattedDue={ formattedDue }
                formattedPaid={ formattedPaid }
                formattedCreated={ formattedCreated }
              />
            </Activity>

            <Activity mode={ activeTab === 'items' ? 'visible' : 'hidden' }>
              <InvoiceItemsTab invoice={ resolvedInvoice } total={ formattedTotal } />
            </Activity>
          </Tabs>
        </div>

        <div className="px-6 pb-6 pt-3 border-t space-y-3 bg-slate-50/50">
          { resolvedInvoice.total?.value != null && (
            <WrappedCard title={ t( 'details.total' ) }>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{ t( 'details.amountDue' ) }</span>
                <span className="text-xl font-primary text-primary leading-none">{ formattedTotal }</span>
              </div>
            </WrappedCard>
          ) }
          { resolvedInvoice.pdf_path && (
            <Button variant="outline" className="w-full gap-2">
              <a href={ `${ config.api.baseUrl }/${ resolvedInvoice.pdf_path.replace( /^\//, '' ) }` } download target="_blank" rel="noreferrer" className='flex gap-2'>
                <HugeiconsIcon icon={ DownloadIcon } size={ 16 } />
                { t( 'details.downloadInvoice' ) }
              </a>
            </Button>
          ) }
        </div>

      </SheetContent>
    </Sheet>
  );
}
