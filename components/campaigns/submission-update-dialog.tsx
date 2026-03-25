"use client";

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { Label } from '@/components/dashboard-ui/label';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { VideoDropzone } from '@/components/creator/video-dropzone';
import { VideoUploadResponseData } from '@/components/campaigns/sections/documents/types';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title={ t( 'updateSubmissionTitle' ) }
      description={ t( 'updateSubmissionDescription' ) }
      confirmLabel={ t( 'updateSubmission' ) }
      onConfirm={ onConfirm }
      isLoading={ isLoading }
      loadingText={ t( 'updating' ) }
    >
      <div className="pt-2 space-y-2">
        <div>
          <label htmlFor="submission-title" className="text-xs font-medium text-foreground">{ t( 'title' ) }</label>
          <Input
            id="submission-title"
            value={ title }
            onChange={ ( e ) => onTitleChange( e.target.value ) }
            placeholder={ t( 'submissionTitlePlaceholder' ) }
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="submission-description" className="text-xs font-medium text-foreground">{ t( 'description' ) }</label>
          <Textarea
            id="submission-description"
            value={ description }
            onChange={ ( e ) => onDescriptionChange( e.target.value ) }
            placeholder={ t( 'submissionDescriptionPlaceholder' ) }
            className="mt-1 min-h-20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="video">{ t( 'videoFile' ) }</Label>
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
            { t( 'uploadRequiredMessage' ) }
          </p>
        </div>
      </div>
    </ConfirmDialog>
  );
}
