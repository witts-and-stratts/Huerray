'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { cn } from '@/lib/dashboard-utils';
import { closestCenter, DndContext, DragOverlay, SensorDescriptor, SensorOptions } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { memo } from 'react';
import { EmptyState } from './empty-state';
import { FileCard, SortableFileItem } from './file-cards';
import { UploadedFile } from './types';

interface FilesDropzoneProps {
  items: UploadedFile[];
  activeId: string | null;
  sensors: SensorDescriptor<SensorOptions>[];
  accept: Record<string, string[]>;
  onDragStart: ( event: any ) => void;
  onDragEnd: ( event: any ) => void;
  onDrop: ( files: File[] ) => void;
  onDropError: ( error: any ) => void;
  onRemove: ( id: string ) => void;
  onUploadSuccess: ( id: string, url: string ) => void;
  onUploadError: ( id: string, error: any ) => void;
  onRetry: ( id: string ) => void;
  onPreview: ( item: UploadedFile ) => void;
  onImportUrlClick: () => void;
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

const DropZoneFooter = memo( ( { open, onImportUrlClick }: { open: () => void; onImportUrlClick: () => void; } ) => (
  <div className='flex justify-end p-2' onClick={ ( e ) => e.stopPropagation() }>
    <ButtonGroup>
      <Button className='min-w-30' onClick={ open }>Upload</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon'>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuItem onClick={ ( e ) => { e.stopPropagation(); onImportUrlClick(); } }>Import from URL</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </div>
) );

export const FilesDropzone = memo( ( {
  items,
  activeId,
  sensors,
  accept,
  onDragStart,
  onDragEnd,
  onDrop,
  onDropError,
  onRemove,
  onUploadSuccess,
  onUploadError,
  onRetry,
  onPreview,
  onImportUrlClick,
  title,
  description,
  icon
}: FilesDropzoneProps ) => {
  return (
    <Dropzone
      accept={ accept }
      className='p-0 h-full border-none'
      onDrop={ onDrop }
      onError={ onDropError }
      maxFiles={ 30 }
    >
      { ( { isDragActive, open } ) => (
        <>
          { items.length === 0 &&
            <div className='flex flex-col h-full w-full'>
              <EmptyState title={ title } description={ description } icon={ icon } />
              <DropZoneFooter open={ open } onImportUrlClick={ onImportUrlClick } />
            </div>
          }
          { items.length > 0 && (
            <div className='flex flex-col justify-between h-full relative w-full'>
              {
                isDragActive &&
                <div className={ cn( 'flex flex-col justify-between h-full absolute w-full z-100 bg-background/80' ) }>
                  <EmptyState title={ title } description={ description } icon={ icon } />
                </div>
              }
              <DndContext
                sensors={ sensors }
                collisionDetection={ closestCenter }
                onDragStart={ onDragStart }
                onDragEnd={ onDragEnd }
              >
                <SortableContext items={ items.map( i => i.id ) } strategy={ rectSortingStrategy }>
                  <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 p-2 items-start h-full content-start'>
                    <AnimatePresence>
                      { items.map( ( item ) => (
                        <SortableFileItem
                          key={ item.id }
                          item={ item }
                          onRemove={ onRemove }
                          onUploadSuccess={ onUploadSuccess }
                          onUploadError={ onUploadError }
                          onRetry={ onRetry }
                          onPreview={ onPreview }
                        />
                      ) ) }
                    </AnimatePresence>
                  </div>
                </SortableContext>
                <DragOverlay>
                  { activeId ? (
                    <FileCard
                      isOverlay
                      item={ items.find( i => i.id === activeId )! }
                      onRemove={ onRemove }
                      onUploadSuccess={ onUploadSuccess }
                      onUploadError={ onUploadError }
                      onRetry={ onRetry }
                      onPreview={ onPreview }
                    />
                  ) : null }
                </DragOverlay>
              </DndContext>
              <DropZoneFooter open={ open } onImportUrlClick={ onImportUrlClick } />
            </div>
          ) }
        </>
      ) }
    </Dropzone>
  );
} );
