"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { TextCapitalize } from "@/components/text-case";
import { cn } from "@/lib/dashboard-utils";

interface BrandStatusBadgeProps {
  status: string;
}

const styles: Record<string, string> = {
  approved: 'bg-green-100/50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300',
  active: 'bg-green-100/50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300',
  pending: 'bg-amber-100/50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300',
  rejected: 'bg-red-100/50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300',
  inactive: 'bg-slate-100/50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300',
  suspended: 'bg-red-100/50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300',
};

export function BrandStatusBadge( { status }: BrandStatusBadgeProps ) {
  const normalizedStatus = status.toLowerCase();

  return (
    <Badge variant="outline" className={ cn( 'capitalize shadow-none font-normal', styles[ normalizedStatus ] || styles.inactive ) }>
      <TextCapitalize>{ status.split( '_' ).join( ' ' ) }</TextCapitalize>
    </Badge>
  );
}
