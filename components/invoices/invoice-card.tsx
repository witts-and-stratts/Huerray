'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { formatCurrency, formatDate } from '@/lib/utils';
import { InvoiceStatusBadge } from './invoice-status-badge';
import { InvoiceActionMenu } from './invoice-action-menu';
import { InvoiceDetailsSheet } from './invoice-details-sheet';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';

interface InvoiceCardProps {
  invoice: ModelsInvoiceResponse;
  isAdmin?: boolean;
}

export function InvoiceCard( { invoice, isAdmin }: InvoiceCardProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const [ open, setOpen ] = React.useState( false );
  const {
    invoice_number,
    invoice_status,
    brand_name,
    campaign_name,
    issued_date,
    due_date,
    total,
  } = invoice;

  const formatCurrency = useFormatCurrency();
  const formattedTotal = total?.value != null ? formatCurrency( total.value, total.currency ) : null;
  const formattedIssued = useFormatDate( issued_date || '' );
  const formattedDue = useFormatDate( due_date || '' );

  return (
    <>
      <Card className='py-3 justify-between gap-1 h-full'>
        <CardHeader className='flex items-start justify-between gap-4 mb-2 pr-1'>
          <div className='flex flex-col flex-1 min-w-0'>
            <div className='line-clamp-1'>
              <button onClick={ () => setOpen( true ) } className='text-left hover:underline whitespace-nowrap line-clamp-1'>
                <CardTitle>{ invoice_number || '—' }</CardTitle>
              </button>
            </div>
            { isAdmin && brand_name && (
              <CardDescription className='text-muted-foreground/70 text-sm truncate'>
                { brand_name }
              </CardDescription>
            ) }
            { campaign_name && (
              <CardDescription className='text-muted-foreground/70 text-xs truncate'>
                { campaign_name }
              </CardDescription>
            ) }
          </div>
          <InvoiceActionMenu invoice={ invoice } />
        </CardHeader>

        <CardContent className='space-y-3 pb-2'>
          <div className='flex items-center justify-between gap-2'>
            <InvoiceStatusBadge status={ invoice_status } />
            { total?.value != null && (
              <span className='font-medium dt-table__money'>{ formattedTotal }</span>
            ) }
          </div>

          <div className='flex flex-col gap-1 text-xs text-muted-foreground'>
            { issued_date && (
              <div className='flex justify-between'>
                <span>{ t( 'columns.issued' ) }</span>
                <span>{ formattedIssued }</span>
              </div>
            ) }
            { due_date && (
              <div className='flex justify-between'>
                <span>{ t( 'details.due' ) }</span>
                <span>{ formattedDue }</span>
              </div>
            ) }
          </div>
        </CardContent>
      </Card>
      <InvoiceDetailsSheet invoice={ invoice } open={ open } onOpenChange={ setOpen } />
    </>
  );
}
