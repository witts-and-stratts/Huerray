import {
  Card,
  CardFooter
} from "@/components/dashboard-ui/card";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { UserInfoBlock } from "./user-info-block";
import { UserStatusBadge } from "./user-status-badge";
import { Badge } from "@/components/dashboard-ui/badge";
import { BadgeCheck, X, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/dashboard-ui/separator";

interface UserCardProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UserCard( { user, onViewDetails }: UserCardProps ) {
  return (
    <Card className='py-0 gap-1 min-h-[180px]'>
      <div className='flex flex-col gap-4 justify-between h-full'>
        <div className="flex flex-col gap-4 p-4 pb-0 flex-1">
          <UserInfoBlock user={ user } className="w-full" onViewDetails={ onViewDetails } />
          {/* 
          <div className="grid grid-cols-2 gap-4 text-sm mt-1">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Username</span>
              { user.username ? (
                <div
                  className="group flex items-center gap-1.5 font-medium cursor-pointer w-fit hover:text-foreground transition-colors"
                  onClick={ () => {
                    navigator.clipboard.writeText( user.username! );
                    toast.success( "Username copied" );
                  } }
                  title="Click to copy username"
                >
                  <span className="truncate max-w-[120px]">{ user.username }</span>
                  <Copy className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : <span className="text-muted-foreground">-</span> }
            </div>
          </div> */}
        </div>

        <CardFooter className="py-4 pt-3! bg-muted/30 border-t flex justify-between items-center group-hover:bg-muted/50 transition-colors">
          <UserStatusBadge status={ user.user_status || 'active' } />
          <div className="flex gap-2 items-end">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-normal">Joined</span>
            <Separator orientation="vertical" />
            <span className="text-xs font-regular text-muted-foreground">
              { user.created_at ? new Date( user.created_at ).toLocaleDateString( "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              } ) : '-' }
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
