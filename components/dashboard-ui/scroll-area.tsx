"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/dashboard-utils";

function ScrollArea( {
  className,
  children,
  scrollbar,
  ...props
}: ScrollAreaPrimitive.Root.Props & { scrollbar?: ScrollAreaPrimitive.Scrollbar.Props; } ) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={ cn( "relative overflow-hidden", className ) }
      { ...props }
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full rounded-[inherit] outline-none"
      >
        { children }
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar { ...scrollbar } />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar( {
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props ) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={ orientation }
      className={ cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-px",
        orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-px",
        className
      ) }
      { ...props }
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
