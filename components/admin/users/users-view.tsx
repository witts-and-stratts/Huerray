import { Table } from "@tanstack/react-table";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UsersTableView } from "./users-table-view";

interface UsersViewProps {
  table: Table<ModelsUserResponse>;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UsersView( { table }: UsersViewProps ) {
  return <div className="p-2 md:p-4"><UsersTableView table={ table } /></div>;
}
