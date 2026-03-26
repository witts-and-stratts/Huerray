import { Card } from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { closestCenter } from '@dnd-kit/core';
import { AnimatePresence } from 'motion/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { CampaignFormApi } from '../schema';
import { FilesDropzone } from './documents/files-dropzone';
import { ImportUrlDialog } from './documents/import-url-dialog';
import { PreviewDialog } from './documents/preview-dialog';
import { UploadedFile } from './documents/types';
import { useCampaignFiles } from './documents/use-campaign-files';

export const CampaignDocumentsSection = memo( function CampaignDocumentsSection( {
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
    if ( form.state.values.documents && form.state.values.documents.length > 0 && items.length === 0 ) {
      console.debug( '[CampaignDocumentsSection] Restoring documents from form state:', form.state.values.documents );
      setItemsFromUrls( form.state.values.documents );
    }
  }, [ form.state.values.documents, setItemsFromUrls ] );

  // Sync from local state to form state (on changes)
  useEffect( () => {
    const urls = items.filter( i => i.status === 'success' ).map( i => i.url );
    if ( JSON.stringify( urls ) !== JSON.stringify( form.state.values.documents ) ) {
      form.setFieldValue( 'documents', urls );
    }
  }, [ items, form ] );

  const [ isImportDialogOpen, setIsImportDialogOpen ] = useState( false );
  const [ previewItem, setPreviewItem ] = useState<UploadedFile | null>( null );

  const handlePreview = useCallback( ( item: UploadedFile ) => {
    setPreviewItem( item );
  }, [] );

  return (
    <AnimatePresence>
      <div key="documents-content" className='flex gap-2'>
        <div className={ cn( 'flex flex-col gap-4', !items ? 'flex-auto' : 'w-full' ) }>
          <Card className='p-0 overflow-hidden h-full min-h-[calc(100vh-16rem)] ring-0 border-dashed border border-burgundy-200 ring-transparent hover:ring-8 hover:ring-burgundy-600/20 shadow-none'>
            <FilesDropzone
              items={ items }
              activeId={ activeId }
              sensors={ sensors }
              accept={ { 'application/pdf': [ '.pdf' ] } }
              showTitle={ false }
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
