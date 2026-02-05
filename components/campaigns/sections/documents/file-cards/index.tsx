import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import { FileCardDocument } from './file-card-document';
import { FileCardImage } from './file-card-image';
import { FileCardProps, FileItemProps } from './file-card-types';
import { FileCardVideo } from './file-card-video';

export const FileCard = memo( ( props: FileCardProps ) => {
  const { item } = props;

  if ( item.type.startsWith( 'image/' ) ) {
    return <FileCardImage { ...props } />;
  }

  if ( item.type.startsWith( 'video/' ) ) {
    return <FileCardVideo { ...props } />;
  }

  return <FileCardDocument { ...props } />;
} );

export const SortableFileItem = memo( ( props: FileItemProps ) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable( { id: props.item.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  return (
    <FileCard
      { ...props }
      setNodeRef={ setNodeRef }
      style={ style }
      attributes={ attributes }
      listeners={ listeners }
      isDragging={ isDragging }
    />
  );
} );
