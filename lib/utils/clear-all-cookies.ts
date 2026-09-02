import Cookies from 'js-cookie';

/**
 * Removes every cookie this script can see, at "/" and at the current
 * locale-prefixed path (e.g. "/en").
 *
 * A cookie's removal only takes effect when the Path attribute matches
 * exactly what it was set with. Some cookies in this app (see
 * components/auth/signup-form.tsx) are set without an explicit `path`, so
 * the browser defaults it to the directory of whatever route the user was
 * on at the time (e.g. signing up from "/en/signup" sets the cookie's Path
 * to "/en") — silently different from the "/" a naive removal call
 * assumes, which then becomes a no-op against that cookie and leaves it
 * lingering in the browser indefinitely. Sweeping both paths for every
 * cookie name (rather than a hardcoded list at "/" only) closes that gap.
 *
 * This can only reach cookies JavaScript can read in the first place — an
 * httpOnly session cookie set by the backend is invisible to this script
 * no matter what; only a matching Set-Cookie response from the backend
 * itself (same Domain/Path/Secure/SameSite as when it was set) can clear
 * that one. If a role-switch clash on login persists after this runs, the
 * backend's logout/login Set-Cookie attributes are the place to look.
 */
export function clearAllCookies() {
  if ( typeof document === 'undefined' ) return;

  const names = new Set(
    document.cookie
      .split( ';' )
      .map( ( pair ) => decodeURIComponent( pair.split( '=' )[ 0 ]?.trim() ?? '' ) )
      .filter( Boolean )
  );

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const localeSegment = pathname.split( '/' )[ 1 ];
  const paths = new Set( [ '/', localeSegment ? `/${ localeSegment }` : undefined ].filter( Boolean ) as string[] );

  for ( const name of names ) {
    for ( const path of paths ) {
      Cookies.remove( name, { path } );
    }
  }
}
