import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { FilePreview } from './file-preview';
import { UploadedFile } from './types';

interface PreviewDialogProps {
  item: UploadedFile | null;
  onClose: () => void;
}

export function PreviewDialog( { item, onClose }: PreviewDialogProps ) {
  return (
    <Dialog open={ !!item } onOpenChange={ ( open ) => !open && onClose() } modal>
      <DialogContent className="w-full md:w-[1000px] md:max-w-none h-[80vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm gap-0">
        <DialogHeader className="p-4 border-b shrink-0 flex flex-row items-center justify-between">
          <DialogTitle className="truncate pr-8 text-h6! font-primary font-normal text-muted-foreground/78">
            { item?.name }
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden relative bg-muted/20 flex items-center justify-center p-4">
          { item && (
            <FilePreview item={ item } />
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}
