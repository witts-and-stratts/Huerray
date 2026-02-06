import {
  Card,
  CardFooter
} from "@/components/dashboard-ui/card";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { CreatorInfoBlock } from "./creator-info-block";
import { CreatorStatusBadge } from "./creator-status-badge";

interface CreatorCardProps {
  creator: ModelsCreatorResponse;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
}

export function CreatorCard( { creator, onViewDetails }: CreatorCardProps ) {
  return (
    <Card className='py-0 gap-1 min-h-[180px]'>
      <div className='flex flex-col gap-4 justify-between h-full'>
        <div className="flex items-start justify-between gap-4 p-4 pb-0">
          <CreatorInfoBlock creator={ creator } className="flex-1 min-w-0" onViewDetails={ onViewDetails } />
        </div>

        <CardFooter className="py-4 pt-3! bg-muted/30 border-t gap-4">
          <CreatorStatusBadge status={ creator.creator_status || 'active' } />
        </CardFooter>
      </div>
    </Card>
  );
}
