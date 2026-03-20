import { useEffect, useState } from 'react';
import { MediaPreview, type LegacyMediaItem } from '@/components/campaigns/media-preview';
import { UploadedFile } from './types';

interface PreviewDialogProps {
  item: UploadedFile | null;
  onClose: () => void;
}

export function PreviewDialog( { item, onClose }: PreviewDialogProps ) {
  const [ mediaItem, setMediaItem ] = useState<LegacyMediaItem | null>( null );

  useEffect( () => {
    if ( !item ) {
      setMediaItem( null );
      return;
    }

    // Uploaded file — use the final URL directly
    if ( item.url ) {
      setMediaItem( {
        url: item.url,
        thumbnail: item.thumbnail,
        name: item.name,
        type: item.type,
      } );
      return;
    }

    // Still uploading — create a blob URL from the File so videos/PDFs are actually previewable
    if ( item.file ) {
      const blobUrl = URL.createObjectURL( item.file );
      setMediaItem( {
        url: blobUrl,
        thumbnail: item.preview,
        name: item.name,
        type: item.type,
      } );
      return () => URL.revokeObjectURL( blobUrl );
    }

    // Fallback (images already have a full data URL in preview)
    setMediaItem( {
      url: item.preview ?? '',
      thumbnail: item.thumbnail,
      name: item.name,
      type: item.type,
    } );
  }, [ item ] );

  return (
    <MediaPreview
      items={ mediaItem ? [ mediaItem ] : [] }
      initialIndex={ mediaItem ? 0 : null }
      onOpenChange={ ( open ) => { if ( !open ) onClose(); } }
    />
  );
}
