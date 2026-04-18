import { Table } from "@tanstack/react-table";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UsersTableView } from "./users-table-view";
import { TableviewWrapper } from "@/components/table-view-wrapper";

interface UsersViewProps {
  table: Table<ModelsUserResponse>;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UsersView( { table }: UsersViewProps ) {
  return <TableviewWrapper>
    <UsersTableView table={ table } />
  </TableviewWrapper>;
}
