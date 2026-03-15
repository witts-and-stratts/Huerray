import { Card } from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { AnimatePresence } from 'motion/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { CampaignFormApi } from '../schema';
import { FilesDropzone } from './documents/files-dropzone';
import { ImportUrlDialog } from './documents/import-url-dialog';
import { PreviewDialog } from './documents/preview-dialog';
import { UploadedFile } from './documents/types';
import { useCampaignFiles } from './documents/use-campaign-files';
import { VideoFileIcon } from './documents/video-file-icon';

export const CampaignVideosSection = memo( function CampaignVideosSection( {
  form,
  fileState
}: { form: CampaignFormApi; fileState: ReturnType<typeof useCampaignFiles>; } ) {
  const {
    items,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleRemove,
    handleDropError,
    handleUploadSuccess,
    handleUploadError,
    handleRetry,
    addImportedItem,
    setItemsFromUrls
  } = fileState;

  // Sync from form state to local state (initial load / restoration)
  useEffect( () => {
    if ( form.state.values.videos && form.state.values.videos.length > 0 && items.length === 0 ) {
      console.debug( '[CampaignVideosSection] Restoring videos from form state:', form.state.values.videos );
      setItemsFromUrls( form.state.values.videos );
    }
  }, [ form.state.values.videos, setItemsFromUrls ] );

  // Sync from local state to form state (on changes)
  useEffect( () => {
    const urls = items.filter( i => i.status === 'success' ).map( i => i.url );
    if ( JSON.stringify( urls ) !== JSON.stringify( form.state.values.videos ) ) {
      form.setFieldValue( 'videos', urls );
    }
  }, [ items, form ] );

  const [ isImportDialogOpen, setIsImportDialogOpen ] = useState( false );
  const [ previewItem, setPreviewItem ] = useState<UploadedFile | null>( null );

  const handlePreview = useCallback( ( item: UploadedFile ) => {
    setPreviewItem( item );
  }, [] );

  return (
    <AnimatePresence>
      <div key="videos-content" className='mt-2 flex gap-2'>
        <div className={ cn( 'flex flex-col gap-4', !items ? 'flex-auto' : 'w-full' ) }>
          <Card className='p-0 overflow-hidden h-full min-h-[calc(100vh-16rem)] ring-0 border-dashed border border-burgundy-200 ring-transparent hover:ring-8 hover:ring-burgundy-600/20 shadow-none'>
            <FilesDropzone
              items={ items }
              activeId={ activeId }
              sensors={ sensors }
              accept={ { 'video/*': [ '.mp4', '.mov', '.webm', '.avi' ] } }
              showTitle={ false }
              gridClassName="grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
              title="Upload Videos"
              description={ <>Drag and drop files here<br />Support for Video files</> }
              icon={ <VideoFileIcon className="text-primary w-20! h-20! mt-4" /> }
              onDragStart={ handleDragStart }
              onDragEnd={ handleDragEnd }
              onDrop={ handleDrop }
              onDropError={ handleDropError }
              onRemove={ handleRemove }
              onUploadSuccess={ handleUploadSuccess }
              onUploadError={ handleUploadError }
              onRetry={ handleRetry }
              onPreview={ handlePreview }
              onImportUrlClick={ () => setIsImportDialogOpen( true ) }
            />
          </Card>
        </div>
      </div >

      <ImportUrlDialog
        key="import-dialog"
        open={ isImportDialogOpen }
        onOpenChange={ setIsImportDialogOpen }
        onImport={ addImportedItem }
      />

      <PreviewDialog
        key="preview-dialog"
        item={ previewItem }
        onClose={ () => setPreviewItem( null ) }
      />

    </AnimatePresence >
  );
} );
