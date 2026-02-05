import { Table } from "@tanstack/react-table";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UserCard } from "./user-card";
import { UsersTableView } from "./users-table-view";

interface UsersViewProps {
  table: Table<ModelsUserResponse>;
  view: "table" | "cards";
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UsersView( { table, view, onViewDetails }: UsersViewProps ) {
  if ( view === "cards" ) {
    // Check if there are rows to display in card view
    if ( table.getRowModel().rows.length === 0 ) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        { table.getRowModel().rows.map( ( row ) => (
          <UserCard
            key={ row.id }
            user={ row.original }
            onViewDetails={ onViewDetails }
          />
        ) ) }
      </div>
    );
  }

  return <UsersTableView table={ table } />;
}
