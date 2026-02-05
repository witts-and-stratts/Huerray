"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, MoreVertical } from "lucide-react";
import { Button } from "@/components/dashboard-ui/button";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { UserActionMenu } from "./user-action-menu";
import { UserStatusBadge } from "./user-status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModelsUserResponse } from "@/lib/api/generated/models";

interface GetColumnsProps {
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export const getColumns = ( { onViewDetails }: GetColumnsProps ): ColumnDef<ModelsUserResponse>[] => [
  {
    id: "select",
    header: ( { table } ) => (
      <Checkbox
        checked={ table.getIsAllPageRowsSelected() }
        onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
        aria-label="Select all"
      />
    ),
    cell: ( { row } ) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
        aria-label="Select row"
        className={ 'mt-2' }
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username", // Using username or combination of names
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
          className={ 'font-regular pl-4' }
        >
          Name
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const user = row.original;
      const fullName = `${ user.first_name || '' } ${ user.last_name || '' }`.trim() || user.username || 'Unknown';

      return (
        <div className="flex items-center gap-3 pl-4">
          <Avatar className="h-9 w-9">
            {/* TODO: Add avatar to user model if exists, or use a placeholder */ }
            <AvatarImage src={ undefined } alt={ fullName } />
            <AvatarFallback>{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium font-primary text-[16px] text-primary">{ fullName }</span>
            <span className="text-xs text-muted-foreground">{ user.email }</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user_status",
    header: () => <span className={ 'font-regular' }>Status</span>,
    cell: ( { row } ) => <UserStatusBadge status={ row.getValue( "user_status" ) as string } />,
    filterFn: ( row, id, filterValue ) => {
      if ( !filterValue || !Array.isArray( filterValue ) || filterValue.length === 0 ) {
        return true;
      }
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    }
  },
  {
    accessorKey: "created_at",
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          className={ 'font-regular' }
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          Joined
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const dateStr = row.getValue( "created_at" ) as string;
      return (
        <div>
          { dateStr ? new Date( dateStr ).toLocaleDateString( "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          } ) : '-' }
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ( { row } ) => {
      const user = row.original;

      return (
        <div className="flex justify-end">
          <UserActionMenu user={ user } onViewDetails={ onViewDetails } />
        </div>
      );
    },
  },
];
