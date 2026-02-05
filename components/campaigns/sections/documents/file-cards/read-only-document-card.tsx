import { cn } from '@/lib/dashboard-utils';
import { File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo } from 'react';
import { PdfFileIcon } from '../pdf-file-icon';

interface ReadOnlyDocumentCardProps {
  url: string;
  name: string;
  onPreview?: () => void;
}

export const ReadOnlyDocumentCard = memo( ( { url, name, onPreview }: ReadOnlyDocumentCardProps ) => {
  const isPdf = url.toLowerCase().endsWith( '.pdf' ) || name.toLowerCase().endsWith( '.pdf' );

  return (
    <div
      className={ cn(
        "group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors p-4 aspect-3/4 relative justify-center cursor-pointer hover:border-primary/30 hover:bg-primary/5"
      ) }
      onDoubleClick={ ( e ) => {
        e.stopPropagation();
        onPreview?.();
      } }
    >
      <div className="shrink-0 bg-muted/30 rounded flex flex-col items-center justify-center overflow-hidden w-full relative">
        { isPdf ? (
          <PdfFileIcon className="text-muted-foreground w-20! h-20!" />
        ) : (
          <HugeiconsIcon icon={ File01Icon } className="text-muted-foreground" />
        ) }
      </div>

      <div className="min-w-0 grid gap-1 w-full text-center mt-1">
        <div className="flex items-center justify-center overflow-hidden w-full relative">
          <p className="text-xs font-normal line-clamp-2 wrap-words max-w-full px-2" title={ name }>
            { name }
          </p>
        </div>
      </div>
    </div>
  );
} );

ReadOnlyDocumentCard.displayName = 'ReadOnlyDocumentCard';
