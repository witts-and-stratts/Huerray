'use client';

import { useTranslations } from 'next-intl';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { imgpresets } from '@/lib/utils/imgproxy';

interface ImagesTabContentProps {
  imageItems: ModelsContentMedia[];
  onPreview: ( index: number ) => void;
}

export function ImagesTabContent( { imageItems, onPreview }: ImagesTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( imageItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noImages' ) }</p>;
  }

  return (
    <ScrollArea className="w-full" scrollbar={ { orientation: 'horizontal', style: { height: '6px' } } }>
      <div className="flex gap-2 pb-3">
        { imageItems.filter( ( item ) => item.asset ).map( ( item, index ) => (
          <button
            key={ `${ item.asset }-${ index }` }
            type="button"
            onClick={ () => onPreview( index ) }
            className="shrink-0 h-36 overflow-hidden rounded-md border border-border/60 bg-muted/20 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={ t( 'labels.previewAsset', { index: index + 1 } ) }
          >
            <img src={ imgpresets.card( item.thumbnail ?? item.asset! ) } alt={ t( 'labels.assetAlt', { index: index + 1 } ) } className="h-full w-auto object-cover" />
          </button>
        ) ) }
      </div>
    </ScrollArea>
  );
}
