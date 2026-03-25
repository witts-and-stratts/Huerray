"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { getCountryFlag } from "@/lib/country-flags";
import { cn } from "@/lib/dashboard-utils";
import { imgpresets } from "@/lib/utils/imgproxy";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BrandActionMenu } from "./brand-action-menu";
import { BrandStatusBadge } from "./brand-status-badge";
import { Brand } from "./brands-data";
import { TBadge, THead } from "../data-table";

interface GetColumnsProps {
  onViewDetails: ( brand: Brand ) => void;
  tAdmin?: any;
  tCommon?: any;
}

function BrandInfoBlock( { brand }: { brand: Brand; } ) {
  return (
    <div className="flex items-start gap-4 min-w-[220px]">
      <Avatar className="dt-table__avatar">
        <AvatarImage src={ imgpresets.avatar( brand.logo ) } alt={ brand.name } />
        <AvatarFallback>{ brand.name.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <Link
          href={ `/admin/brands/${ brand.id }` }
          className="dt-table__col-title"
        >
          { brand.name }
        </Link>
      </div>
    </div>
  );
}

const BrandActionsCell = ( {
  row,
  onViewDetails,
  className,
}: {
  row: Row<Brand>;
  onViewDetails: ( brand: Brand ) => void;
  className?: string;
} ) => {
  const t = useTranslations( 'dashboard.common' );
  const brand = row.original;
  return (
    <div className={ cn( "flex justify-end items-center gap-2", className ) }>
      <ButtonGroup className="flex justify-end">
        <Button variant="outline" size="sm" className="font-regular" onClick={ () => onViewDetails( brand ) }>
          { t( 'view' ) }
        </Button>
        <BrandActionMenu
          brand={ brand }
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

export const getColumns = ( { onViewDetails, tAdmin, tCommon }: GetColumnsProps ): ColumnDef<Brand>[] => [
  {
    id: "select",
    size: 24,
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
        className="mt-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: ( row ) => row.name,
    header: ( { column } ) => (
      <THead column={ column } title={ tAdmin ? tAdmin( 'filters.name' ) : 'Brand' } className="pl-4" />
    ),
    cell: ( { row } ) => (
      <div className="pl-4 py-0">
        <BrandInfoBlock brand={ row.original } />
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <THead title={ tAdmin ? tAdmin( 'brandDetails.category' ) : 'Category' } shouldSort={ false } />,
    cell: ( { row } ) => {
      const category = row.getValue( "category" ) as string;
      if ( !category ) return <div>-</div>;
      return <TBadge title={ category } variant="secondary" />;
    },
  },
  {
    accessorKey: "company_size",
    header: ( { column } ) => <THead column={ column } title={ tAdmin ? tAdmin( 'brandDetails.companySize' ) : 'Size' } />,
    cell: ( { row } ) => {
      const size = row.getValue( "company_size" ) as string;
      if ( !size ) return <div>-</div>;
      return <TBadge title={ size } variant="outline" />;
    },
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) return true;
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    accessorKey: "country",
    enableHiding: true,
    enableSorting: false,
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) return true;
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    id: "location",
    accessorFn: ( row ) => [ row.city, row.country ].filter( Boolean ).join( ", " ),
    header: ( { column } ) => (
      <THead column={ column } title="City/Country" />
    ),
    cell: ( { row } ) => {
      const brand = row.original;
      const location = [ brand.city, brand.country ].filter( Boolean ).join( ", " );
      const flagName = getCountryFlag( brand.country );
      if ( !location ) return <div>-</div>;
      return (
        <div className="flex items-center gap-2">
          { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ brand.country } className="h-4 w-auto" /> }
          <span className="truncate max-w-[150px]" title={ location }>{ brand.city || brand.country }, { brand.country }</span>
        </div>
      );
    },
  },
  {
    accessorKey: "brand_status",
    header: () => <THead title="Status" shouldSort={ false } />,
    cell: ( { row } ) => <BrandStatusBadge status={ row.getValue( "brand_status" ) as string } />,
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) return true;
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    id: "actions",
    header: () => (
      <THead title="Actions" shouldSort={ false } className="flex justify-end pr-3 w-full" />
    ),
    enableHiding: false,
    cell: ( { row } ) => <BrandActionsCell row={ row } onViewDetails={ onViewDetails } className="pr-2" />,
  },
];
