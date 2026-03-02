'use client';

import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';

interface ImagesTabContentProps {
  imageItems: string[];
  onPreview: ( index: number ) => void;
}

export function ImagesTabContent( { imageItems, onPreview }: ImagesTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( imageItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noImages' ) }</p>;
  }

  return (
    <ScrollArea className="w-full" scrollbar={ { orientation: 'horizontal' } }>
      <div className="flex gap-2 pb-3">
        { imageItems.map( ( item, index ) => (
          <button
            key={ `${ item }-${ index }` }
            type="button"
            onClick={ () => onPreview( index ) }
            className="shrink-0 w-24 overflow-hidden rounded-md border border-border/60 bg-muted/20 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={ t( 'labels.previewAsset', { index: index + 1 } ) }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img src={ item } alt={ t( 'labels.assetAlt', { index: index + 1 } ) } className="aspect-square w-full object-cover" />
          </button>
        ) ) }
      </div>
    </ScrollArea>
  );
}
