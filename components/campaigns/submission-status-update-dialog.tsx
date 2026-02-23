"use client";

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard-ui/select';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { UtilsVideoSubmissionStatus } from '@/lib/api/generated/models';
import { TextCapitalize } from '../text-case';

interface SubmissionStatusUpdateDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  statusValue: UtilsVideoSubmissionStatus;
  statusOptions: UtilsVideoSubmissionStatus[];
  statusComment: string;
  onStatusChange: ( value: UtilsVideoSubmissionStatus ) => void;
  onStatusCommentChange: ( value: string ) => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export function SubmissionStatusUpdateDialog( {
  open,
  onOpenChange,
  statusValue,
  statusOptions,
  statusComment,
  onStatusChange,
  onStatusCommentChange,
  onConfirm,
  isLoading,
}: SubmissionStatusUpdateDialogProps ) {
  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title="Update Submission Status"
      description="Update the current status for this submission."
      confirmLabel="Update Status"
      onConfirm={ onConfirm }
      isLoading={ isLoading }
      loadingText="Updating..."
    >
      <div className="pt-2 space-y-2">
        <div>
          <label className="text-xs font-medium text-foreground">Status</label>
          <Select value={ statusValue } onValueChange={ ( value ) => onStatusChange( value as UtilsVideoSubmissionStatus ) }>
            <SelectTrigger className="mt-1">
              <SelectValue>
                <TextCapitalize>{ statusValue.replace( /_/g, ' ' ) }</TextCapitalize>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              { statusOptions.map( ( status ) => (
                <SelectItem key={ status } value={ status }>
                  <TextCapitalize>{ status.replace( /_/g, ' ' ) }</TextCapitalize>
                </SelectItem>
              ) ) }
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="submission-status-comment" className="text-xs font-medium text-foreground">Comment (Optional)</label>
          <Textarea
            id="submission-status-comment"
            value={ statusComment }
            onChange={ ( e ) => onStatusCommentChange( e.target.value ) }
            placeholder="Add status update note"
            className="mt-1 min-h-20"
          />
        </div>
      </div>
    </ConfirmDialog>
  );
}
