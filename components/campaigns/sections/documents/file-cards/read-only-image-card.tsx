import { Card, CardContent } from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { memo, useCallback } from 'react';
import { Media } from '../media';
import { imgpresets } from '@/lib/utils/imgproxy';

interface ReadOnlyImageCardProps {
  url: string;
  name: string;
  onPreview?: () => void;
}


export const ReadOnlyImageCard = memo( ( { url, name, onPreview }: ReadOnlyImageCardProps ) => {
  const handleDoubleClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onPreview?.();
  }, [ onPreview ] );

  return (
    <div
      className={ cn(
        "group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors p-4 aspect-3/4 relative justify-center cursor-pointer hover:border-primary/30 hover:bg-primary/5"
      ) }
      onDoubleClick={ handleDoubleClick }
    >
      <div className="shrink-0 bg-muted/30 rounded flex flex-col items-center justify-center overflow-hidden w-full relative">
        <Media url={ imgpresets.card( url ) } alt={ name } className="w-full max-h-40 object-cover object-top" />
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

ReadOnlyImageCard.displayName = 'ReadOnlyImageCard';
