"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { useCreator } from '@/lib/api/hooks/creators';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { cn } from '@/lib/dashboard-utils';
import { SubmissionActionMenu } from './submission-action-menu';
import { TextCapitalize } from '../text-case';

const submissionStatusClass: Record<string, string> = {
  submitted: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  pending: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  approved: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-700 border-red-500/20',
};

interface SubmissionCardProps {
  submission: ModelsVideoSubmissionResponse;
  showActions?: boolean;
}

interface SubmissionMediaProps {
  videoUrl?: string;
}

interface SubmissionStatusBadgeProps {
  status: string;
}

interface SubmissionHeaderProps {
  submission: ModelsVideoSubmissionResponse;
  creatorName: string;
  creatorLocationOrEmail: string;
  profileImageUrl?: string;
  showActions?: boolean;
}

interface SubmissionMetaRowProps {
  status: string;
  createdAt?: string;
}

function getCreatorName( creator?: {
  first_name?: string;
  last_name?: string;
  email?: string;
} ) {
  return `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown Creator';
}

function getCreatorLocationOrEmail( creator?: {
  city?: string;
  country?: string;
  email?: string;
} ) {
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );
  return location || creator?.email || 'Unknown location';
}

function formatSubmittedDate( createdAt?: string ) {
  if ( !createdAt ) return '-';
  return new Date( createdAt ).toLocaleDateString( 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } );
}

function SubmissionMedia( { videoUrl }: SubmissionMediaProps ) {
  if ( videoUrl ) {
    return (
      <video
        src={ videoUrl }
        controls
        preload="metadata"
        className="w-full bg-black/5 object-cover -mt-3 border-b h-32"
      />
    );
  }

  return (
    <div className="w-full bg-muted/30 flex items-center justify-center text-xs text-muted-foreground -mt-3 border-b h-24">
      No video available
    </div>
  );
}

function SubmissionStatusBadge( { status }: SubmissionStatusBadgeProps ) {
  return (
    <span className={ cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium border capitalize",
      "px-2 py-0.5 text-[11px]",
      submissionStatusClass[ status ] || 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    ) }>
      { status.replace( /_/g, ' ' ) }
    </span>
  );
}

function SubmissionHeader( {
  submission,
  creatorName,
  creatorLocationOrEmail,
  profileImageUrl,
  showActions,
}: SubmissionHeaderProps ) {
  return (
    <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1 mt-2 pb-2">
      <div className="flex flex-col flex-1 min-w-0">
        <CardTitle className='font-normal text-primary font-primary truncate text-base'>
          <TextCapitalize>{ submission.title || submission.video_filename || 'Untitled Submission' }</TextCapitalize>
        </CardTitle>
        <CardDescription className="text-muted-foreground/70 text-xs line-clamp-1">
          { submission.description || 'No description provided' }
        </CardDescription>
      </div>
      { showActions ? (
        <div className="flex shrink-0 items-start gap-2">
          <SubmissionActionMenu submission={ submission } />
        </div>
      ) : null }
    </CardHeader>
  );
}

function SubmissionMetaRow( { status, createdAt }: SubmissionMetaRowProps ) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <SubmissionStatusBadge status={ status } />
      <span className='text-xs text-muted-foreground/60'>
        Submitted { formatSubmittedDate( createdAt ) }
      </span>
    </div>
  );
}

export function SubmissionCard( { submission, showActions = true }: SubmissionCardProps ) {
  const status = submission.status?.toLowerCase() || 'unknown';

  return (
    <Card className='pt-3 pb-0 justify-between gap-1 overflow-hidden'>
      <SubmissionMedia videoUrl={ submission.video_url } />
      <SubmissionHeader
        submission={ submission }
        creatorName={ submission.creator?.first_name || '' }
        creatorLocationOrEmail={ submission.creator?.email || '' }
        profileImageUrl={ submission.creator?.profile_image_url }
        showActions={ showActions }
      />

      <CardContent className='pb-2 space-y-2'>
        <div className="flex items-center gap-2 min-w-0 w-full p-1 mb-1 -mt-4">
          <Avatar className="shrink-0 size-9">
            <AvatarImage src={ submission.creator?.profile_image_url } alt={ submission.creator?.first_name || '' } />
            <AvatarFallback>{ submission.creator?.first_name?.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-foreground/70 truncate text-sm">{ submission.creator?.first_name || '' }</p>
            <p className="truncate text-xs -mt-0.5 text-muted-foreground/60">
              { submission.creator?.email || '' }
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='w-full block bg-muted-foreground/5 py-3 rounded-none border-t'>
        <SubmissionMetaRow status={ status } createdAt={ submission.created_at } />
      </CardFooter>
    </Card>
  );
}
