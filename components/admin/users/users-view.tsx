import { Table } from "@tanstack/react-table";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UsersTableView } from "./users-table-view";

interface UsersViewProps {
  table: Table<ModelsUserResponse>;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UsersView( { table }: UsersViewProps ) {
  return <div className="px-2 md:px-5"><UsersTableView table={ table } /></div>;
}
