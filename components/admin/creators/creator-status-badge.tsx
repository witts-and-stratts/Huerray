import { Badge } from '@/components/dashboard-ui/badge';
import { TextCapitalize } from '@/components/text-case';
import { cn } from '@/lib/utils';

export const CreatorStatusBadge = ( { status }: { status: string; } ) => {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700 border-green-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    suspended: 'bg-red-100 text-red-700 border-red-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  // Handle case-insensitivity and defaults
  const normalizedStatus = status.toLowerCase();

  return (
    <Badge variant="outline" className={ cn( 'capitalize shadow-none font-normal text-xs', styles[ normalizedStatus ] || styles.inactive ) }>
      <TextCapitalize>{ status.split( '_' ).join( ' ' ) }</TextCapitalize>
    </Badge>
  );
};
