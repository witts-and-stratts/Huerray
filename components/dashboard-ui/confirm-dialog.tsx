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
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className={ cn( 'w-[500px]', className ) }>
        <DialogHeader>
          <DialogTitle className='dialog__title'>
            { title }
          </DialogTitle>
          { description && (
            <DialogDescription>
              { description }
            </DialogDescription>
          ) }
        </DialogHeader>
        { children && (
          <div className="grid gap-4 pt-3">
            { children }
          </div>
        ) }

        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
