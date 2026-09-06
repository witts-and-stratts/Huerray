export type DownloadOutcome = 'downloaded' | 'opened-in-tab';

/**
 * Force a browser download of a remote file.
 *
 * `<a download>` is ignored for cross-origin URLs, so we fetch the file as a
 * blob first and save that. If the fetch fails (CORS, network), we fall back to
 * opening the URL in a new tab so the user can still save it manually and
 * report that via the return value.
 */
export async function downloadFile( url: string, filename?: string ): Promise<DownloadOutcome> {
  const name = filename?.trim() || inferFilename( url );

  try {
    const response = await fetch( url, { credentials: 'include' } );
    if ( !response.ok ) throw new Error( `Download failed with status ${ response.status }` );

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL( blob );

    const anchor = document.createElement( 'a' );
    anchor.href = objectUrl;
    anchor.download = name;
    document.body.appendChild( anchor );
    anchor.click();
    anchor.remove();

    // Give the browser a tick to start the download before revoking.
    setTimeout( () => URL.revokeObjectURL( objectUrl ), 1000 );
    return 'downloaded';
  } catch {
    window.open( url, '_blank', 'noopener,noreferrer' );
    return 'opened-in-tab';
  }
}

function inferFilename( url: string ): string {
  try {
    const { pathname } = new URL( url );
    const last = pathname.split( '/' ).filter( Boolean ).pop();
    if ( last ) return decodeURIComponent( last );
  } catch {
    // ignore — fall through to default
  }
  return 'download';
}
