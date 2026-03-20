"use client";

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { Label } from '@/components/dashboard-ui/label';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { VideoDropzone } from '@/components/creator/video-dropzone';
import { VideoUploadResponseData } from '@/components/campaigns/sections/documents/types';

interface SubmissionUpdateDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  title: string;
  description: string;
  videoFile: File | null;
  updateSubmissionError: string | null;
  onTitleChange: ( value: string ) => void;
  onDescriptionChange: ( value: string ) => void;
  onVideoChange: ( file: File | null ) => void;
  onUploadSuccess: ( data: VideoUploadResponseData ) => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export function SubmissionUpdateDialog( {
  open,
  onOpenChange,
  title,
  description,
  videoFile,
  updateSubmissionError,
  onTitleChange,
  onDescriptionChange,
  onVideoChange,
  onUploadSuccess,
  onConfirm,
  isLoading,
}: SubmissionUpdateDialogProps ) {
  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title="Update Submission"
      description="Update the submission details."
      confirmLabel="Update"
      onConfirm={ onConfirm }
      isLoading={ isLoading }
      loadingText="Updating..."
    >
      <div className="pt-2 space-y-2">
        <div>
          <label htmlFor="submission-title" className="text-xs font-medium text-foreground">Title</label>
          <Input
            id="submission-title"
            value={ title }
            onChange={ ( e ) => onTitleChange( e.target.value ) }
            placeholder="Submission title"
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="submission-description" className="text-xs font-medium text-foreground">Description</label>
          <Textarea
            id="submission-description"
            value={ description }
            onChange={ ( e ) => onDescriptionChange( e.target.value ) }
            placeholder="Submission description"
            className="mt-1 min-h-20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="video">Video File</Label>
          <VideoDropzone
            value={ videoFile }
            videoAspect
            onChange={ onVideoChange }
            onUploadSuccess={ onUploadSuccess }
            showTitle={ false }
          />
          { updateSubmissionError && (
            <p className="text-sm text-destructive">{ updateSubmissionError }</p>
          ) }
          <p className="text-xs text-muted-foreground">
            Upload is required. Submission cannot be updated without a newly uploaded video.
          </p>
        </div>
      </div>
    </ConfirmDialog>
  );
}
