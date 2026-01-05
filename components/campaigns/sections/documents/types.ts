export interface UploadedFile {
  id: string; // Unique ID for reordering
  file?: File;
  url: string;
  status: 'uploading' | 'success' | 'error';
  preview?: string;
  name: string;
  type: string;
}
