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

interface InvoiceCardProps {
  invoice: ModelsInvoiceResponse;
  isAdmin?: boolean;
}

export function InvoiceCard( { invoice, isAdmin }: InvoiceCardProps ) {
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

  return (
    <>
      <Card className='py-3 justify-between gap-1 h-full'>
        <CardHeader className='flex items-start justify-between gap-4 mb-2 pr-1'>
          <div className='flex flex-col flex-1 min-w-0'>
            <button onClick={ () => setOpen( true ) } className='text-left hover:underline'>
              <CardTitle>{ invoice_number || '—' }</CardTitle>
            </button>
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
              <span className='text-sm font-medium'>{ formatCurrency( total.value ) }</span>
            ) }
          </div>

          <div className='flex flex-col gap-1 text-xs text-muted-foreground'>
            { issued_date && (
              <div className='flex justify-between'>
                <span>Issued</span>
                <span>{ formatDate( issued_date ) }</span>
              </div>
            ) }
            { due_date && (
              <div className='flex justify-between'>
                <span>Due</span>
                <span>{ formatDate( due_date ) }</span>
              </div>
            ) }
          </div>
        </CardContent>
      </Card>
      <InvoiceDetailsSheet invoice={ invoice } open={ open } onOpenChange={ setOpen } />
    </>
  );
}
