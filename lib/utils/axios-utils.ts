import { AxiosProgressEvent } from "axios";

export function getUploadProgressPercentage( progressEvent: AxiosProgressEvent ) {
  if ( !progressEvent.total ) {
    return 0;
  }

  return Math.round(progressEvent.progress! * 100);
}