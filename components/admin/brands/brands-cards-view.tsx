'use client';

import { Table } from '@tanstack/react-table';
import { BrandCard } from './brand-card';
import { Brand } from './brands-data';
import { motion } from 'motion/react';

interface BrandsCardsViewProps {
  table: Table<Brand>;
}

export function BrandsCardsView( { table }: BrandsCardsViewProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      { rows.map( ( row ) => (
        <motion.div
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0, transition: { delay: row.index * 0.1 } } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
        >
          <BrandCard key={ row.id } brand={ row.original } />
        </motion.div>
      ) ) }
    </div>
  );
}
