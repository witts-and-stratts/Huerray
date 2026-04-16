'use client';

import { Table as TanstackTable } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { InvoicesTableView } from './invoices-table-view';
import { InvoiceCard } from './invoice-card';
import { EmptyInvoices } from '../admin/empty-states/empty-invoices';

interface InvoicesViewProps {
  table: TanstackTable<ModelsInvoiceResponse>;
  view: 'table' | 'cards';
  isAdmin?: boolean;
  isLoading?: boolean;
}

export function InvoicesView( { table, view, isAdmin, isLoading = false }: InvoicesViewProps ) {
  const pageSize = table.getState().pagination.pageSize;

  if ( isLoading ) {
    return view === 'table' ? (
      <div className='p-2 md:p-4'>
        <DataTableSkeleton
          showToolbar={ false }
          rowCount={ Math.min( pageSize, 10 ) }
          className="px-0 pt-0"
        />
      </div>
    ) : (
      <TableSkeleton
        showToolbar={ false }
        cardCount={ Math.min( pageSize, 8 ) }
        className="py-0"
      />
    );
  }

  if ( view === 'cards' ) {
    const rows = table.getRowModel().rows;

    if ( rows.length === 0 ) {
      return <EmptyInvoices imageWidth={ 300 } imageHeight={ 240 } fill />;
    }

    return (
      <div className='@container p-2 md:p-5'>
        <AnimatePresence mode='popLayout'>
          <motion.div
            className='grid grid-cols-1 gap-4 @sm:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-6'
            variants={ {
              show: { transition: { staggerChildren: 0.04 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            } }
            initial='hidden'
            animate='show'
            exit='exit'
          >
            { rows.map( ( row ) => (
              <motion.div
                key={ row.id }
                layout
                variants={ {
                  hidden: { opacity: 0, y: 100 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  exit: { opacity: 0, y: 100, transition: { duration: 0.3 } },
                } }
                className='flex-1 h-full'
              >
                <InvoiceCard invoice={ row.original } isAdmin={ isAdmin } />
              </motion.div>
            ) ) }
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return <div className='p-2 md:p-4'><InvoicesTableView table={ table } /></div>;
}
