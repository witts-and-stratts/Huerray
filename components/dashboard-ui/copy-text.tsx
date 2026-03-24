"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/dashboard-utils";

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  copyMessage?: string;
  iconSize?: number;
  iconSide?: "left" | "right";
  clamp?: boolean;
  iconClassName?: string;
}

export function CopyText( {
  text,
  copyMessage = "Copied to clipboard",
  iconSize = 16,
  className,
  children,
  iconSide = "right",
  iconClassName,
  clamp = false,
  ...props
}: CopyTextProps ) {
  const [ isCopied, setIsCopied ] = React.useState( false );
  const [ isHovered, setIsHovered ] = React.useState( false );
  const containerRef = React.useRef<HTMLDivElement>( null );

  const handleMouseEnter = React.useCallback( () => {
    setIsHovered( true );
  }, [ iconSize ] );

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

  console.log( "Icon side: ", iconSide );
  const iconClass = iconSide === "right"
    ? "absolute -right-6 top-1/2 -translate-y-1/2"
    : "absolute -left-6 top-1/2 -translate-y-1/2";

  return (
    <div
      ref={ containerRef }
      onClick={ handleCopy }
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ () => setIsHovered( false ) }
      className={ cn(
        "group flex items-center gap-1.5 cursor-pointer max-w-full hover:text-foreground transition-colors overflow-visible relative",
        clamp && "min-w-0",
        className,
      ) }
      { ...props }
    >
      <span className={ cn( clamp && "truncate min-w-0 flex-1" ) }>{ children }</span>
      <AnimatePresence mode="wait">
        { isCopied ? (
          <motion.span
            key="check"
            initial={ { opacity: 0, scale: 0.5 } }
            animate={ { opacity: 1, scale: 1 } }
            exit={ { opacity: 0, scale: 0.5 } }
            transition={ { duration: 0.15 } }
            className={ cn( iconClass, "bg-background/50 rounded-full p-1", iconClassName ) }
          >
            <Check size={ iconSize } className="text-green-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={ { opacity: 0, scale: 0.5 } }
            animate={ { opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 } }
            exit={ { opacity: 0, scale: 0.5 } }
            transition={ { duration: 0.15 } }
            className={ cn( iconClass, "bg-background/50 rounded-full p-1", iconClassName ) }
          >
            <Copy size={ iconSize * 0.8 } className="text-muted-foreground" />
          </motion.span>
        ) }
      </AnimatePresence>
    </div>
  );
}
