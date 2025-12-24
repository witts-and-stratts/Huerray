'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { ModelCampaign } from './types';
import { CampaignCard } from './campaign-card';

interface CampaignsCardsProps {
  table: Table<ModelCampaign>;
}

export function CampaignsCardsView( { table }: CampaignsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4'>
      { rows.map( ( row ) => (
        <CampaignCard key={ row.id } campaign={ row.original } />
      ) ) }
    </div>
  );
}
