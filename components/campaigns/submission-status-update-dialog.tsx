"use client";

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard-ui/select';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { UtilsVideoSubmissionStatus } from '@/lib/api/generated/models';
import { TextCapitalize } from '../text-case';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations( 'dashboard.brand.submissionsPage.actions' );
  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title={ t( 'updateStatusTitle' ) }
      description={ t( 'updateStatusDescription' ) }
      confirmLabel={ t( 'updateStatus' ) }
      onConfirm={ onConfirm }
      isLoading={ isLoading }
      loadingText={ t( 'updating' ) }
    >
      <div className="pt-2 space-y-2">
        <div>
          <label className="text-xs font-medium text-foreground">{ t( 'status' ) }</label>
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
          <label htmlFor="submission-status-comment" className="text-xs font-medium text-foreground">{ t( 'commentOptional' ) }</label>
          <Textarea
            id="submission-status-comment"
            value={ statusComment }
            onChange={ ( e ) => onStatusCommentChange( e.target.value ) }
            placeholder={ t( 'statusUpdateNotePlaceholder' ) }
            className="mt-1 min-h-20"
          />
        </div>
      </div>
    </ConfirmDialog>
  );
}
