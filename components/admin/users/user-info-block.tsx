import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { cn } from "@/lib/dashboard-utils";
import { UserActionMenu } from "./user-action-menu";
import { Check, X } from "lucide-react";
import { memo } from "react";
import { CopyText } from "@/components/dashboard-ui/copy-text";

interface UserHeaderProps {
  user: ModelsUserResponse;
  showEmail?: boolean;
  onViewDetails: ( user: ModelsUserResponse ) => void;
  showActions?: boolean;
  showType?: boolean;
}

const UserHeader = memo( ( { user, showEmail, onViewDetails, showActions, showType }: UserHeaderProps ) => {
  const fullName = `${ user.first_name || '' } ${ user.last_name || '' }`.trim() || user.username || 'Unknown';

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* ... Avatar code remains same ... */ }
        <Avatar className="size-10">
          <AvatarImage src={ undefined } alt={ fullName } />
          <AvatarFallback>{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          <AvatarBadge className={ cn(
            user.email_verified ? "bg-green-500 border-background" : "bg-muted text-muted-foreground border-background"
          ) }>
            { user.email_verified ? <Check className="" size={ 18 } /> : <X size={ 18 } className="text-red-500" /> }
          </AvatarBadge>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className='capitalize text-[18px] font-normal text-primary font-primary leading-tight'>
            { fullName }
          </span>
          { showEmail && user.email && (
            <CopyText
              text={ user.email }
              copyMessage="Email copied to clipboard"
              className="mt-0.5"
            >
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mr-1">
                { user.email }
              </span>
            </CopyText>
          ) }

          {/* ... Type rendering code remains same ... */ }
          { showType && <div className="mt-2">
            { ( () => {
              const type = user.user_type;
              const formattedType = type
                ? type.replace( /_user$/i, '' ).replace( /_/g, ' ' )
                : 'User';

              const typeColors: Record<string, string> = {
                'brand': 'bg-blue-100 text-blue-700 border-blue-200',
                'creator': 'bg-pink-100 text-pink-700 border-pink-200',
                'admin': 'bg-purple-100 text-purple-700 border-purple-200',
                'default': 'bg-gray-100 text-gray-700 border-gray-200'
              };

              const colorClass = typeColors[ formattedType.toLowerCase() ] || typeColors.default;

              return (
                <Badge variant="outline" className={ cn( `capitalize font-normal w-fit`, colorClass ) }>
                  { formattedType }
                </Badge>
              );
            } )() }
          </div> }
        </div>
      </div>
      { showActions && <div className='flex shrink-0 -mr-3 -mt-1'>
        <UserActionMenu user={ user } onViewDetails={ onViewDetails } />
      </div> }
    </div>
  );
} );

interface UserInfoBlockProps {
  user: ModelsUserResponse;
  className?: string;
  showEmail?: boolean;
  onViewDetails: ( user: ModelsUserResponse ) => void;
  showActions?: boolean;
  showType?: boolean;
}

export function UserInfoBlock( { user, className, showEmail = true, onViewDetails, showActions = true, showType = true }: UserInfoBlockProps ) {
  return (
    <div className={ cn( "flex flex-col gap-3", className ) }>
      <UserHeader user={ user } showEmail={ showEmail } onViewDetails={ onViewDetails } showActions={ showActions } showType={ showType } />
    </div>
  );
}
