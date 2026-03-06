import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = ( dateString: string ) => {
  if ( !dateString ) return 'N/A';
  const date = new Date( dateString );
  if ( isNaN( date.getTime() ) ) return 'Invalid Date';
  return new Intl.DateTimeFormat( 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } ).format( date );
};

export const formatCurrency = ( amount: number ) => {
  return new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
  } ).format( amount );
};

export const calculateAge = (dobString?: string) => {
  if (!dobString) return null;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

/**
 * Strip HTML tags from a string.
 *
 * @param html     The HTML string to process.
 * @param tags     Optional list of tag names to strip (e.g. ['b', 'i']).
 *                 When omitted, ALL tags are stripped.
 *
 * @example
 * stripTags('<p>Hello <b>world</b></p>')        // → 'Hello world'
 * stripTags('<p>Hello <b>world</b></p>', ['b'])  // → '<p>Hello world</p>'
 */
export function stripTags( html: string | null | undefined, tags?: string[] ): string {
  if ( !html ) return '';

  if ( !tags || tags.length === 0 ) {
    return html.replace( /<[^>]*>/g, '' );
  }

  const pattern = tags
    .map( tag => tag.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ) )
    .join( '|' );
  return html.replace( new RegExp( `</?(${ pattern })(?:\\s[^>]*)?>`, 'gi' ), '' );
}

export const timeAgo = ( dateStr: string ) => {
  try {
    const date = new Date( dateStr );
    const now = new Date();
    const diffInSeconds = Math.max( 0, Math.floor( ( now.getTime() - date.getTime() ) / 1000 ) );

    if ( diffInSeconds < 60 ) return "Just now";
    if ( diffInSeconds < 3600 ) return `${ Math.floor( diffInSeconds / 60 ) }m ago`;
    if ( diffInSeconds < 86400 ) return `${ Math.floor( diffInSeconds / 3600 ) }h ago`;
    return `${ Math.floor( diffInSeconds / 86400 ) }d ago`;
  } catch {
    return "";
  }
};
