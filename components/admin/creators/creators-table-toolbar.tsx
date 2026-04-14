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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { getCountryFlag, getCountryName } from '@/lib/country-flags';
import { FilterHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Brain, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import * as React from 'react';
import '@/app/styles/components/data-table.css';
import { useTranslations } from 'next-intl';
import { useFilterLabel } from '@/lib/hooks/use-filter-label';

interface AgeRangeFilterProps<TData> {
  table: Table<TData>;
}

function CountryFilter<TData>( { table, countries }: { table: Table<TData>; countries: string[]; } ) {
  const t = useTranslations( 'dashboard.admin' );
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
          { t( 'filters.selectAll' ) }
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

function AgeRangeFilter<TData>( { table }: AgeRangeFilterProps<TData> ) {
  const t = useTranslations( 'dashboard.admin' );
  const column = table.getColumn( 'date_of_birth' );
  const filterValue = column?.getFilterValue() as [ number?, number?] | undefined;

  const [ min, setMin ] = React.useState( filterValue?.[ 0 ]?.toString() ?? '' );
  const [ max, setMax ] = React.useState( filterValue?.[ 1 ]?.toString() ?? '' );

  const isActive = !!filterValue?.[ 0 ] || !!filterValue?.[ 1 ];

  const apply = () => {
    const minAge = min ? parseInt( min ) : undefined;
    const maxAge = max ? parseInt( max ) : undefined;
    column?.setFilterValue( minAge || maxAge ? [ minAge, maxAge ] : undefined );
  };

  const clear = () => {
    setMin( '' );
    setMax( '' );
    column?.setFilterValue( undefined );
  };

  return (
    <Popover>
      <PopoverTrigger className='h-8' render={
        <Button variant='outline' size='sm' className={ `h-8${ isActive ? ' border-primary text-primary' : '' }` }>
          <HugeiconsIcon icon={ FilterHorizontalIcon } className='text-sm' />
          <span className='font-regular'>{ t( 'filters.age' ) }</span>
          <ChevronDown className='size-4' strokeWidth={ 1 } />
        </Button>
      } />
      <PopoverContent align='end' className='w-56 p-3 gap-3'>
        <div className='flex items-end gap-2'>
          <SuperField
            type='number'
            label={ t( 'filters.min' ) }
            placeholder='18'
            min={ 0 }
            max={ 100 }
            value={ min }
            onChange={ e => setMin( e.target.value ) }
          />
          <div className='relative z-10 -mx-4 mb-[3px] flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background'>
            <ChevronRight className='size-4 text-muted-foreground' />
          </div>
          <SuperField
            type='number'
            label={ t( 'filters.max' ) }
            placeholder='65'
            min={ 0 }
            max={ 100 }
            value={ max }
            onChange={ e => setMax( e.target.value ) }
            fieldClassName='pl-3'
          />
        </div>
        <div className='flex gap-2'>
          <Button size='sm' className='flex-1 h-7 text-xs' onClick={ apply }>{ t( 'filters.apply' ) }</Button>
          { isActive && (
            <Button size='sm' variant='ghost' className='h-7 text-xs' onClick={ clear }>{ t( 'filters.clear' ) }</Button>
          ) }
        </div>
      </PopoverContent>
    </Popover>
  );
}

const CONTENT_TYPE_OPTIONS = ['human-generated', 'ai-generated'];

function ContentTypeFilter<TData>( { table }: { table: Table<TData>; } ) {
  const column = table.getColumn( 'content_type' );
  const filterValue = column?.getFilterValue() as string[] | undefined;
  const isActive = Array.isArray( filterValue ) && filterValue.length > 0;
  const getFilterLabel = useFilterLabel();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='h-8'>
        <Button variant='outline' size='sm' className={ `h-8${ isActive ? ' border-primary text-primary' : '' }` }>
          <Brain className='size-4' strokeWidth={ 1 } />
          { isActive && <span className='font-regular text-xs'>{ filterValue!.length }</span> }
          <ChevronDown className='size-4' strokeWidth={ 1 } />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-48'>
        { CONTENT_TYPE_OPTIONS.map( ( option ) => (
          <DropdownMenuCheckboxItem
            key={ option }
            checked={ Array.isArray( filterValue ) && filterValue.includes( option ) }
            onCheckedChange={ ( value ) => {
              const current = ( column?.getFilterValue() as string[] ) ?? [];
              const next = new Set( current );
              value ? next.add( option ) : next.delete( option );
              column?.setFilterValue( next.size > 0 ? Array.from( next ) : undefined );
            } }
          >
            { getFilterLabel( option ) }
          </DropdownMenuCheckboxItem>
        ) ) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface CreatorsTableToolbarProps<TData> {
  table: Table<TData>;
  statuses: string[];
  countries: string[];
  genders: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
  showContentTypeFilter?: boolean;
}

export function CreatorsTableToolbar<TData>( {
  table,
  statuses,
  countries,
  genders,
  view,
  setView,
  showContentTypeFilter = true,
}: CreatorsTableToolbarProps<TData> ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          table={ table }
          columnId='name'
          placeholder={ t( 'filters.searchCreators' ) }
        />
      </div>
      <div className='flex items-center gap-2 max-w-full overflow-x-auto'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='creator_status'
          options={ statuses }
          title={ t( 'filters.status' ) }
          labelFn={ getFilterLabel }
        />
        <CountryFilter table={ table } countries={ countries } />
        <DataTableFilterDropdown
          table={ table }
          columnId='gender'
          options={ genders }
          title={ t( 'filters.sex' ) }
          labelFn={ getFilterLabel }
        />
        { showContentTypeFilter && <ContentTypeFilter table={ table } /> }
        <AgeRangeFilter table={ table } />
        <DataTableViewOptions
          table={ table }
          labels={ {
            creator_status: t( 'filters.status' ),
            created_at: t( 'filters.joined' )
          } }
        />
      </div>
    </div>
  );
}
