"use client";

import { Fragment, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { locales } from '@/i18n';
import { usePathname } from 'next/navigation';

const CREATOR_ADMIN_LABELS: Record<string, string> = {
  'creator': 'Creator Dashboard',
  'complete-profile': 'Complete profile',
  gigs: 'Gigs',
  'my-gigs': 'My Gigs',
  invitations: 'Invitations',
  notifications: 'Notifications',
  settings: 'Settings',
};

function toTitleCase( value: string ) {
  return value
    .split( '-' )
    .map( ( part ) => part.charAt( 0 ).toUpperCase() + part.slice( 1 ) )
    .join( ' ' );
}

function buildBreadcrumbs( pathname?: string ) {
  if ( !pathname ) return [];
  const segments = pathname.split( '/' ).filter( Boolean );
  if ( segments.length === 0 ) return [];

  const localeSegment = segments[ 0 ] && locales.includes( segments[ 0 ] as typeof locales[ number ] ) ? segments[ 0 ] : undefined;
  const pathSegments = localeSegment ? segments.slice( 1 ) : segments;
  if ( pathSegments.length === 0 ) return [];

  return pathSegments.map( ( segment, index ) => {
    const label = CREATOR_ADMIN_LABELS[ segment ] || toTitleCase( segment );
    const pathParts = [ ...( localeSegment ? [ localeSegment ] : [] ), ...pathSegments.slice( 0, index + 1 ) ];
    return {
      label,
      href: `/${ pathParts.join( '/' ) }`,
    };
  } );
}

export function CreatorBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useMemo( () => buildBreadcrumbs( pathname ), [ pathname ] );

  if ( breadcrumbs.length === 0 ) return null;

  return (
    <div className="bg-background px-5 pb-4">
      <Breadcrumb className="rounded-md border border-border/60 bg-background/70 px-3 py-2 shadow-sm">
        <BreadcrumbList>
          { breadcrumbs.map( ( crumb, index ) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={ crumb.label }>
                <BreadcrumbItem>
                  { !isLast && crumb.href ? (
                    <BreadcrumbLink href={ crumb.href } className="text-muted-foreground/80">
                      { crumb.label }
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-muted-foreground/50">{ crumb.label }</BreadcrumbPage>
                  ) }
                </BreadcrumbItem>
                { !isLast && <BreadcrumbSeparator className="text-muted-foreground/80" /> }
              </Fragment>
            );
          } ) }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
