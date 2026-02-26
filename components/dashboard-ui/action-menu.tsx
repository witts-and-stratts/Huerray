"use client";

import { Button } from "@/components/dashboard-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard-ui/dropdown-menu";
import { useAuth } from "@/lib/auth/auth-context";
import { cn } from "@/lib/utils";
import { Copy, MoreVertical, LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";

export type AllowedRoles = "admin" | "brand" | "creator";

export interface MenuAction<T> {
  label: ReactNode;
  icon?: LucideIcon;
  action?: ( data: T ) => void | Promise<void>;
  condition?: ( data: T ) => boolean; // If false, item is hidden
  disabled?: boolean | (( data: T ) => boolean); // If true, item is shown but not clickable
  allowedRoles?: AllowedRoles[]; // If user role not in list, item is hidden
  variant?: "default" | "destructive";
  separator?: boolean; // Add separator before this item
  className?: string; // Custom class for the item
}

interface ActionMenuProps<T> {
  actions: MenuAction<T>[];
  data: T;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
  label?: string; // Optional label for the menu group
  className?: string; // Class for the trigger button
}

export function ActionMenu<T>( {
  actions,
  data,
  trigger,
  align = "end",
  label = "Actions",
  className,
}: ActionMenuProps<T> ) {
  const { user } = useAuth();
  const [ isOpen, setIsOpen ] = React.useState( false );

  const filteredActions = actions.filter( ( action ) => {
    // Check condition
    if ( action.condition && !action.condition( data ) ) {
      return false;
    }

    // Check roles
    if ( action.allowedRoles && action.allowedRoles.length > 0 ) {
      if ( !user || !action.allowedRoles.includes( user.role ) ) {
        return false;
      }
    }

    return true;
  } );

  if ( filteredActions.length === 0 ) {
    return null;
  }

  const handleAction = async ( action: MenuAction<T> ) => {
    if ( action.action ) {
      await action.action( data );
      setIsOpen( false );
    }
  };

  return (
    <DropdownMenu open={ isOpen } onOpenChange={ setIsOpen }>
      <DropdownMenuTrigger asChild>
        { trigger ? (
          trigger
        ) : (
          <Button variant="ghost" className={ cn( "h-8 w-8 p-0", className ) }>
            <span className="sr-only">Open menu</span>
            <MoreVertical className="size-4" />
          </Button>
        ) }
      </DropdownMenuTrigger>
      <DropdownMenuContent align={ align } className="w-auto min-w-56">
        <DropdownMenuGroup>
          { label && <DropdownMenuLabel>{ label }</DropdownMenuLabel> }
          { filteredActions.map( ( action, index ) => (
            <React.Fragment key={ index }>
              { action.separator && <DropdownMenuSeparator /> }
              <DropdownMenuItem
                onClick={ ( e ) => {
                  e.stopPropagation();
                  handleAction( action );
                } }
                disabled={ typeof action.disabled === "function" ? action.disabled( data ) : action.disabled }
                className={ cn(
                  action.variant === "destructive" ? "text-red-600 focus:text-red-600" : "",
                  action.className
                ) }
              >
                <span>{ action.label }</span>
                { action.icon && (
                  <action.icon className="ml-auto size-4" strokeWidth={ 1 } />
                ) }
              </DropdownMenuItem>
            </React.Fragment>
          ) ) }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
