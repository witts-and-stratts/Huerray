"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-ui/card";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { cn } from "@/lib/dashboard-utils";
import { UserActionMenu } from "./user-action-menu";
import { UserStatusBadge } from "./user-status-badge";
import { useTranslations } from "next-intl";

interface UserCardProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UserCard( { user, onViewDetails }: UserCardProps ) {
  const t = useTranslations( 'dashboard.common' );
  const fullName = `${ user.first_name || "" } ${ user.last_name || "" }`.trim() || user.email || user.username || t( 'cards.userFallback' );
  const initials = fullName
    .split( " " )
    .map( ( part ) => part.charAt( 0 ) || "" )
    .join( "" )
    .slice( 0, 2 )
    .toUpperCase();
  const formattedType = user.user_type
    ? user.user_type.replace( /_user$/i, '' ).replace( /_/g, ' ' )
    : t( 'cards.userFallback' );
  // const typeColors: Record<string, string> = {
  //   brand: 'bg-blue-100 text-blue-700 border-blue-200',
  //   creator: 'bg-pink-100 text-pink-700 border-pink-200',
  //   admin: 'bg-purple-100 text-purple-700 border-purple-200',
  //   default: 'bg-gray-100 text-gray-700 border-gray-200'
  // };
  // const typeColorClass = typeColors[ formattedType.toLowerCase() ] || typeColors.default;

  return (
    <Card className="group relative bg-background shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 focus-within:-translate-y-0.5 p-0 gap-0">
      <CardHeader className="relative flex flex-row items-center gap-4 bg-muted-foreground/5 p-5 rounded-none min-h-26">
        <div className="absolute right-0 top-2">
          <UserActionMenu
            user={ user }
            onViewDetails={ onViewDetails }
          />
        </div>
        {/* <Avatar className="bg-muted-foreground/10 size-20">
          <AvatarFallback>{ initials }</AvatarFallback>
        </Avatar> */}
        <div className="flex flex-col items-start gap-1 text-center">
          <CardTitle className="card__title capitalize text-[18px] font-normal text-primary font-primary truncate line-clamp-1 hover:underline cursor-pointer block" onClick={ () => onViewDetails( user ) }>
            { fullName }
          </CardTitle>
          { user.email && (
            <span className="text-[12px] text-muted-foreground/80 line-clamp-1 mb-1">
              { user.email }
            </span>
          ) }
          <Badge variant="outline" className={ cn( "capitalize font-normal w-fit mb-1 bg-background", /*typeColorClass*/ ) }>
            { formattedType }
          </Badge>
        </div>
      </CardHeader>


      <CardFooter className="py-4 bg-muted/30 border-t flex justify-between items-center">
        <div className="flex items-center gap-2"><UserStatusBadge status={ user.user_status || 'active' } />
          <UserStatusBadge status={ user.email_verified ? 'verified' : 'unverified' } /></div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-normal">{ t( 'cards.joined' ) }</span>
          <span className="text-xs font-regular text-muted-foreground">
            { user.created_at ? new Date( user.created_at ).toLocaleDateString( "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            } ) : '-' }
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
