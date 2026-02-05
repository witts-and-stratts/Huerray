"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/dashboard-utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";


function DropdownMenu( { ...props }: MenuPrimitive.Root.Props ) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" { ...props } />;
}

function DropdownMenuPortal( { ...props }: MenuPrimitive.Portal.Props ) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" { ...props } />;
}

interface DropdownMenuTriggerProps extends MenuPrimitive.Trigger.Props {
  asChild?: boolean;
}

function DropdownMenuTrigger( { asChild = false, children, ...props }: DropdownMenuTriggerProps ) {
  if ( asChild && React.isValidElement( children ) ) {
    return (
      <MenuPrimitive.Trigger
        data-slot="dropdown-menu-trigger"
        render={ children }
        { ...props }
      />
    );
  }

  return (
    <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" { ...props }>
      { children }
    </MenuPrimitive.Trigger>
  );
}

function DropdownMenuContent( {
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > ) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={ align }
        alignOffset={ alignOffset }
        side={ side }
        sideOffset={ sideOffset }
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={ cn( "dropdown-menu__primitive__popup", className ) }
          { ...props }
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup( { ...props }: MenuPrimitive.Group.Props ) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" { ...props } />;
}

function DropdownMenuLabel( {
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
} ) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={ inset }
      className={ cn( "dropdown-menu__primitive__group-label", className ) }
      { ...props }
    />
  );
}

function DropdownMenuItem( {
  className,
  inset,
  variant = "default",
  asChild = false,
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
  asChild?: boolean;
} ) {
  const Comp = asChild ? Slot : MenuPrimitive.Item;
  return (
    <Comp
      data-slot="dropdown-menu-item"
      data-inset={ inset }
      data-variant={ variant }
      className={ cn(
        "dropdown-menu__item group/dropdown-menu-item",
        className
      ) }
      { ...props }
    />
  );
}

function DropdownMenuSub( { ...props }: MenuPrimitive.SubmenuRoot.Props ) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" { ...props } />;
}

function DropdownMenuSubTrigger( {
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
} ) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={ inset }
      className={ cn(
        "dropdown-menu__submenu__trigger",
        className
      ) }
      { ...props }
    >
      { children }
      <HugeiconsIcon icon={ ArrowRight01Icon } strokeWidth={ 2 } className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent( {
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> ) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={ cn( "dropdown-menu__sub-content", className ) }
      align={ align }
      alignOffset={ alignOffset }
      side={ side }
      sideOffset={ sideOffset }
      { ...props }
    />
  );
}

function DropdownMenuCheckboxItem( {
  className,
  children,
  checked,
  ...props
}: MenuPrimitive.CheckboxItem.Props ) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={ cn(
        "dropdown-menu__checkbox-item",
        className
      ) }
      checked={ checked }
      { ...props }
    >
      <span
        className="dropdown-menu__checkbox-item-indicator"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <HugeiconsIcon icon={ Tick02Icon } strokeWidth={ 2 } />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      { children }
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup( { ...props }: MenuPrimitive.RadioGroup.Props ) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      { ...props }
    />
  );
}

function DropdownMenuRadioItem( {
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props ) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={ cn(
        "dropdown-menu__radio-item",
        className
      ) }
      { ...props }
    >
      <span
        className="dropdown-menu__radio-item-indicator"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <HugeiconsIcon icon={ Tick02Icon } strokeWidth={ 2 } />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      { children }
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator( {
  className,
  ...props
}: MenuPrimitive.Separator.Props ) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={ cn( "dropdown-menu__separator", className ) }
      { ...props }
    />
  );
}

function DropdownMenuShortcut( {
  className,
  ...props
}: React.ComponentProps<"span"> ) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={ cn( "dropdown-menu__shortcut", className ) }
      { ...props }
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
