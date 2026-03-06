'use client';

export { formatDate } from '@/lib/utils/format';

export function getFileName( value: string ) {
  try {
    const normalized = value.split( '?' )[ 0 ];
    const parts = normalized.split( '/' );
    return parts[ parts.length - 1 ] || value;
  } catch {
    return value;
  }
}

export function getDocumentType( value: string ) {
  const lower = value.toLowerCase();
  if ( lower.endsWith( '.pdf' ) ) return 'application/pdf';
  if ( lower.endsWith( '.doc' ) || lower.endsWith( '.docx' ) ) return 'application/msword';
  if ( lower.endsWith( '.xls' ) || lower.endsWith( '.xlsx' ) ) return 'application/vnd.ms-excel';
  if ( lower.endsWith( '.ppt' ) || lower.endsWith( '.pptx' ) ) return 'application/vnd.ms-powerpoint';
  return 'application/octet-stream';
}

export function getCountryDisplay( code?: string ) {
  if ( !code ) return 'N/A';
  const normalized = code.startsWith( 'Country' ) ? code.replace( 'Country', '' ) : code;
  const region = normalized.toUpperCase();

  try {
    const countryName = new Intl.DisplayNames( [ 'en' ], { type: 'region' } ).of( region ) || region;
    if ( region.length === 2 ) {
      const flag = String.fromCodePoint( ...[ ...region ].map( ( char ) => 127397 + char.charCodeAt( 0 ) ) );
      return `${ flag } ${ countryName }`;
    }
    return countryName;
  } catch {
    return region;
  }
}
