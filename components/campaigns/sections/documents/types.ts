export interface UploadedFile {
  id: string; // Unique ID for reordering
  file?: File;
  url: string;
  status: 'uploading' | 'success' | 'error';
  preview?: string; // Local blob/data URL (pre-upload only)
  thumbnail?: string; // API-provided thumbnail URL
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
