'use client';

import { Dialog, DialogContent } from '@/components/dashboard-ui/dialog';

interface ImagePreviewDialogProps {
  imageUrl: string | null;
  onOpenChange: ( open: boolean ) => void;
}

export function ImagePreviewDialog( { imageUrl, onOpenChange }: ImagePreviewDialogProps ) {
  return (
    <Dialog open={ !!imageUrl } onOpenChange={ onOpenChange }>
      <DialogContent className="max-w-4xl p-2">
        { imageUrl ? (
          <div className="overflow-hidden rounded-md border border-border/60 bg-muted/10">
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img src={ imageUrl } alt="Campaign image preview" className="max-h-[80vh] w-full object-contain" />
          </div>
        ) : null }
      </DialogContent>
    </Dialog>
  );
}
