'use client';

import { useState } from 'react';
import { ReadOnlyImageCard } from './documents/file-cards/read-only-image-card';
import { Media } from './documents/media';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { useTranslations } from 'next-intl';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';
import { ImageIcon } from 'lucide-react';

interface CampaignImagesViewProps {
  images: string[];
}

export function CampaignImagesView( { images }: CampaignImagesViewProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const [ previewImage, setPreviewImage ] = useState<string | null>( null );

  if ( !images || images.length === 0 ) {
    return (
      <Empty className='border py-20 my-6 flex-1 bg-white'>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <ImageIcon />
          </EmptyMedia>
          <EmptyTitle className='font-normal font-primary text-primary'>{ t( 'noImagesUploaded' ) }</EmptyTitle>
          <EmptyDescription>
            { t( 'noImagesUploadedDescription' ) }
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const getFileName = ( url: string, index: number ) => {
    try {
      const decodedUrl = decodeURIComponent( url );
      const filename = decodedUrl.split( '/' ).pop()?.split( '?' )[ 0 ];
      return filename || `Image ${ index + 1 }`;
    } catch {
      return `Image ${ index + 1 }`;
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        { images.map( ( image, index ) => (
          <ReadOnlyImageCard
            key={ index }
            url={ image }
            name={ getFileName( image, index ) }
            onPreview={ () => setPreviewImage( image ) }
          />
        ) ) }
      </div>

      <Dialog open={ !!previewImage } onOpenChange={ () => setPreviewImage( null ) }>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="sr-only">{ t( 'imagePreview' ) }</DialogTitle>
          { previewImage && (
            <Media
              url={ previewImage }
              alt={ t( 'preview' ) }
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          ) }
        </DialogContent>
      </Dialog>
    </>
  );
}
