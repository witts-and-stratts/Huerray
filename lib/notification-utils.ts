import type {
  ModelsNotificationResponse,
  UtilsEventType,
} from "@/lib/api/generated/models";

interface NotificationActionLabelRule {
  eventName: string;
  eventType: UtilsEventType;
  labelKey: NotificationActionLabelKey;
}

export type NotificationsRole = "admin" | "brand" | "creator";
export type NotificationActionKind =
  | "invoice-sheet"
  | "gig-sheet"
  | "submission-dialog"
  | "internal-route"
  | "external-url"
  | "none";

export type NotificationActionLabelKey =
  | "viewInvoice"
  | "viewSubmission"
  | "goToGig"
  | "viewCampaign"
  | "reviewBrandProfile"
  | "reviewCreatorProfile"
  | "viewDetails";

// Derived from current notification payload variants.
export const NOTIFICATION_ACTION_LABEL_RULES: NotificationActionLabelRule[] = [
  {
    eventName: "Brand Campaign Decision",
    eventType: "Acceptance",
    labelKey: "viewCampaign",
  },
  {
    eventName: "Creator Profile Submission",
    eventType: "Submission",
    labelKey: "reviewCreatorProfile",
  },
  {
    eventName: "Brand Profile Submission",
    eventType: "Submission",
    labelKey: "reviewBrandProfile",
  },
];

type NotificationActionContext = Pick<
  ModelsNotificationResponse,
  "event_name" | "event_type" | "title" | "message" | "action_url" | "entity_id" | "entity_type" | "metadata"
>;

export interface NotificationActionSpec {
  kind: NotificationActionKind;
  labelKey: NotificationActionLabelKey;
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
  return notification.entity_type === "Invoice"
    || text.includes( "invoice" )
    || notification.action_url?.includes( "/invoices/" ) === true;
}

function isVideoSubmissionNotification(
  notification: NotificationActionContext,
  text: string,
  metadata: NotificationMetadata | null
): boolean {
  if ( text.includes( "profile submission" ) ) return false;
  if ( notification.entity_type === "VideoSubmission" ) return true;

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

function isCampaignNotification( notification: NotificationActionContext ): boolean {
  return notification.entity_type === "Campaign";
}

function isBrandNotification( notification: NotificationActionContext ): boolean {
  return notification.entity_type === "Brand";
}

function isCreatorNotification( notification: NotificationActionContext ): boolean {
  return notification.entity_type === "Creator";
}

function isGigNotification( notification: NotificationActionContext ): boolean {
  return notification.entity_type === "Gig";
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

export function getNotificationActionLabelKey( notification: NotificationActionContext ): NotificationActionLabelKey {
  const text = buildNotificationText( notification );

  if ( isInvoiceNotification( notification, text ) ) {
    return "viewInvoice";
  }

  if ( isVideoSubmissionNotification( notification, text, parseNotificationMetadata( notification.metadata ) ) ) {
    return "viewSubmission";
  }

  if ( isGigInvitationAcceptedNotification( text ) ) {
    return "goToGig";
  }

  if ( isCampaignNotification( notification ) ) {
    return "viewCampaign";
  }

  if ( isBrandNotification( notification ) ) {
    return "reviewBrandProfile";
  }

  if ( isCreatorNotification( notification ) ) {
    return "reviewCreatorProfile";
  }

  if ( isGigNotification( notification ) ) {
    return "goToGig";
  }

  const rule = NOTIFICATION_ACTION_LABEL_RULES.find(
    ( item ) =>
      item.eventName.toLowerCase() === ( notification.event_name || "" ).toLowerCase()
      && item.eventType === notification.event_type
  );

  if ( rule ) {
    return rule.labelKey;
  }

  if ( notification.action_url?.includes( "/admin/campaigns/" ) ) {
    return "viewCampaign";
  }

  if ( notification.action_url?.includes( "/admin/brands/" ) ) {
    return "reviewBrandProfile";
  }

  if ( notification.action_url?.includes( "/admin/creators/" ) ) {
    return "reviewCreatorProfile";
  }

  return "viewDetails";
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
  const labelKey = getNotificationActionLabelKey( notification );

  if ( isInvoiceNotification( notification, text ) && invoiceId ) {
    return {
      kind: "invoice-sheet",
      labelKey,
      invoiceId,
      href,
    };
  }

  if ( isVideoSubmissionNotification( notification, text, metadata ) && submissionId ) {
    return {
      kind: "submission-dialog",
      labelKey,
      submissionId,
      gigId,
      href,
    };
  }

  if ( isCreatorNotification( notification ) && role === "creator" ) {
    return {
      kind: "internal-route",
      labelKey,
      href: locale ? `/${ locale }/creator/profile` : "/creator/profile",
    };
  }

  if ( isGigNotification( notification ) && gigId ) {
    return {
      kind: "gig-sheet",
      labelKey,
      gigId,
      href,
    };
  }

  if ( href ) {
    return {
      kind: isInternalActionUrl( notification.action_url ) ? "internal-route" : "external-url",
      labelKey,
      href,
      gigId,
    };
  }

  return {
    kind: "none",
    labelKey,
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
