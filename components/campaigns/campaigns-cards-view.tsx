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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      <AnimatePresence>
        { rows.map( ( row, index ) => {
          const campaign = row.original;
          const cardKey = campaign.id || campaign.campaign_id || campaign.campaign_name || `campaign-${ index }`;
          return (
          <motion.div
            key={ cardKey }
            initial={ { opacity: 0 } }
            animate={ { opacity: 1, transition: { delay: row.index * 0.05, ease: 'easeOut', duration: 0.25 } } }
            exit={ { opacity: 0 } }
            className='flex-1'
          >
            <CampaignCard campaign={ campaign } onViewCreator={ onViewCreator } />
          </motion.div>
          );
        } ) }
      </AnimatePresence>
    </div>
  );
}
