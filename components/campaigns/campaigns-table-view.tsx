import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { type Table as TanstackTable } from '@tanstack/react-table';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

export function CamapignsTableView( {
  table,
}: {
  table: TanstackTable<ModelsCampaignResponse>;
} ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <DataTableView
      table={ table }
      emptyState={ <div><Search size={ 40 } className='mx-auto mb-3 text-muted-foreground/70 bg-background rounded-full p-2' />{ t( 'noResults' ) }</div> }
      animatePresenceInitial={ false }
      getRowMotionProps={ ( row ) => ( {
        animate: {
          opacity: row.original.campaign_status === 'deactivated' ? 0.45 : 1,
          y: 0,
          borderColor: 'inherit',
          filter: row.original.campaign_status === 'deactivated' ? 'grayscale(1)' : 'grayscale(0)',
          transition: {
            duration: 0.3,
          },
        },
        exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
      } ) }
    />
  );
}
