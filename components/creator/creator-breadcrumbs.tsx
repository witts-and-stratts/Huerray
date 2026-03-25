"use client";

import { Fragment, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { locales } from '@/i18n';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

function toTitleCase( value: string ) {
  return value
    .split( '-' )
    .map( ( part ) => part.charAt( 0 ).toUpperCase() + part.slice( 1 ) )
    .join( ' ' );
}

function buildBreadcrumbs( pathname?: string, labels?: Record<string, string> ) {
  if ( !pathname ) return [];
  const segments = pathname.split( '/' ).filter( Boolean );
  if ( segments.length === 0 ) return [];

  const localeSegment = segments[ 0 ] && locales.includes( segments[ 0 ] as typeof locales[ number ] ) ? segments[ 0 ] : undefined;
  const pathSegments = localeSegment ? segments.slice( 1 ) : segments;
  if ( pathSegments.length === 0 ) return [];

  return pathSegments.map( ( segment, index ) => {
    const label = labels?.[ segment ] || toTitleCase( segment );
    const pathParts = [ ...( localeSegment ? [ localeSegment ] : [] ), ...pathSegments.slice( 0, index + 1 ) ];
    return {
      label,
      href: `/${ pathParts.join( '/' ) }`,
    };
  } );
}

export function CreatorBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations( 'dashboard.creator.breadcrumbs' );
  const labels = {
    creator: t( 'creator' ),
    'complete-profile': t( 'completeProfile' ),
    gigs: t( 'gigs' ),
    active: t( 'active' ),
    invitations: t( 'invitations' ),
    notifications: t( 'notifications' ),
    earnings: t( 'earnings' ),
    portfolio: t( 'portfolio' ),
    settings: t( 'settings' ),
  };
  const breadcrumbs = useMemo( () => buildBreadcrumbs( pathname, labels ), [ pathname, t ] );

  // Single-item = root dashboard; settings pages manage their own breadcrumbs via SubHeader
  if ( breadcrumbs.length <= 1 ) return null;
  const isExcluded = pathname?.includes( '/creator/settings' ) || pathname?.includes( '/creator/account' ) || pathname?.includes( '/creator/profile' );
  if ( isExcluded ) return null;

  return (
    <Breadcrumb className="px-5 pt-4 mb-8">
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
  );
}
