import { DataTableView } from "@/components/dashboard-ui/data-table/data-table-view";
import { Table as TanstackTable } from "@tanstack/react-table";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { useTranslations } from 'next-intl';
import { Search } from "lucide-react";

interface CreatorsTableViewProps {
  table: TanstackTable<ModelsCreatorResponse>;
}

export function CreatorsTableView( { table }: CreatorsTableViewProps ) {
  const t = useTranslations( 'dashboard.admin' );
  return <DataTableView table={ table } emptyState={ <div><Search size={ 40 } className='mx-auto mb-3 text-muted-foreground/70 bg-background rounded-full p-2' />{ t( 'creatorsTableView.noCreatorsFound' ) }</div> } />;
}
