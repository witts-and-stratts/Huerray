interface NotificationActionLabelRule {
  eventName: string;
  eventType: string;
  label: string;
}

export type NotificationsRole = "admin" | "brand" | "creator";

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
  action_url?: string | null;
}

export function getNotificationActionLabel( notification: NotificationActionContext ): string {
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

export function getNotificationsPagePath( role?: NotificationsRole | null ): string {
  if ( role === "admin" ) return "/admin/notifications";
  if ( role === "brand" ) return "/brand/notifications";
  if ( role === "creator" ) return "/creator/notifications";
  return "/notifications";
}
