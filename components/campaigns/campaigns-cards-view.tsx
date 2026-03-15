'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { ModelCampaign } from './types';
import { CampaignCard } from './campaign-card';
import { AnimatePresence, motion } from 'motion/react';

interface CampaignsCardsProps {
  table: Table<ModelCampaign>;
}

export function CampaignsCardsView( { table }: CampaignsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      <AnimatePresence>
        { rows.map( ( row ) => (
          <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1, transition: { delay: row.index * 0.05, ease: 'easeOut', duration: 0.25 } } }
            exit={ { opacity: 0 } }
            className='flex-1'
          >
            <CampaignCard key={ row.id } campaign={ row.original } />
          </motion.div>
        ) ) }
      </AnimatePresence>
    </div>
  );
}
