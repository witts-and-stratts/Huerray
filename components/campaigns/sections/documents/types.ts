export interface UploadedFile {
  id: string; // Unique ID for reordering
  file?: File;
  url: string;
  status: 'uploading' | 'success' | 'error';
  preview?: string;
  name: string;
  type: string;
}

export interface VideoUploadResponseData {
  filename: string;
  video_url: string;
  file_size: number;
  content_type: string;
  original_name: string;
}
