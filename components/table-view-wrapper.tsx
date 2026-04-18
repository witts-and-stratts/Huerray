import { cn } from "@/lib/dashboard-utils";

export function TableviewWrapper( { children, className }: { children: React.ReactNode; className?: string; } ) {
  return (
    <div className={ cn( `flex-1 min-h-0 bg-slate-50/50 p-2 md:p-4`, className ) }>
      { children }
    </div>
  );
}