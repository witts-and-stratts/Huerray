import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';

export function getCreatorName( creator?: ModelsVideoSubmissionResponse['creator'] ) {
  return `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown Creator';
}

export function getCreatorLocationOrEmail( creator?: ModelsVideoSubmissionResponse['creator'] ) {
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );
  return location || creator?.email || 'Unknown location';
}
