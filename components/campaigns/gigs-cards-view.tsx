"use client";

import { ModelsGigResponse } from '@/lib/api/generated/models';
import { Table } from '@tanstack/react-table';
import { motion, AnimatePresence } from 'motion/react';
import { GigCard } from './gig-card';

interface GigsCardsProps {
  table: Table<ModelsGigResponse>;
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
}

export function GigsCardsView( { table, onViewGig, onCreateSubmission }: GigsCardsProps ) {
  const rows = table.getRowModel().rows;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
      <AnimatePresence mode='popLayout'>
        { rows.map( ( row, index ) => (
          <motion.div
            key={ row.id }
            layout
            initial={ { opacity: 0, y: 16 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: 16, transition: { duration: 0.1 } } }
            transition={ { duration: 0.3, delay: index * 0.04 } }
            className="h-full"
          >
            <GigCard
              gig={ row.original }
              onViewGig={ onViewGig }
              onCreateSubmission={ onCreateSubmission }
            />
          </motion.div>
        ) ) }
      </AnimatePresence>
    </div>
  );
}
