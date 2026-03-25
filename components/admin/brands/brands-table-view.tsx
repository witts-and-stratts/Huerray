import { type Table as TanstackTable } from '@tanstack/react-table';
import { Brand } from './brands-data';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';

export function BrandsTableView( { table }: { table: TanstackTable<Brand>; } ) {
  return <DataTableView table={ table } />;
}
