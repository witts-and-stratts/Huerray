'use client';

import { ModelsCampaignResponse } from '@/lib/api/generated';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import { CampaignCard } from './campaign-card';

interface CampaignsCardsProps {
  table: Table<ModelsCampaignResponse>;
  onViewCreator?: ( creator: ModelsCreatorResponse ) => void;
}

export function CampaignsCardsView( { table, onViewCreator }: CampaignsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 overflow-hidden'>
      <AnimatePresence mode='popLayout' initial={ false }>
        { rows.map( ( row, index ) => {
          const campaign = row.original;
          return (
            <motion.div
              key={ row.id }
              layout
              initial={ { opacity: 0, y: 16 } }
              animate={ { opacity: 1, y: 0 } }
              exit={ { opacity: 0, y: 16, transition: { duration: 0.1 } } }
              transition={ { duration: 0.3, delay: index * 0.04 } }
              className='flex-1 h-full'
            >
              <CampaignCard campaign={ campaign } onViewCreator={ onViewCreator } />
            </motion.div>
          );
        } ) }
      </AnimatePresence>
    </div>
  );
}
