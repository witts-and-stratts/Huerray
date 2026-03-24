'use client';

import { Table } from '@tanstack/react-table';

import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import { Button } from '@/components/dashboard-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { getCountryFlag, getCountryName } from '@/lib/country-flags';
import { ChevronDown, Globe } from 'lucide-react';
import { Brand } from './brands-data';
import '@/app/styles/components/data-table.css';


function CountryFilter( { table, countries }: { table: Table<Brand>; countries: string[]; } ) {
  const column = table.getColumn( 'country' );
  const filterValue = column?.getFilterValue() as string[] | undefined;
  const isActive = Array.isArray( filterValue ) && filterValue.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='h-8'>
        <Button variant='outline' size='sm' className={ `h-8${ isActive ? ' border-primary text-primary' : '' }` }>
          <Globe className='size-4' strokeWidth={ 1 } />
          { isActive && <span className='font-regular text-xs'>{ filterValue!.length }</span> }
          <ChevronDown className='size-4' strokeWidth={ 1 } />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-56 max-h-72 overflow-y-auto'>
        <div
          className='focus:bg-accent gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center outline-hidden select-none hover:bg-accent text-xs text-primary'
          onClick={ ( e ) => {
            e.stopPropagation();
            column?.setFilterValue( countries.length > 0 ? [ ...countries ] : undefined );
          } }
        >
          Select All
        </div>
        <DropdownMenuSeparator />
        { countries.map( ( code ) => {
          const name = getCountryName( code ) ?? code;
          const flag = getCountryFlag( code );
          return (
            <DropdownMenuCheckboxItem
              key={ code }
              checked={ Array.isArray( filterValue ) && filterValue.includes( code ) }
              onCheckedChange={ ( value ) => {
                const current = ( column?.getFilterValue() as string[] ) ?? [];
                const next = new Set( current );
                value ? next.add( code ) : next.delete( code );
                column?.setFilterValue( next.size > 0 ? Array.from( next ) : undefined );
              } }
            >
              <span className='flex items-center gap-2'>
                { flag && <img src={ `/images/flags/${ flag }.svg` } alt={ name } className='h-4 w-auto' /> }
                { name }
              </span>
            </DropdownMenuCheckboxItem>
          );
        } ) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


interface BrandsTableToolbarProps {
  table: Table<Brand>;
  statuses: string[];
  countries: string[];
  sizes: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function BrandsTableToolbar( {
  table,
  statuses,
  countries,
  sizes,
  view,
  setView,
}: BrandsTableToolbarProps ) {
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          table={ table }
          columnId='name'
          placeholder='Filter brands...'
        />
      </div>
      <div className='flex items-center gap-2 max-w-full overflow-x-auto'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='brand_status'
          options={ statuses }
          title='Status'
        />
        <CountryFilter table={ table } countries={ countries } />
        <DataTableFilterDropdown
          table={ table }
          columnId='company_size'
          options={ sizes }
          title='Size'
        />
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
