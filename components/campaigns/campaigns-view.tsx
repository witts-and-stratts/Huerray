import { CampaignsCardsView } from './campaigns-cards-view';
import { CamapignsTableView } from './campaigns-table-view';
import { ModelCampaign } from './types';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { RocketIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/dashboard-ui/button';
import { Table as TanstackTable } from '@tanstack/react-table';
import Link from 'next/link';


export function CampaignsView( {
  table,
  view,
  basePath = '/brand-admin',
  emptyTitle = 'Ready to launch?',
  simpleEmptyState = false,
}: {
  table: TanstackTable<ModelCampaign>;
  view: 'table' | 'cards';
  basePath?: string;
  emptyTitle?: string;
  simpleEmptyState?: boolean;
} ) {
  return (
    <div className='px-5 mt-1'>
      { table.getRowModel().rows.length === 0 ? (
        simpleEmptyState ? (
          <div className="py-8 text-center text-xs text-muted-foreground">{ emptyTitle }</div>
        ) : (
        <motion.div
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          className="flex flex-col items-center justify-center py-20 text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 relative">
            <HugeiconsIcon icon={ RocketIcon } className="w-12 h-12" />
            <motion.div
              animate={ { scale: [ 1, 1.2, 1 ], opacity: [ 0.5, 1, 0.5 ] } }
              transition={ { duration: 2, repeat: Infinity } }
              className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <HugeiconsIcon icon={ PlusSignIcon } className="w-4 h-4" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{ emptyTitle }</h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-balance">
              Start your first campaign and watch your brand reach new heights with top creators.
            </p>
          </div>
          <Link href={ `${ basePath }/campaigns/new` }>
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
              Create Your First Campaign
            </Button>
          </Link>
        </motion.div>
        )
      ) : view === 'table' ? (
        <CamapignsTableView table={ table } />
      ) : (
        <CampaignsCardsView table={ table } basePath={ basePath } />
      ) }
    </div>
  );
}
