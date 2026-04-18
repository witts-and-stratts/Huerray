import { cn } from "@/lib/dashboard-utils";

import "@/app/styles/components/data-table.css";

export function TableviewWrapper( { children, className }: { children: React.ReactNode; className?: string; } ) {
  return (
    <div className={ cn( "dt-view-wrapper", className ) }>
      { children }
    </div>
  );
}
