'use client';

import { useState } from 'react';
import { ReadOnlyDocumentCard } from './documents/file-cards/read-only-document-card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';

interface CampaignDocumentsViewProps {
  documents: string[];
}

export function CampaignDocumentsView( { documents }: CampaignDocumentsViewProps ) {
  const [ previewUrl, setPreviewUrl ] = useState<string | null>( null );

  if ( !documents || documents.length === 0 ) {
    return (
      <div className='flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl'>
        <p className='text-muted-foreground'>No documents uploaded</p>
      </div>
    );
  }

  const getFileName = ( url: string, index: number ) => {
    try {
      const decodedUrl = decodeURIComponent( url );
      const filename = decodedUrl.split( '/' ).pop()?.split( '?' )[ 0 ];
      return filename || `Document ${ index + 1 }`;
    } catch {
      return `Document ${ index + 1 }`;
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        { documents.map( ( doc, index ) => (
          <ReadOnlyDocumentCard
            key={ index }
            url={ doc }
            name={ getFileName( doc, index ) }
            onPreview={ () => setPreviewUrl( doc ) }
          />
        ) ) }
      </div>

      <Dialog open={ !!previewUrl } onOpenChange={ () => setPreviewUrl( null ) }>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogTitle className="sr-only">Document Preview</DialogTitle>
          { previewUrl && (
            <iframe
              src={ previewUrl }
              className="w-full h-[80vh]"
              title="Document Preview"
            />
          ) }
        </DialogContent>
      </Dialog>
    </>
  );
}
