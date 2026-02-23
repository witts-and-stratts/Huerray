"use client";

import { BrandActionMenu } from "./brand-action-menu";

import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "./brands-data";
import { Badge } from "@/components/dashboard-ui/badge";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { BrandStatusBadge } from "./brand-status-badge";

export const columns: ColumnDef<Brand>[] = [
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
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Brand",
    cell: ( { row } ) => {
      const brand = row.original;
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={ brand.logo } alt={ brand.name } />
            <AvatarFallback>{ brand.name.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{ brand.name }</span>
            <span className="text-xs text-muted-foreground">{ brand.contact_email }</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "brand_status",
    header: "Status",
    cell: ( { row } ) => {
      const status = row.getValue( "brand_status" ) as string;
      return (
        <BrandStatusBadge status={ status } />
      );
    },
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) {
        return true;
      }
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    accessorKey: "total_campaigns",
    header: "Campaigns",
    cell: ( { row } ) => {
      return <div className="text-center font-medium">{ row.getValue( "total_campaigns" ) }</div>;
    },
  },
  {
    accessorKey: "joined_date",
    header: "Joined",
    cell: ( { row } ) => {
      return <div className="text-muted-foreground">{ row.getValue( "joined_date" ) }</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ( { row } ) => {
      const brand = row.original;

      return (
        <BrandActionMenu brand={ brand } />
      );
    },
  },
];
