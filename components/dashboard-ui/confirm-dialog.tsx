import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { Button } from "@/components/dashboard-ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from 'react';
import { cn } from "@/lib/dashboard-utils";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string; // For DialogContent customizations if needed

  // Default action props
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean; // Add this line
  isLoading?: boolean;     // Add this line
  loadingText?: string;   // Add this line
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function ConfirmDialog( {
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  className,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  confirmDisabled,
  isLoading,
  loadingText = "Processing...",
  variant = "default"
}: ConfirmDialogProps ) {

  const handleCancel = () => {
    if ( onCancel ) {
      onCancel();
    } else {
      onOpenChange( false );
    }
  };

  return (
    <AlertDialog open={ open } onOpenChange={ onOpenChange }>
      <AlertDialogContent className={ cn( 'w-[500px]', className ) }>
        <AlertDialogHeader>
          <AlertDialogTitle className='dialog__title'>
            { title }
          </AlertDialogTitle>
          { description && (
            <AlertDialogDescription>
              { description }
            </AlertDialogDescription>
          ) }
        </AlertDialogHeader>
        { children && (
          <div className="grid gap-4 pt-3">
            { children }
          </div>
        ) }

        <AlertDialogFooter>
          { actions ? actions : (
            <>
              <Button
                variant="outline"
                onClick={ handleCancel }
                disabled={ isLoading }
              >
                { cancelLabel }
              </Button>
              <Button
                variant={ variant }
                onClick={ onConfirm }
                disabled={ confirmDisabled || isLoading }
              >
                { isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    { loadingText }
                  </>
                ) : confirmLabel }
              </Button>
            </>
          ) }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
