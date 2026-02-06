"use client";

import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, MoreVertical, BadgeCheck, X, Copy } from "lucide-react";
import { Button } from "@/components/dashboard-ui/button";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { Badge } from "@/components/dashboard-ui/badge";
import { UserActionMenu } from "./user-action-menu";
import { UserStatusBadge } from "./user-status-badge";
import { UserInfoBlock } from "./user-info-block";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { CopyText } from "@/components/dashboard-ui/copy-text";

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
    id: "name", // Custom column for complex user info
    accessorFn: ( row ) => `${ row.first_name || '' } ${ row.last_name || '' }`.trim() || row.username || 'Unknown',
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
      return (
        <div className="pl-4 py-0">
          <UserInfoBlock user={ row.original } onViewDetails={ onViewDetails } showActions={ false } showType={ false } />
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          className={ 'font-regular pl-0' }
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          Username
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const username = row.getValue( "username" ) as string;
      if ( !username ) return <div className="text-muted-foreground">-</div>;

      return (
        <Badge
          variant="outline"
          className="font-normal cursor-pointer w-fit hover:text-foreground transition-colors pr-1.5"
        >
          <CopyText
            text={ username }
            copyMessage="Username copied"
            iconSize={ 12 }
            className="gap-2"
          >
            { username }
          </CopyText>
        </Badge>
      );
    },
  },
  {
    accessorKey: "user_type",
    header: () => <span className={ 'font-regular' }>Type</span>,
    cell: ( { row } ) => {
      const type = row.getValue( "user_type" ) as string;
      // Format type: Brand_user -> Brand, Admin_user -> Admin
      const formattedType = type
        ? type.replace( /_user$/i, '' ).replace( /_/g, ' ' )
        : 'User';

      const typeColors: Record<string, string> = {
        'brand': 'bg-blue-100 text-blue-700 border-blue-200',
        'creator': 'bg-pink-100 text-pink-700 border-pink-200',
        'admin': 'bg-purple-100 text-purple-700 border-purple-200',
        'default': 'bg-gray-100 text-gray-700 border-gray-200'
      };

      const colorClass = typeColors[ formattedType.toLowerCase() ] || typeColors.default;

      return (
        <Badge variant="outline" className={ `capitalize font-normal ${ colorClass }` }>
          { formattedType }
        </Badge>
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
