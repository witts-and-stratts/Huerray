/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadedFile } from '../types';

export interface FileItemProps {
  item: UploadedFile;
  onRemove: ( id: string ) => void;
  onUploadSuccess: ( id: string, url: string ) => void;
  onUploadError: ( id: string, error: any, name?: string ) => void;
  onRetry: ( id: string ) => void;
  onPreview: ( item: UploadedFile ) => void;
  showTitle?: boolean;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onSelect?: ( id: string, shiftKey: boolean ) => void;
}

export interface FileCardProps extends FileItemProps {
  isOverlay?: boolean;
  hideFileName?: boolean;
  showTitle?: boolean;
  aspect?: string;
  style?: React.CSSProperties;
  attributes?: any;
  listeners?: any;
  setNodeRef?: ( node: HTMLElement | null ) => void;
  isDragging?: boolean;
}
