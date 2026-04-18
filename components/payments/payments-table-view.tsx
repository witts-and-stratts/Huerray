'use client';

import { type Table as TanstackTable } from '@tanstack/react-table';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { EmptyPayments } from '../admin/empty-states/empty-payments';

export function PaymentsTableView( {
  table,
  showPaymentEmptyState = true,
}: {
  table: TanstackTable<ModelsPaymentResponse>;
  showPaymentEmptyState?: boolean;
} ) {
  return <DataTableView table={ table } emptyState={ showPaymentEmptyState ? <EmptyPayments imageWidth={ 300 } imageHeight={ 240 } fill /> : undefined } />;
}
