import { MegaphoneOff } from "lucide-react";

export function NotificationsEmptyState() {
  return (
    <div className="text-center py-12 text-muted-foreground/60 h-full items-center content-center">
      <MegaphoneOff className="mx-auto h-12 w-12 opacity-20 mb-4" strokeWidth={ 1 } />
      <p className="font-regular text-muted-foreground/60">No notifications yet</p>
    </div>
  );
}
