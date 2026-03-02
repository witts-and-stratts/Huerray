'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { ModelCampaign } from './types';
import { CampaignCard } from './campaign-card';
import { motion } from 'motion/react';

interface CampaignsCardsProps {
  table: Table<ModelCampaign>;
  basePath: string;
}

export function CampaignsCardsView( { table, basePath }: CampaignsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      { rows.map( ( row ) => (
        <motion.div
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0, transition: { delay: row.index * 0.075, ease: 'easeOut', } } }
          exit={ { opacity: 0 } }
          transition={ { duration: 3, ease: 'easeOut' } }
          className='flex-1'
        >
          <CampaignCard key={ row.id } campaign={ row.original } basePath={ basePath } />
        </motion.div>
      ) ) }
    </div>
  );
}
