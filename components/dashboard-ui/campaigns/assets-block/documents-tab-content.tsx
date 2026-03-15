'use client';

import { useTranslations } from 'next-intl';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import { FileCard } from '@/components/campaigns/sections/documents/file-cards';
import type { UploadedFile } from '@/components/campaigns/sections/documents/types';
import { getDocumentType, getFileName } from '../campaign-overview-utils';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { imgpresets } from '@/lib/utils/imgproxy';
import { PdfFileIcon } from '@/components/campaigns/sections/documents/pdf-file-icon';

interface DocumentsTabContentProps {
  documentItems: ModelsContentMedia[];
  onPreview: ( index: number ) => void;
}

export function DocumentsTabContent( { documentItems, onPreview }: DocumentsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( documentItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noDocuments' ) }</p>;
  }

  return (
    <ScrollArea className="w-full" scrollbar={ { orientation: 'horizontal', style: { height: '6px' } } }>
      <div className="flex gap-2 pb-3">
        { documentItems.filter( ( item ) => item.asset ).map( ( item, index ) => {
          if ( item.thumbnail ) {
            return (
              <div
                key={ `${ item.asset }-${ index }` }
                onClick={ () => onPreview( index ) }
                className="shrink-0 h-36 overflow-hidden rounded-md border border-border/60 bg-muted/20 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative"
                aria-label={ t( 'labels.previewAsset', { index: index + 1 } ) }
              >
                <img src={ imgpresets.card( item.thumbnail ) } alt={ t( 'labels.assetAlt', { index: index + 1 } ) } className="h-full w-auto object-cover" />
                <div className="absolute bottom-1 right-2 bg-background/80 backdrop-blur-md rounded-sm p-1 border shadow-xs">
                  <PdfFileIcon className="text-primary size-4" />
                </div>
              </div>
            );
          }

          const fileItem: UploadedFile = {
            id: `campaign-overview-doc-${ index }`,
            name: getFileName( item.asset! ),
            status: 'success',
            type: getDocumentType( item.asset! ),
            url: item.asset!,
          };

          return (
            <div key={ `${ item.asset }-${ index }` } className="shrink-0 w-24">
              <FileCard
                item={ fileItem }
                hideFileName={ true }
                onRemove={ () => { } }
                onUploadSuccess={ () => { } }
                onUploadError={ () => { } }
                onRetry={ () => { } }
                onPreview={ () => onPreview( index ) }
              />
            </div>
          );
        } ) }
      </div>
    </ScrollArea>
  );
}
