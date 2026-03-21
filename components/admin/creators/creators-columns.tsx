"use client";

import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { cn } from "@/lib/dashboard-utils";
import { getCountryFlag } from "@/lib/country-flags";
import { useBasePath } from "@/lib/providers/path-provider";
import { calculateAge } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import Link from "next/link";
import { CreatorActionMenu } from "./creator-action-menu";
import { CreatorInfoBlock } from "./creator-info-block";
import { CreatorStatusBadge } from "./creator-status-badge";

interface GetColumnsProps {
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
}

const CreatorActionsCell = ( { row, onViewDetails, className }: { row: Row<ModelsCreatorResponse>; onViewDetails: ( creator: ModelsCreatorResponse ) => void; className?: string; } ) => {
  const basePath = useBasePath();
  const creator = row.original;
  return (
    <div className={ cn( "flex justify-end items-center gap-2", className ) }>
      <ButtonGroup className="flex justify-end">
        <Button variant="outline" size="sm" className="font-regular" render={
          <Link href={ `${ basePath }/creators/${ creator.id }` }>
            View
          </Link>
        } />
        <CreatorActionMenu
          creator={ creator }
          creatorId={ creator.id }
          onViewDetails={ onViewDetails }
          trigger={
            <Button variant="outline" size="sm" className="font-regular">
              <ChevronDown />
            </Button>
          }
        />
      </ButtonGroup>
    </div>
  );
};

export const getColumns = ( { onViewDetails }: GetColumnsProps ): ColumnDef<ModelsCreatorResponse>[] => [
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
    id: "name",
    accessorFn: ( row ) => `${ row.first_name || '' } ${ row.last_name || '' }`.trim() || row.email || 'Unknown',
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
          <CreatorInfoBlock creator={ row.original } hideGender={ true } hideLocation={ true } hideAge={ true } onViewDetails={ onViewDetails } showActions={ false } />
        </div>
      );
    },
  },

  {
    accessorKey: "date_of_birth",
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          className={ 'font-regular pl-0' }
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          Age
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const dob = row.getValue( "date_of_birth" ) as string;
      const age = calculateAge( dob );
      return (
        <div>
          { age ? `${ age }` : '-' }
        </div>
      );
    },
    filterFn: ( row, columnId, filterValue: [ number?, number? ] ) => {
      if ( !filterValue ) return true;
      const [ minAge, maxAge ] = filterValue;
      if ( !minAge && !maxAge ) return true;
      const dob = row.getValue( columnId ) as string;
      const age = calculateAge( dob );
      if ( age == null ) return true;
      if ( minAge && age < minAge ) return false;
      if ( maxAge && age > maxAge ) return false;
      return true;
    },
  },
  {
    accessorKey: "gender",
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          className={ 'font-regular pl-0' }
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          Sex
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const gender = row.getValue( "gender" ) as string;
      return (
        <div className="capitalize">
          { gender || '-' }
        </div>
      );
    },
    filterFn: ( row, id, filterValue ) => {
      if ( !Array.isArray( filterValue ) || filterValue.length === 0 ) return false;
      const val = row.getValue( id ) as string;
      return filterValue.includes( val );
    },
  },
  {
    id: "country",
    accessorKey: "country",
    enableHiding: false,
    header: () => null,
    cell: () => null,
    filterFn: ( row, id, filterValue ) => {
      if ( !Array.isArray( filterValue ) || filterValue.length === 0 ) return false;
      const val = row.getValue( id ) as string;
      return filterValue.includes( val );
    },
  },
  {
    id: "location",
    accessorFn: ( row ) => [ row.city, row.country ].filter( Boolean ).join( ', ' ),
    header: ( { column } ) => {
      return (
        <Button
          variant="ghost"
          className={ 'font-regular pl-0' }
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          City/Country
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const creator = row.original;
      const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );
      const flagName = getCountryFlag( creator.country );

      if ( !location ) return <div>-</div>;

      return (
        <div className="flex items-center gap-2">
          { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ creator.country } className="h-4 w-auto" /> }
          <span className="truncate max-w-[150px]" title={ location }>{ creator.city || creator.country }</span>
        </div>
      );
    },
  },
  {
    accessorKey: "creator_status",
    header: () => <span className={ 'font-regular' }>Status</span>,
    cell: ( { row } ) => <CreatorStatusBadge status={ row.getValue( "creator_status" ) as string } />,
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) {
        return true;
      }
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    }
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">
        <span className="font-regular text-right">Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ( { row } ) => <CreatorActionsCell row={ row } onViewDetails={ onViewDetails } className="pr-2" />,
  },
];
