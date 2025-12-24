"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/dashboard-utils";
import { Button } from "@/components/dashboard-ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

function Dialog( { ...props }: DialogPrimitive.Root.Props ) {
  return <DialogPrimitive.Root data-slot="dialog" { ...props } />;
}

interface DialogTriggerProps extends DialogPrimitive.Trigger.Props {
  asChild?: boolean;
}

function DialogTrigger( { asChild = false, children, ...props }: DialogTriggerProps ) {
  if ( asChild && React.isValidElement( children ) ) {
    return (
      <DialogPrimitive.Trigger
        data-slot="dialog-trigger"
        render={ children }
        { ...props }
      />
    );
  }
  return (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" { ...props }>
      { children }
    </DialogPrimitive.Trigger>
  );
}

function DialogPortal( { ...props }: DialogPrimitive.Portal.Props ) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" { ...props } />;
}

interface DialogCloseProps extends DialogPrimitive.Close.Props {
  asChild?: boolean;
}

function DialogClose( { asChild = false, children, ...props }: DialogCloseProps ) {
  if ( asChild && React.isValidElement( children ) ) {
    return (
      <DialogPrimitive.Close
        data-slot="dialog-close"
        render={ children }
        { ...props }
      />
    );
  }
  return <DialogPrimitive.Close data-slot="dialog-close" { ...props }>{ children }</DialogPrimitive.Close>;
}

function DialogOverlay( {
  className,
  ...props
}: DialogPrimitive.Backdrop.Props ) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={ cn( "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50", className ) }
      { ...props }
    />
  );
}

function DialogContent( {
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
} ) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={ cn(
          "bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-6 rounded-xl p-6 text-sm ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          className
        ) }
        { ...props }
      >
        { children }
        { showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={ Cancel01Icon } strokeWidth={ 2 } />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) }
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader( { className, ...props }: React.ComponentProps<"div"> ) {
  return (
    <div
      data-slot="dialog-header"
      className={ cn( "gap-2 flex flex-col", className ) }
      { ...props }
    />
  );
}

function DialogFooter( {
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
} ) {
  return (
    <div
      data-slot="dialog-footer"
      className={ cn(
        "gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ) }
      { ...props }
    >
      { children }
      { showCloseButton && (
        <DialogPrimitive.Close render={ <Button variant="outline" /> }>
          Close
        </DialogPrimitive.Close>
      ) }
    </div>
  );
}

function DialogTitle( { className, ...props }: DialogPrimitive.Title.Props ) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={ cn( "leading-none font-medium", className ) }
      { ...props }
    />
  );
}

function DialogDescription( {
  className,
  ...props
}: DialogPrimitive.Description.Props ) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={ cn( "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3", className ) }
      { ...props }
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
