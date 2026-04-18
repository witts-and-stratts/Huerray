import { type Table as TanstackTable } from '@tanstack/react-table';
import { ModelsUserResponse } from '@/lib/api/generated/models';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

export function UsersTableView( { table }: { table: TanstackTable<ModelsUserResponse>; } ) {
  const t = useTranslations( 'dashboard.admin' );
  return <DataTableView table={ table } emptyState={ <div><Search size={ 40 } className='mx-auto mb-3 text-muted-foreground/70 bg-background rounded-full p-2' />{ t( 'usersTableView.noUsersFound' ) }</div> } />;
}
