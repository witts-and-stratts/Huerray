import { SubHeader } from "@/components/subheader";
import { NotificationsView } from "@/components/notifications/notifications-view";

export default function NotificationsPage() {
  return (
    <>
      <SubHeader
        title="Notifications"
        description="View and manage all your notifications"
      />
      <NotificationsView />
    </>
  );
}
