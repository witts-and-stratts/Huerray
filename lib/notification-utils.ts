interface NotificationActionLabelRule {
  eventName: string;
  eventType: string;
  label: string;
}

export type NotificationsRole = "admin" | "brand" | "creator";
export type NotificationActionKind =
  | "invoice-sheet"
  | "submission-dialog"
  | "internal-route"
  | "external-url"
  | "none";

// Derived from current notification payload variants.
export const NOTIFICATION_ACTION_LABEL_RULES: NotificationActionLabelRule[] = [
  {
    eventName: "Brand Campaign Decision",
    eventType: "Acceptance",
    label: "View campaign",
  },
  {
    eventName: "Creator Profile Submission",
    eventType: "Submission",
    label: "Review creator profile",
  },
  {
    eventName: "Brand Profile Submission",
    eventType: "Submission",
    label: "Review brand profile",
  },
];

interface NotificationActionContext {
  event_name?: string | null;
  event_type?: string | null;
  title?: string | null;
  message?: string | null;
  action_url?: string | null;
  entity_id?: string | null;
  metadata?: string | null;
}

export interface NotificationActionSpec {
  kind: NotificationActionKind;
  label: string;
  href?: string | null;
  invoiceId?: string | null;
  submissionId?: string | null;
  gigId?: string | null;
}

type NotificationMetadata = Record<string, unknown>;

function normalizeText( value?: string | null ): string {
  return ( value || "" ).trim().toLowerCase();
}

function buildNotificationText( notification: NotificationActionContext ): string {
  return [
    notification.event_name,
    notification.event_type,
    notification.title,
    notification.message,
  ]
    .map( normalizeText )
    .filter( Boolean )
    .join( " " );
}

export function parseNotificationMetadata( metadata?: string | null ): NotificationMetadata | null {
  if ( !metadata ) return null;

  try {
    const parsed = JSON.parse( metadata ) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray( parsed )
      ? parsed as NotificationMetadata
      : null;
  } catch {
    return null;
  }
}

function getMetadataString( metadata: NotificationMetadata | null, keys: string[] ): string | null {
  if ( !metadata ) return null;

  for ( const key of keys ) {
    const value = metadata[ key ];
    if ( typeof value === "string" && value.trim() ) {
      return value;
    }
  }

  return null;
}

function matchPathId( actionUrl: string | null | undefined, pattern: RegExp ): string | null {
  if ( !actionUrl ) return null;
  const match = actionUrl.match( pattern );
  return match?.[ 1 ] ?? null;
}

function isInternalActionUrl( actionUrl: string | null | undefined ): boolean {
  return Boolean( actionUrl?.startsWith( "/" ) );
}

function isInvoiceNotification( notification: NotificationActionContext, text: string ): boolean {
  return text.includes( "invoice" ) || notification.action_url?.includes( "/invoices/" ) === true;
}

function isVideoSubmissionNotification(
  notification: NotificationActionContext,
  text: string,
  metadata: NotificationMetadata | null
): boolean {
  if ( text.includes( "profile submission" ) ) return false;

  if ( text.includes( "video submission" ) ) return true;
  if ( notification.action_url?.includes( "/videos/" ) ) return true;

  return Boolean(
    getMetadataString( metadata, [ "video_submission_id", "videoSubmissionId", "submission_id", "submissionId" ] )
  );
}

function isGigInvitationAcceptedNotification(text: string): boolean {
  return text.includes( "gig invitation accepted" )
    || ( text.includes( "invitation" ) && text.includes( "accepted" ) && text.includes( "gig" ) );
}

function getNotificationIdentifiers( notification: NotificationActionContext ) {
  const metadata = parseNotificationMetadata( notification.metadata );

  return {
    metadata,
    invoiceId:
      getMetadataString( metadata, [ "invoice_id", "invoiceId" ] )
      ?? matchPathId( notification.action_url, /\/invoices\/([^/?#]+)/ )
      ?? ( isInvoiceNotification( notification, buildNotificationText( notification ) ) ? notification.entity_id ?? null : null ),
    submissionId:
      getMetadataString( metadata, [ "video_submission_id", "videoSubmissionId", "submission_id", "submissionId" ] )
      ?? matchPathId( notification.action_url, /\/videos\/([^/?#]+)/ )
      ?? notification.entity_id
      ?? null,
    gigId:
      getMetadataString( metadata, [ "gig_id", "gigId" ] )
      ?? matchPathId( notification.action_url, /\/gigs\/([^/?#]+)/ )
      ?? null,
  };
}

export function getNotificationActionLabel( notification: NotificationActionContext ): string {
  const text = buildNotificationText( notification );

  if ( isInvoiceNotification( notification, text ) ) {
    return "View invoice";
  }

  if ( isVideoSubmissionNotification( notification, text, parseNotificationMetadata( notification.metadata ) ) ) {
    return "View submission";
  }

  if ( isGigInvitationAcceptedNotification( text ) ) {
    return "Go to gig";
  }

  const rule = NOTIFICATION_ACTION_LABEL_RULES.find(
    ( item ) =>
      item.eventName.toLowerCase() === ( notification.event_name || "" ).toLowerCase()
      && item.eventType.toLowerCase() === ( notification.event_type || "" ).toLowerCase()
  );

  if ( rule ) {
    return rule.label;
  }

  if ( notification.action_url?.includes( "/admin/campaigns/" ) ) {
    return "View campaign";
  }

  if ( notification.action_url?.includes( "/admin/brands/" ) ) {
    return "Review brand profile";
  }

  if ( notification.action_url?.includes( "/admin/creators/" ) ) {
    return "Review creator profile";
  }

  return "View details";
}

export function resolveNotificationAction(
  notification: NotificationActionContext,
  role?: NotificationsRole | null,
  locale?: string,
  basePath?: string | null
): NotificationActionSpec {
  const text = buildNotificationText( notification );
  const { metadata, invoiceId, submissionId, gigId } = getNotificationIdentifiers( notification );
  const href = getNotificationActionUrl( notification.action_url, role, locale, basePath );
  const label = getNotificationActionLabel( notification );

  if ( isInvoiceNotification( notification, text ) && invoiceId ) {
    return {
      kind: "invoice-sheet",
      label,
      invoiceId,
      href,
    };
  }

  if ( isVideoSubmissionNotification( notification, text, metadata ) && submissionId ) {
    return {
      kind: "submission-dialog",
      label,
      submissionId,
      gigId,
      href,
    };
  }

  if ( href ) {
    return {
      kind: isInternalActionUrl( notification.action_url ) ? "internal-route" : "external-url",
      label,
      href,
      gigId,
    };
  }

  return {
    kind: "none",
    label,
    gigId,
  };
}

export function getNotificationActionUrl(
  actionUrl: string | null | undefined,
  role?: NotificationsRole | null,
  locale?: string,
  basePath?: string | null
): string | null {
  if ( !actionUrl ) return null;
  if ( /^https?:\/\//i.test( actionUrl ) ) return actionUrl;
  if ( basePath ) {
    const normalizedBasePath = basePath.replace( /\/$/, "" );
    const normalizedActionPath = actionUrl.replace( /^\/api\/v1(?=\/|$)/, "" );

    if ( /^\/(admin|brand|creator)(\/|$)/.test( normalizedActionPath ) ) {
      return normalizedActionPath;
    }

    return `${ normalizedBasePath }${ normalizedActionPath.startsWith( "/" ) ? normalizedActionPath : `/${ normalizedActionPath }` }`;
  }
  const roleBase = role === "admin" ? "/admin" : role === "brand" ? "/brand" : role === "creator" ? "/creator" : "";
  const hasRolePrefix = /^\/(admin|brand|creator)(\/|$)/.test( actionUrl );
  const rolePath = hasRolePrefix
    ? actionUrl.replace( /^\/(admin|brand|creator)/, roleBase )
    : `${ roleBase }${ actionUrl }`;
  return locale ? `/${ locale }${ rolePath }` : rolePath;
}

export function getNotificationsPagePath( role?: NotificationsRole | null ): string {
  if ( role === "admin" ) return "/admin/notifications";
  if ( role === "brand" ) return "/brand/notifications";
  if ( role === "creator" ) return "/creator/notifications";
  return "/notifications";
}
