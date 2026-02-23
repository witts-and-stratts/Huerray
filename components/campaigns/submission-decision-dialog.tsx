"use client";

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Textarea } from '@/components/dashboard-ui/textarea';

interface SubmissionDecisionDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  title: string;
  description: string;
  confirmLabel: string;
  comment: string;
  onCommentChange: ( value: string ) => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  loadingText: string;
  fieldId: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  variant?: 'default' | 'destructive';
}

export function SubmissionDecisionDialog( {
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  comment,
  onCommentChange,
  onConfirm,
  isLoading,
  loadingText,
  fieldId,
  fieldLabel,
  fieldPlaceholder,
  variant = 'default',
}: SubmissionDecisionDialogProps ) {
  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title={ title }
      description={ description }
      confirmLabel={ confirmLabel }
      variant={ variant }
      onConfirm={ onConfirm }
      isLoading={ isLoading }
      loadingText={ loadingText }
    >
      <div className="pt-2">
        <label htmlFor={ fieldId } className="text-xs font-medium text-foreground">{ fieldLabel }</label>
        <Textarea
          id={ fieldId }
          value={ comment }
          onChange={ ( e ) => onCommentChange( e.target.value ) }
          placeholder={ fieldPlaceholder }
          className="mt-1 min-h-20"
        />
      </div>
    </ConfirmDialog>
  );
}
