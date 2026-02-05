import { Table } from "@tanstack/react-table";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { CreatorCard } from "./creator-card";
import { CreatorsTableView } from "./creators-table-view";

interface CreatorsViewProps {
  table: Table<ModelsCreatorResponse>;
  view: "table" | "cards";
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
}

export function CreatorsView( { table, view, onViewDetails }: CreatorsViewProps ) {
  if ( view === "cards" ) {
    // Check if there are rows to display in card view
    if ( table.getRowModel().rows.length === 0 ) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <p className="text-muted-foreground">No creators found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        { table.getRowModel().rows.map( ( row ) => (
          <CreatorCard
            key={ row.id }
            creator={ row.original }
            onViewDetails={ onViewDetails }
          />
        ) ) }
      </div>
    );
  }

  return <CreatorsTableView table={ table } />;
}
