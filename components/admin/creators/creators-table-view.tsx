import { DataTableView } from "@/components/dashboard-ui/data-table/data-table-view";
import { DataTableEmpty } from "@/components/dashboard-ui/data-table/data-table-empty";
import { Table as TanstackTable } from "@tanstack/react-table";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { useTranslations } from 'next-intl';

interface CreatorsTableViewProps {
  table: TanstackTable<ModelsCreatorResponse>;
}

export function CreatorsTableView( { table }: CreatorsTableViewProps ) {
  const t = useTranslations( 'dashboard.admin' );
  return <DataTableView table={ table } emptyState={ <DataTableEmpty>{ t( 'creatorsTableView.noCreatorsFound' ) }</DataTableEmpty> } />;
}
