'use client';

import { useTranslations } from 'next-intl';

interface ImagesTabContentProps {
  imageItems: string[];
  onPreview: ( imageUrl: string ) => void;
}

export function ImagesTabContent( { imageItems, onPreview }: ImagesTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( imageItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noImages' ) }</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      { imageItems.slice( 0, 3 ).map( ( item, index ) => (
        <button
          key={ `${ item }-${ index }` }
          type="button"
          onClick={ () => onPreview( item ) }
          className="overflow-hidden rounded-md border border-border/60 bg-muted/20 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={ t( 'labels.previewAsset', { index: index + 1 } ) }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */ }
          <img src={ item } alt={ t( 'labels.assetAlt', { index: index + 1 } ) } className="aspect-square w-full object-cover" />
        </button>
      ) ) }
    </div>
  );
}
