'use client';

import * as React from 'react';
import { Activity } from 'react';
import { ModelsUserResponse } from '@/lib/api/generated/models';
import { useUser } from '@/lib/api/hooks/users';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Avatar, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { Separator } from '@/components/dashboard-ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { Badge } from '@/components/dashboard-ui/badge';
import { UserStatusBadge } from './user-status-badge';
import { useFormatDate } from '@/lib/hooks/format';
import { cn } from '@/lib/dashboard-utils';
import { Row } from '@/components/admin/creators/details-sheet/creator-details-shared';
import { EmailStatusBadge, StatusBadge } from '@/components/dashboard-ui/status-badge';

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

export function UserDetailsSheet( { user, open, onOpenChange }: UserDetailsSheetProps ) {
  const userId = user?.id || '';
  const { data: userDetails } = useUser( userId );
  const [ activeTab, setActiveTab ] = React.useState( 'account' );

  if ( !user ) return null;

  const profile = userDetails || user;
  const {
    first_name,
    last_name,
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

  const joinedLabel = useFormatDate( created_at || '' );
  const updatedLabel = useFormatDate( updated_at || '' );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! overflow-y-auto bg-background/90">

        { /* ── Header ── */ }
        <SheetHeader className="relative flex flex-row items-center gap-4 bg-textured p-6 pb-8 m-6 rounded-lg mt-16 mb-0">
          <Avatar className={ cn(
            "bg-muted-foreground/10 size-28 ring-background/10 ring-10 ring-offset-0",
            "border-border/60"
          ) }>
            <AvatarFallback className="text-3xl">{ initials }</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start gap-1.5">
              <SheetTitle className="text-xl font-normal text-white font-primary capitalize tracking-tight">
                { fullName }
              </SheetTitle>
              { email && <span className="text-sm text-white/60 mb-1.5">{ email }</span> }
            </div>

            <div className="flex items-center pt-3 flex-wrap">
              <UserStatusBadge status={ user_status || 'unknown' } className='bg-white/80' />
              <EmailStatusBadge status={ email_verified ? 'Email verified' : 'Email unverified' } className={ cn(
                "bg-background/10",
                email_verified
                  ? "border-green-400/40 text-green-300"
                  : "border-amber-400/40 text-maroon-200"
              ) } />
            </div>
          </div>

          <SheetDescription className="sr-only">
            Detailed information about user { fullName }.
          </SheetDescription>
        </SheetHeader>

        { /* ── Tabs ── */ }
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="account" className="text-sm font-normal">Account</TabsTrigger>
            <TabsTrigger value="system" className="text-sm font-normal">System</TabsTrigger>
          </TabsList>

          { /* Account */ }
          <Activity mode={ activeTab === 'account' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title="Contact">
                <Row
                  label="Email"
                  value={
                    email ? (
                      <CopyText text={ email } iconSide='left' copyMessage="Email copied">
                        <span className="truncate">{ email }</span>
                      </CopyText>
                    ) : 'N/A'
                  }
                />
                <Separator />
                <Row
                  label="Username"
                  value={
                    username ? (
                      <CopyText text={ username } iconSide='left' copyMessage="Username copied">
                        @{ username }
                      </CopyText>
                    ) : 'N/A'
                  }
                />
              </WrappedCard>

              <WrappedCard title="Account Details">
                <Row label="Type" value={ toLabel( user_type ) } />
                <Separator />
                <Row label="Status" value={ <UserStatusBadge status={ user_status || 'unknown' } className='-mr-3' /> } />
                <Separator />
                <Row label="Email verified" value={ email_verified ? 'Yes' : 'No' } />
              </WrappedCard>
            </div>
          </Activity>

          { /* System */ }
          <Activity mode={ activeTab === 'system' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title="System Details">
                <Row
                  label="User ID"
                  value={
                    id ? (
                      <CopyText text={ id } copyMessage="User ID copied" iconSide='left'>
                        <span className="font-mono text-xs break-all">{ id }</span>
                      </CopyText>
                    ) : 'N/A'
                  }
                />
                <Separator />
                <Row label="Joined" value={ joinedLabel } />
                <Separator />
                <Row label="Last updated" value={ updatedLabel } />
              </WrappedCard>
            </div>
          </Activity>
        </Tabs>

      </SheetContent>
    </Sheet>
  );
}
