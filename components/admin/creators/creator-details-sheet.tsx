'use client';

import * as React from 'react';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { CreatorStatusBadge } from './creator-status-badge';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface CreatorDetailsSheetProps {
  creator: ModelsCreatorResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function CreatorDetailsSheet( { creator, open, onOpenChange }: CreatorDetailsSheetProps ) {
  if ( !creator ) return null;

  const {
    first_name,
    last_name,
    email,
    creator_status,
    id, // This is creator ID
    user_id,
    profile_image_url
  } = creator;

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || email || 'Unknown';
  const initials = fullName.slice( 0, 2 ).toUpperCase();

  const { data: creatorDetails } = useCreator( id || '' );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              {/* TODO: Add avatar to user model if exists */ }
              <AvatarImage src={ profile_image_url } alt={ fullName } />
              <AvatarFallback className="text-lg">{ initials }</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-xl">{ fullName }</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <CreatorStatusBadge status={ creator_status || 'active' } />
              </div>
            </div>
          </div>
          <SheetDescription>
            Detailed information about this creator.
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
            </div>
          </div>

          {/* Account Details */ }
          <div className="space-y-3">
            <h4 className="text-sm font-medium border-b pb-2">Account Details</h4>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Creator ID</span>
                <div className="font-mono text-xs">{ id }</div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">User ID</span>
                <div className="font-mono text-xs">{ user_id }</div>
              </div>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
