import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dashboard-ui/dropdown-menu";
import { Button, buttonVariants } from "../dashboard-ui/button";
import { Bell } from "lucide-react";
import { Badge } from "../dashboard-ui/badge";
import { cn } from "@/lib/dashboard-utils";

export function Notifications() {
  return (
    < DropdownMenu >
      <DropdownMenuTrigger className={ cn( buttonVariants( { variant: "ghost", size: "icon" } ), "relative" ) }>
        <Bell className="h-5 w-5" />
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
        >
          3
        </Badge>
        <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-y-auto">
            <div className="px-2 py-3">
              <p className="text-sm">New campaign response from Creator</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <DropdownMenuSeparator />
            <div className="px-2 py-3">
              <p className="text-sm">Campaign "Summer 2024" completed</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
            <DropdownMenuSeparator />
            <div className="px-2 py-3">
              <p className="text-sm">3 new creator applications</p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-center text-sm">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}