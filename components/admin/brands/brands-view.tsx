'use client';

import { Table as TanstackTable } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import { BrandCard } from './brand-card';
import { Brand } from './brands-data';
import { BrandsTableView } from './brands-table-view';
import { useTranslations } from 'next-intl';

interface BrandsViewProps {
  table: TanstackTable<Brand>;
  view: 'table' | 'cards';
  onViewDetails?: ( brand: Brand ) => void;
  isLoading?: boolean;
}

export function BrandsView( {
  table,
  view,
  onViewDetails,
  isLoading = false,
}: BrandsViewProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const pageSize = table.getState().pagination.pageSize;

  if ( isLoading ) {
    return view === 'table' ? (
      <div className="p-2 md:p-4">
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
    if ( table.getRowModel().rows.length === 0 ) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <p className="text-muted-foreground">{ t( 'filters.noBrands' ) }</p>
        </div>
      );
    }

    return (
      <div className="@container p-2 md:p-5">
        <AnimatePresence mode='popLayout'>
          <motion.div
            className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-6"
            variants={ {
              show: { transition: { staggerChildren: 0.04 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            } }
            initial="hidden"
            animate="show"
            exit="exit"
          >
            { table.getRowModel().rows.map( ( row ) => (
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
                <BrandCard brand={ row.original } onViewDetails={ onViewDetails } />
              </motion.div>
            ) ) }
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return <div className="p-2 md:p-4"><BrandsTableView table={ table } /></div>;
}
