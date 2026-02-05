"use client";

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { GigCard } from './gig-card';
import { ModelsGigResponse } from '@/lib/api/generated/models';

interface GigsCardsProps {
  table: Table<ModelsGigResponse>;
  onViewGig: ( gig: ModelsGigResponse ) => void;
}

export function GigsCardsView( { table, onViewGig }: GigsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4'>
      { rows.map( ( row ) => (
        // Since we are mapping rows from table, row.original holds the data
        <GigCard
          key={ row.id }
          gig={ row.original }
          onViewGig={ onViewGig }
        />
      ) ) }
    </div>
  );
}
