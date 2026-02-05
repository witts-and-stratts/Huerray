'use client';

import { Building05Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table as TanstackTable } from '@tanstack/react-table';
import { motion } from 'motion/react';
import { BrandsCardsView } from './brands-cards-view';
import { Brand } from './brands-data';
import { BrandsTableView } from './brands-table-view';

export function BrandsView( {
  table,
  view,
}: {
  table: TanstackTable<Brand>;
  view: 'table' | 'cards';
} ) {
  return (
    <div className='px-5 mt-1'>
      { table.getRowModel().rows.length === 0 ? (
        <motion.div
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          className="flex flex-col items-center justify-center py-20 text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 relative">
            <HugeiconsIcon icon={ Building05Icon } className="w-12 h-12" />
            <motion.div
              animate={ { scale: [ 1, 1.2, 1 ], opacity: [ 0.5, 1, 0.5 ] } }
              transition={ { duration: 2, repeat: Infinity } }
              className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <HugeiconsIcon icon={ PlusSignIcon } className="w-4 h-4" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">No brands yet</h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-balance">
              Brands will appear here once they register on the platform.
            </p>
          </div>
        </motion.div>
      ) : view === 'table' ? (
        <BrandsTableView table={ table } />
      ) : (
        <BrandsCardsView table={ table } />
      ) }
    </div>
  );
}
