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
import { Badge } from '@/components/dashboard-ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { Separator } from '@/components/dashboard-ui/separator';
import { UserStatusBadge } from './user-status-badge';
import { formatDate } from '@/lib/utils';

interface UserDetailsSheetProps {
  user: ModelsUserResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

function toLabel( value?: string ) {
  if ( !value ) return 'N/A';
  return value
    .replace( /_/g, ' ' )
    .replace( /\b\w/g, ( char ) => char.toUpperCase() );
}

function InfoRow( {
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
} ) {
  return (
    <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{ label }</span>
        <span className="text-right text-sm font-medium">{ value }</span>
      </div>
    </div>
  );
}

export function UserDetailsSheet( { user, open, onOpenChange }: UserDetailsSheetProps ) {
  const userId = user?.id || '';
  const { data: userDetails } = useUser( userId );

  if ( !user ) return null;

  const profile = userDetails || user;
  const {
    first_name,
    last_name,
    middle_name,
    username,
    email,
    phone_number,
    user_type,
    user_status,
    email_verified,
    created_at,
    updated_at,
    id,
  } = profile;

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || username || 'Unknown';
  const initials = fullName
    .split( ' ' )
    .filter( Boolean )
    .slice( 0, 2 )
    .map( ( part ) => part[ 0 ] )
    .join( '' )
    .toUpperCase() || 'U';
  const joinedLabel = formatDate( created_at || '' );
  const updatedLabel = formatDate( updated_at || '' );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-slate-50/60 p-0">
        <SheetHeader className="gap-4 border-b border-border/50 bg-white p-5 pb-4">
          <div className="rounded-xl border border-primary/20 bg-burgundy-50 p-4">
            <div className="flex flex-col items-center text-center gap-3">
              <Avatar className="size-24 bg-background">
                <AvatarImage src={ undefined } alt={ fullName } />
                <AvatarFallback className="text-xl font-semibold">{ initials }</AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-1">
                <SheetTitle className="text-xl leading-tight">{ fullName }</SheetTitle>
                <div className="text-sm text-muted-foreground">
                  { middle_name ? `${ middle_name } ` : '' }{ toLabel( user_type ) }
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <UserStatusBadge status={ user_status || 'unknown' } />
                <Badge
                  variant="outline"
                  className={ email_verified ? 'border-green-200 bg-green-50 text-green-700' : 'border-amber-200 bg-amber-50 text-amber-700' }
                >
                  { email_verified ? 'Verified email' : 'Unverified email' }
                </Badge>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Joined { joinedLabel }</span>
                <Separator orientation="vertical" className="h-3" />
                <span>Updated { updatedLabel }</span>
              </div>
              <div className="text-sm">
                { username ? (
                  <CopyText text={ username } copyMessage="Username copied" className="text-muted-foreground">
                    @{ username }
                  </CopyText>
                ) : (
                  <span className="text-muted-foreground">No username</span>
                ) }
              </div>
            </div>
          </div>

          <SheetDescription className="sr-only">
            Detailed information about this user
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 p-5">
          <div className="rounded-xl border border-border/60 bg-slate-50/70 p-3 space-y-2">
            <InfoRow
              label="Email"
              value={
                email ? (
                  <CopyText text={ email } copyMessage="Email copied" className="justify-end text-right max-w-full">
                    <span className="truncate">{ email }</span>
                  </CopyText>
                ) : 'N/A'
              }
            />
            <InfoRow
              label="Phone"
              value={ phone_number || 'N/A' }
            />
            <InfoRow
              label="Username"
              value={
                username ? (
                  <CopyText text={ username } copyMessage="Username copied" className="justify-end text-right max-w-full">
                    @{ username }
                  </CopyText>
                ) : 'N/A'
              }
            />
            <InfoRow
              label="User ID"
              value={
                id ? (
                  <CopyText text={ id } copyMessage="User ID copied" className="justify-end text-right max-w-full">
                    <span className="font-mono text-xs">{ id }</span>
                  </CopyText>
                ) : 'N/A'
              }
            />
            <InfoRow
              label="Email Verification"
              value={ email_verified ? 'Verified' : 'Pending' }
            />
            <InfoRow
              label="Created At"
              value={ joinedLabel }
            />
            <InfoRow
              label="Last Updated"
              value={ updatedLabel }
            />
          </div>

          <Separator />
          <div className="rounded-lg border border-dashed border-border/80 bg-white px-3 py-2 text-xs text-muted-foreground">
            User details are fetched from the Users API and reflect the current account state.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
