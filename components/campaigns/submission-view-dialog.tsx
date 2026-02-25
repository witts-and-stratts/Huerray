"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Dialog, DialogContent, DialogTitle } from '@/components/dashboard-ui/dialog';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { TextCapitalize } from '../text-case';

interface SubmissionViewDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  submission: ModelsVideoSubmissionResponse;
}

export function SubmissionViewDialog( { open, onOpenChange, submission }: SubmissionViewDialogProps ) {
  const { data: creatorProfile } = useCreator(
    submission.creator_id || '',
    { enabled: !!submission.creator_id && open }
  );

  const creatorDisplayName = `${ creatorProfile?.first_name || submission.creator?.first_name || '' } ${ creatorProfile?.last_name || submission.creator?.last_name || '' }`.trim()
    || creatorProfile?.email
    || submission.creator?.email
    || 'Unknown Creator';
  const creatorSecondary = [
    creatorProfile?.email || submission.creator?.email,
    creatorProfile?.city || submission.creator?.city,
    creatorProfile?.country || submission.creator?.country,
  ].filter( Boolean ).join( ' • ' ) || 'No creator details available';
  const creatorAvatar = creatorProfile?.profile_image_url || submission.creator?.profile_image_url;

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="p-0 gap-0 overflow-hidden max-w-5xl!">
        <div className="w-full md:min-h-[500px] bg-black transition-all duration-300 ease-in-out">
          <video
            src={ submission.video_url || '' }
            controls
            preload="metadata"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4 border-t bg-muted/20">
          <DialogTitle className="mb-3">
            <TextCapitalize>{ submission.title || submission.video_filename || 'Untitled Submission' }</TextCapitalize>
          </DialogTitle>
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-10 shrink-0">
              <AvatarImage src={ creatorAvatar } alt={ creatorDisplayName } />
              <AvatarFallback>{ creatorDisplayName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                <TextCapitalize>{ creatorDisplayName }</TextCapitalize>
              </p>
              <p className="text-xs text-muted-foreground truncate">
                { creatorSecondary }
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
