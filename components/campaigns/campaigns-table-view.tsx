import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { DataTableEmpty } from '@/components/dashboard-ui/data-table/data-table-empty';
import { type Table as TanstackTable } from '@tanstack/react-table';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useTranslations } from 'next-intl';

export function CamapignsTableView( {
  table,
}: {
  table: TanstackTable<ModelsCampaignResponse>;
} ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <DataTableView
      table={ table }
      emptyState={ <DataTableEmpty>{ t( 'noResults' ) }</DataTableEmpty> }
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
