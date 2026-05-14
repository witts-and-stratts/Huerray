import { type Table as TanstackTable } from '@tanstack/react-table';
import { ModelsUserResponse } from '@/lib/api/generated/models';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { DataTableEmpty } from '@/components/dashboard-ui/data-table/data-table-empty';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

export function UsersTableView( {
  table,
  isFilteringAvailableUsers = false,
}: {
  table: TanstackTable<ModelsUserResponse>;
  isFilteringAvailableUsers?: boolean;
} ) {
  const t = useTranslations( 'dashboard.admin' );
  const emptyState = isFilteringAvailableUsers
    ? (
      <div className="dt-table-empty">
        <Loader2 size={ 40 } className="dt-table-empty-icon animate-spin" />
        <div>{ t( 'usersTableView.filteringAvailableUsers' ) }</div>
      </div>
    )
    : <DataTableEmpty>{ t( 'usersTableView.noUsersFound' ) }</DataTableEmpty>;

  return <DataTableView table={ table } emptyState={ emptyState } />;
}
