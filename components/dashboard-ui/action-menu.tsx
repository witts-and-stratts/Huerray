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
import Link from "next/link";

export type AllowedRoles = "admin" | "brand" | "creator";

export interface MenuAction<T> {
  label: ReactNode;
  icon?: LucideIcon;
  action?: ( data: T ) => void | Promise<void>;
  href?: string | ( ( data: T ) => string ); // Optional href for native links
  external?: boolean; // If true, opens link in new tab
  condition?: ( data: T ) => boolean; // If false, item is hidden
  disabled?: boolean | ( ( data: T ) => boolean ); // If true, item is shown but not clickable
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
    } else if ( action.href ) {
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
          { filteredActions.map( ( action, index ) => {
            const actionHref = typeof action.href === 'function' ? action.href( data ) : action.href;

            const content = (
              <>
                <span>{ action.label }</span>
                { action.icon && (
                  <action.icon className="ml-auto size-4" strokeWidth={ 1 } />
                ) }
              </>
            );

            return (
              <React.Fragment key={ index }>
                { action.separator && <DropdownMenuSeparator /> }
                <DropdownMenuItem
                  asChild={ !!actionHref }
                  onClick={ ( e ) => {
                    if ( !actionHref ) {
                      e.stopPropagation();
                      handleAction( action );
                    } else {
                      setIsOpen( false );
                    }
                  } }
                  disabled={ typeof action.disabled === "function" ? action.disabled( data ) : action.disabled }
                  className={ cn(
                    'block w-full cursor-pointer',
                    action.variant === "destructive" ? "text-red-600 focus:text-red-600" : "",
                    action.className
                  ) }
                >
                  { actionHref ? (
                    <Link
                      href={ actionHref }
                      target={ action.external ? "_blank" : undefined }
                      rel={ action.external ? "noopener noreferrer" : undefined }
                      className="flex items-center w-full min-h-full"
                    >
                      { content }
                    </Link>
                  ) : (
                    content
                  ) }
                </DropdownMenuItem>
              </React.Fragment>
            );
          } ) }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
