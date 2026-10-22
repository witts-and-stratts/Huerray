import { Badge } from "@/components/dashboard-ui/badge";
import { cn } from "@/lib/dashboard-utils";
import { useMessage } from "@/lib/hooks/use-filter-label";

const typeColors: Record<string, string> = {
  brand: 'bg-blue-100 text-blue-700 border-blue-200',
  creator: 'bg-pink-100 text-pink-700 border-pink-200',
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
};

interface UserTypeBadgeProps {
  type?: string;
  className?: string;
}

export function UserTypeBadge( { type, className }: UserTypeBadgeProps ) {
  const label = useMessage( type || 'user' );
  const key = ( type || '' ).replace( /_user$/i, '' ).toLowerCase();
  const colorClass = typeColors[ key ] || typeColors.default;

  return (
    <Badge variant="outline" className={ cn( 'capitalize font-normal w-fit', colorClass, className ) }>
      { label }
    </Badge>
  );
}
