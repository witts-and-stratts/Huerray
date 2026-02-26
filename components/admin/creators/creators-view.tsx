import { Table } from "@tanstack/react-table";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { CreatorCard } from "./creator-card";
import { CreatorsTableView } from "./creators-table-view";

interface CreatorsViewProps {
  table: Table<ModelsCreatorResponse>;
  view: "table" | "cards";
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  onApproveProfile: ( creator: ModelsCreatorResponse ) => void;
  onRejectProfile: ( creator: ModelsCreatorResponse ) => void;
}

export function CreatorsView( { table, view, onViewDetails, onApproveProfile, onRejectProfile }: CreatorsViewProps ) {
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
      <div className="@container">
        <div className="grid grid-cols-2 gap-4 @max-sm:grid-cols-1 @md:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 @2xl:grid-cols-7">
          { table.getRowModel().rows.map( ( row ) => (
            <CreatorCard
              key={ row.id }
              creator={ row.original }
              onViewDetails={ onViewDetails }
              onApproveProfile={ onApproveProfile }
              onRejectProfile={ onRejectProfile }
            />
          ) ) }
        </div>
      </div>
    );
  }

  return <CreatorsTableView table={ table } />;
}
