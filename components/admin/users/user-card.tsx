import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UserStatusBadge } from "./user-status-badge";
import { UserActionMenu } from "./user-action-menu";

interface UserCardProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UserCard( { user, onViewDetails }: UserCardProps ) {
  const fullName = `${ user.first_name || '' } ${ user.last_name || '' }`.trim() || user.username || 'Unknown';

  return (
    <Card className='p-0 py-3 pb-0 justify-between'>
      <CardHeader>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div>
            <CardTitle className='capitalize text-[18px] font-medium! text-primary'>
              { fullName }
            </CardTitle>
            <p className="text-sm text-muted-foreground/50">{ user.email }</p>
            <div className="mt-2">
              <UserStatusBadge status={ user.user_status || 'active' } />
            </div>

          </div>
          <div className='flex gap-2'>
            <Avatar className="h-10 w-10">
              {/* TODO: Add avatar to user model if exists */ }
              <AvatarImage src={ undefined } alt={ fullName } />
              <AvatarFallback>{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
            <UserActionMenu user={ user } onViewDetails={ onViewDetails } />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Content placeholder */ }
      </CardContent>
    </Card>
  );
}
