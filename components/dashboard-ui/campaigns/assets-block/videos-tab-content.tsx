'use client';

import { useTranslations } from 'next-intl';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import { Play, PlayCircle } from 'lucide-react';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { imgpresets } from '@/lib/utils/imgproxy';

interface VideosTabContentProps {
  videoItems: ModelsContentMedia[];
  onPreview: ( index: number ) => void;
}

export function VideosTabContent( { videoItems, onPreview }: VideosTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( videoItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noVideos' ) }</p>;
  }


  return (
    <ScrollArea className="w-full" scrollbar={ { orientation: 'horizontal', style: { height: '6px' } } }>
      <div className="flex gap-2 pb-3">
        { videoItems.filter( ( item ) => item.asset ).map( ( item, index ) => {
          return <div
            key={ `${ item.asset }-${ index }` }
            onClick={ () => onPreview( index ) }
            className="shrink-0 h-36 overflow-hidden rounded-md border border-border/60 bg-muted/20 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative group"
            aria-label={ t( 'labels.previewAsset', { index: index + 1 } ) }
          >
            <video
              src={ item.asset }
              className="h-full w-auto object-contain bg-muted"
              poster={ item.thumbnail ? imgpresets.card( item.thumbnail ) : undefined }
              muted
              preload="metadata"
            />
            <div className="absolute bottom-1 right-1 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
              <Play className="size-4 text-white/90" strokeWidth={ 1.5 } />
            </div>
          </div>;
        } ) }
      </div>
    </ScrollArea>
  );
}
