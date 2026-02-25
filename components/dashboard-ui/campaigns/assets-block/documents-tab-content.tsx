'use client';

import { useTranslations } from 'next-intl';
import { FileCard } from '@/components/campaigns/sections/documents/file-cards';
import type { UploadedFile } from '@/components/campaigns/sections/documents/types';
import { getDocumentType, getFileName } from '../campaign-overview-utils';

interface DocumentsTabContentProps {
  documentItems: string[];
}

export function DocumentsTabContent( { documentItems }: DocumentsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );

  if ( documentItems.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noDocuments' ) }</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      { documentItems.slice( 0, 3 ).map( ( item, index ) => {
        const fileItem: UploadedFile = {
          id: `campaign-overview-doc-${ index }`,
          name: getFileName( item ),
          status: 'success',
          type: getDocumentType( item ),
          url: item,
        };

        return (
          <FileCard
            key={ `${ item }-${ index }` }
            item={ fileItem }
            hideFileName={ true }
            onRemove={ () => { } }
            onUploadSuccess={ () => { } }
            onUploadError={ () => { } }
            onRetry={ () => { } }
            onPreview={ ( previewItem ) => {
              if ( previewItem.url ) window.open( previewItem.url, '_blank', 'noopener,noreferrer' );
            } }
          />
        );
      } ) }
    </div>
  );
}
