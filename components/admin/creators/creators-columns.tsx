"use client";

import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { getCountryFlag, getCountryName } from "@/lib/country-flags";
import { cn } from "@/lib/dashboard-utils";
import { ageFromDate } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { TCheckboxCell, TCheckboxHead, THead } from "../data-table";
import { CreatorActionMenu } from "@/components/admin/creators/creator-action-menu";
import { CreatorInfoBlock } from "@/components/admin/creators/creator-info-block";
import { CreatorStatusBadge } from "@/components/admin/creators/creator-status-badge";
import { useTranslations } from "next-intl";

interface GetColumnsProps {
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
}

const CreatorActionsCell = ( { row, onViewDetails, className }: { row: Row<ModelsCreatorResponse>; onViewDetails: ( creator: ModelsCreatorResponse ) => void; className?: string; } ) => {
  const creator = row.original;
  const t = useTranslations( 'dashboard.admin' );
  return (
    <div className={ cn( "flex justify-end items-center gap-2", className ) }>
      <ButtonGroup className="flex justify-end">
        <Button variant="outline" size="sm" className="font-regular" onClick={ () => onViewDetails( creator ) }>
          { t( 'filters.view' ) }
        </Button>
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

export const getColumns = ( { onViewDetails, t }: GetColumnsProps & { t: any; } ): ColumnDef<ModelsCreatorResponse>[] => [
  {
    id: "select",
    header: ( { table } ) => <TCheckboxHead table={ table } />,
    cell: ( { row } ) => <TCheckboxCell row={ row } />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: ( row ) => `${ row.first_name || '' } ${ row.last_name || '' }`.trim() || row.email || 'Unknown',
    header: ( { column } ) => (
      <THead column={ column } title={ t( 'filters.name' ) } className="pl-3" />
    ),
    cell: ( { row } ) => {
      return (
        <div className="pl-4 py-0 min-w-[250px]">
          <CreatorInfoBlock creator={ row.original } hideGender={ true } hideLocation={ true } hideAge={ true } onViewDetails={ onViewDetails } />
        </div>
      );
    },
  },

  {
    accessorKey: "date_of_birth",
    header: ( { column } ) => (
      <THead column={ column } title={ t( 'filters.age' ) } />
    ),
    cell: ( { row } ) => {
      const dob = row.getValue( "date_of_birth" ) as string;
      const age = ageFromDate( dob );
      return (
        <div>
          { age ? `${ age }` : '-' }
        </div>
      );
    },
    filterFn: ( row, columnId, filterValue: [ number?, number?] ) => {
      if ( !filterValue ) return true;
      const [ minAge, maxAge ] = filterValue;
      if ( !minAge && !maxAge ) return true;
      const dob = row.getValue( columnId ) as string;
      const age = ageFromDate( dob );
      if ( age == null ) return true;
      if ( minAge && age < minAge ) return false;
      if ( maxAge && age > maxAge ) return false;
      return true;
    },
  },
  {
    accessorKey: "gender",
    header: ( { column } ) => (
      <THead column={ column } title={ t( 'filters.sex' ) } />
    ),
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
    header: ( { column } ) => (
      <THead column={ column } title={ t( 'filters.location' ) } />
    ),
    cell: ( { row } ) => {
      const creator = row.original;
      const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );
      const flagName = getCountryFlag( creator.country );

      if ( !location ) return <div>-</div>;

      return (
        <div className="flex items-center gap-2">
          { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ creator.country } className="h-4 w-auto" /> }
          <span className="truncate max-w-[150px]" title={ location }>{ creator.city || creator.country }, { getCountryName( creator.country ) }</span>
        </div>
      );
    },
  },
  {
    accessorKey: "creator_status",
    header: ( { column } ) => (
      <THead column={ column } title={ t( 'filters.status' ) } />
    ),
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
      <THead title={ t( 'filters.actions' ) } shouldSort={ false } className="flex justify-end pr-3 w-full" />
    ),
    enableHiding: false,
    cell: ( { row } ) => <CreatorActionsCell row={ row } onViewDetails={ onViewDetails } className="pr-2" />,
  },
];
