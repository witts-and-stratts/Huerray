"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/dashboard-utils";

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  copyMessage?: string;
  iconSize?: number;
}

export function CopyText( {
  text,
  copyMessage = "Copied to clipboard",
  iconSize = 16,
  className,
  children,
  ...props
}: CopyTextProps ) {
  const [ isCopied, setIsCopied ] = React.useState( false );

  const handleCopy = React.useCallback(
    ( e: React.MouseEvent ) => {
      e.stopPropagation();
      navigator.clipboard.writeText( text );
      setIsCopied( true );
      toast.success( copyMessage );

      setTimeout( () => {
        setIsCopied( false );
      }, 2000 );
    },
    [ text, copyMessage ]
  );

  return (
    <div
      onClick={ handleCopy }
      className={ cn(
        "group flex items-center gap-1.5 cursor-pointer max-w-fit hover:text-foreground transition-colors",
        className
      ) }
      { ...props }
    >
      { children }
      <div className="relative flex items-center justify-center">
        <Copy
          size={ iconSize }
          className={ cn(
            "text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 absolute",
            isCopied && "opacity-0 scale-50"
          ) }
        />
        <Check
          size={ iconSize }
          className={ cn(
            "text-green-500 transition-all duration-300 scale-50 opacity-0",
            isCopied && "scale-100 opacity-100"
          ) }
        />
      </div>
    </div>
  );
}
