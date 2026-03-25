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
import { EmailStatusBadge } from '@/components/dashboard-ui/status-badge';
import { useTranslations } from "next-intl";
import { useMessage } from '@/lib/hooks/use-filter-label';

interface UserDetailsSheetProps {
  user: ModelsUserResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

function toLabel( value: string | undefined, t: any ) {
  if ( !value ) return t( 'userDetailsSheet.na' );
  return value
    .replace( /_/g, ' ' )
    .replace( /\b\w/g, ( char ) => char.toUpperCase() );
}

export function UserDetailsSheet( { user, open, onOpenChange }: UserDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const userId = user?.id || '';
  const { data: userDetails } = useUser( userId );
  const [ activeTab, setActiveTab ] = React.useState( 'account' );

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
  } = profile || {};

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || username || t( 'userDetailsSheet.unknown' );
  const userTypeLabel = useMessage( user_type || '' );
  const joinedLabel = useFormatDate( created_at || '' );
  const updatedLabel = useFormatDate( updated_at || '' );

  if ( !user ) return null;

  const initials = fullName
    .split( ' ' )
    .filter( Boolean )
    .slice( 0, 2 )
    .map( ( part ) => part[ 0 ] )
    .join( '' )
    .toUpperCase() || 'U';

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
              <EmailStatusBadge status={ email_verified ? t( 'userDetailsSheet.emailVerified' ) : t( 'userDetailsSheet.emailUnverified' ) } className={ cn(
                "bg-background/10",
                email_verified
                  ? "border-green-400/40 text-green-300"
                  : "border-amber-400/40 text-maroon-200"
              ) } />
            </div>
          </div>

          <SheetDescription className="sr-only">
            { t( 'userDetailsSheet.detailedInformationAboutUser' ) }{ fullName }.
          </SheetDescription>
        </SheetHeader>

        { /* ── Tabs ── */ }
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="account" className="text-sm font-normal">{ t( 'userDetailsSheet.account' ) }</TabsTrigger>
            <TabsTrigger value="system" className="text-sm font-normal">{ t( 'userDetailsSheet.system' ) }</TabsTrigger>
          </TabsList>

          { /* Account */ }
          <Activity mode={ activeTab === 'account' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title={ t( 'userDetailsSheet.contact' ) }>
                <Row
                  label={ t( 'userDetailsSheet.email' ) }
                  value={
                    email ? (
                      <CopyText text={ email } iconSide='left' copyMessage={ t( 'userDetailsSheet.emailCopied' ) }>
                        <span className="truncate">{ email }</span>
                      </CopyText>
                    ) : t( 'userDetailsSheet.na' )
                  }
                />
                <Separator />
                <Row
                  label={ t( 'userDetailsSheet.username' ) }
                  value={
                    username ? (
                      <CopyText text={ username } iconSide='left' copyMessage={ t( 'userDetailsSheet.usernameCopied' ) }>
                        @{ username }
                      </CopyText>
                    ) : t( 'userDetailsSheet.na' )
                  }
                />
              </WrappedCard>

              <WrappedCard title={ t( 'userDetailsSheet.accountDetails' ) }>
                <Row label={ t( 'userDetailsSheet.type' ) } value={ toLabel( userTypeLabel, t ) } />
                <Separator />
                <Row label={ t( 'userDetailsSheet.status' ) } value={ <UserStatusBadge status={ user_status || 'unknown' } className='-mr-3' /> } />
                <Separator />
                <Row label={ t( 'userDetailsSheet.emailVerified' ) } value={ email_verified ? t( 'userDetailsSheet.yes' ) : t( 'userDetailsSheet.no' ) } />
              </WrappedCard>
            </div>
          </Activity>

          { /* System */ }
          <Activity mode={ activeTab === 'system' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title={ t( 'userDetailsSheet.systemDetails' ) }>
                <Row
                  label={ t( 'userDetailsSheet.userId' ) }
                  value={
                    id ? (
                      <CopyText text={ id } copyMessage={ t( 'userDetailsSheet.userIdCopied' ) } iconSide='left'>
                        <span className="font-mono text-xs break-all">{ id }</span>
                      </CopyText>
                    ) : t( 'userDetailsSheet.na' )
                  }
                />
                <Separator />
                <Row label={ t( 'userDetailsSheet.joined' ) } value={ joinedLabel } />
                <Separator />
                <Row label={ t( 'userDetailsSheet.lastUpdated' ) } value={ updatedLabel } />
              </WrappedCard>
            </div>
          </Activity>
        </Tabs>

      </SheetContent>
    </Sheet>
  );
}
