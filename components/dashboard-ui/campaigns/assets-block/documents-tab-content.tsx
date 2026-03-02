'use client';

import { useTranslations } from 'next-intl';
import { FileCard } from '@/components/campaigns/sections/documents/file-cards';
import type { UploadedFile } from '@/components/campaigns/sections/documents/types';
import { getDocumentType, getFileName } from '../campaign-overview-utils';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';

interface DocumentsTabContentProps {
  documentItems: string[];
  onPreview: ( index: number ) => void;
}

export function DocumentsTabContent( { documentItems, onPreview }: DocumentsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( documentItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noDocuments' ) }</p>;
  }

  return (
    <ScrollArea className="w-full" scrollbar={ { orientation: 'horizontal' } }>
      <div className="flex gap-2 pb-3">
        { documentItems.map( ( item, index ) => {
          const fileItem: UploadedFile = {
            id: `campaign-overview-doc-${ index }`,
            name: getFileName( item ),
            status: 'success',
            type: getDocumentType( item ),
            url: item,
          };

          return (
            <div key={ `${ item }-${ index }` } className="shrink-0 w-24">
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
