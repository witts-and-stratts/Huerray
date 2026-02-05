'use client';

import * as React from 'react';
import { ModelsUserResponse } from '@/lib/api/generated/models';
import { useUser } from '@/lib/api/hooks/users';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { UserStatusBadge } from './user-status-badge';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface UserDetailsSheetProps {
  user: ModelsUserResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function UserDetailsSheet( { user, open, onOpenChange }: UserDetailsSheetProps ) {
  if ( !user ) return null;

  const {
    first_name,
    last_name,
    username,
    email,
    user_type,
    user_status,
    created_at,
    id,
  } = user;

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || username || 'Unknown';
  const initials = fullName.slice( 0, 2 ).toUpperCase();

  const { data: userDetails } = useUser( id || '' );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              {/* TODO: Add avatar to user model if exists */ }
              <AvatarImage src={ undefined } alt={ fullName } />
              <AvatarFallback className="text-lg">{ initials }</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-xl">{ fullName }</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <UserStatusBadge status={ user_status || 'active' } />
                { userDetails?.user_status && (
                  <div className="flex items-center gap-2">
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Profile: <span className="font-medium text-foreground capitalize">{ userDetails.user_status }</span>
                    </span>
                  </div>
                ) }
              </div>
              <div className="text-sm text-muted-foreground capitalize mt-1">{ user_type }</div>
            </div>
          </div>
          <SheetDescription>
            Detailed information about this user.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4 pt-0 mt-6">

          {/* Contact Info */ }
          <div className="space-y-3">
            <h4 className="text-sm font-medium border-b pb-2">Contact Information</h4>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Email</span>
                <div className="font-medium">{ email }</div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Username</span>
                <div className="font-medium">{ username }</div>
              </div>
            </div>
          </div>

          {/* Account Details */ }
          <div className="space-y-3">
            <h4 className="text-sm font-medium border-b pb-2">Account Details</h4>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">User ID</span>
                <div className="font-mono text-xs">{ id }</div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Joined Date</span>
                <div>{ formatDate( created_at as unknown as string ) }</div>
              </div>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
