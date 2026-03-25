'use client';

import { useState } from 'react';
import { ReadOnlyDocumentCard } from './documents/file-cards/read-only-document-card';
import PdfPreview from './documents/pdf-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { useTranslations } from 'next-intl';

interface CampaignDocumentsViewProps {
  documents: string[];
}

export function CampaignDocumentsView( { documents }: CampaignDocumentsViewProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const [ previewUrl, setPreviewUrl ] = useState<string | null>( null );

  if ( !documents || documents.length === 0 ) {
    return (
      <Empty className='border py-20 my-6 flex-1 bg-white'>
        <EmptyHeader>
          <EmptyMedia>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </EmptyMedia>
          <EmptyTitle className='font-normal font-primary text-primary'>{ t( 'noDocumentsUploaded' ) }</EmptyTitle>
          <EmptyDescription>
            { t( 'noDocumentsUploadedDescription' ) }
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
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
          <DialogTitle className="sr-only">{ t( 'documentPreview' ) }</DialogTitle>
          { previewUrl && ( previewUrl.toLowerCase().endsWith( '.pdf' ) || getFileName( previewUrl, 0 ).toLowerCase().endsWith( '.pdf' ) ) ? (
            <div className="h-[80vh]">
              <PdfPreview src={ previewUrl } />
            </div>
          ) : previewUrl ? (
            <iframe
              src={ previewUrl }
              className="w-full h-[80vh]"
              title={ t( 'documentPreview' ) }
            />
          ) : null }
        </DialogContent>
      </Dialog>
    </>
  );
}
