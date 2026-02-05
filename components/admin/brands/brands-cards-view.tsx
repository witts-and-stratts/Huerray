'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { Brand } from './brands-data';
import { BrandCard } from './brand-card';

interface BrandsCardsViewProps {
  table: Table<Brand>;
}

export function BrandsCardsView( { table }: BrandsCardsViewProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      { rows.map( ( row ) => (
        <BrandCard key={ row.id } brand={ row.original } />
      ) ) }
    </div>
  );
}
