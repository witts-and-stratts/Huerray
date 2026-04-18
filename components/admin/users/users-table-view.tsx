import { type Table as TanstackTable } from '@tanstack/react-table';
import { ModelsUserResponse } from '@/lib/api/generated/models';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { DataTableEmpty } from '@/components/dashboard-ui/data-table/data-table-empty';
import { useTranslations } from 'next-intl';

export function UsersTableView( { table }: { table: TanstackTable<ModelsUserResponse>; } ) {
  const t = useTranslations( 'dashboard.admin' );
  return <DataTableView table={ table } emptyState={ <DataTableEmpty>{ t( 'usersTableView.noUsersFound' ) }</DataTableEmpty> } />;
}
