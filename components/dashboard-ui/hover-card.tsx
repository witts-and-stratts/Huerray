"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/dashboard-utils";

function HoverCard( { ...props }: PopoverPrimitive.Root.Props ) {
  return <PopoverPrimitive.Root data-slot="hover-card" { ...props } />;
}

interface HoverCardTriggerProps extends Omit<PopoverPrimitive.Trigger.Props, 'openOnHover'> {
  delay?: number;
  closeDelay?: number;
}

function HoverCardTrigger( {
  delay = 200,
  closeDelay = 150,
  ...props
}: HoverCardTriggerProps ) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="hover-card-trigger"
      openOnHover
      delay={ delay }
      closeDelay={ closeDelay }
      nativeButton={ false }
      { ...props }
    />
  );
}

function HoverCardContent( {
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > ) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={ align }
        alignOffset={ alignOffset }
        side={ side }
        sideOffset={ sideOffset }
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="hover-card-content"
          className={ cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-3 rounded-lg p-4 text-sm shadow-lg ring-1 duration-150 z-50 w-72 origin-(--transform-origin) outline-hidden",
            className
          ) }
          { ...props }
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
