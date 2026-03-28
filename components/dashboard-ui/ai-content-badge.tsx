import { Badge } from "@/components/dashboard-ui/badge";
import { cn } from "@/lib/dashboard-utils";
import { Brain } from "lucide-react";

interface AiContentBadgeProps {
  variant?: 'outline' | 'default';
  className?: string;
}

export function AiContentBadge( { variant = 'default', className }: AiContentBadgeProps ) {
  return (
    <Badge variant={ variant } className={ cn( "gap-1.5 border-maroon-400 bg-maroon-50 text-maroon-500 scale-75 origin-left", variant === 'default' ? '' : 'bg-maroon-500/10 text-maroon-200 border-maroon-300', className ) }>
      <Brain className="size-3" />
      AI
    </Badge>
  );
}
