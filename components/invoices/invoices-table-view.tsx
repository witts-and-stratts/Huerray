'use client';

import { type Table as TanstackTable } from '@tanstack/react-table';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { EmptyInvoices } from '../admin/empty-states/empty-invoices';

export function InvoicesTableView( {
  table,
  showInvoiceEmptyState = true,
}: {
  table: TanstackTable<ModelsInvoiceResponse>;
  showInvoiceEmptyState?: boolean;
} ) {
  return <DataTableView table={ table } emptyState={ showInvoiceEmptyState ? <EmptyInvoices imageWidth={ 300 } imageHeight={ 240 } fill /> : undefined } />;
}
