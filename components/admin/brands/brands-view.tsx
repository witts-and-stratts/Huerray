'use client';

import { Table as TanstackTable } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import { BrandCard } from './brand-card';
import { Brand } from './brands-data';
import { BrandsTableView } from './brands-table-view';
import { useTranslations } from 'next-intl';

interface BrandsViewProps {
  table: TanstackTable<Brand>;
  view: 'table' | 'cards';
  onViewDetails?: ( brand: Brand ) => void;
}

export function BrandsView( { table, view, onViewDetails }: BrandsViewProps ) {
  const t = useTranslations( 'dashboard.admin' );
  if ( view === 'cards' ) {
    if ( table.getRowModel().rows.length === 0 ) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <p className="text-muted-foreground">{ t( 'filters.noBrands' ) }</p>
        </div>
      );
    }

    return (
      <div className="@container px-2 md:px-5">
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

  return <div className="px-2 md:px-5"><BrandsTableView table={ table } /></div>;
}
