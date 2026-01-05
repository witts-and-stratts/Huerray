'use client';

import {
  EyeIcon,
  FilterHorizontalIcon,
  SearchIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import { ChevronDown, Grip, Table as TableIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { cn } from '@/lib/dashboard-utils';
import { ModelCampaign } from './types';
import { ToggleGroup, ToggleGroupItem } from '../dashboard-ui/toggle-group';

interface CampaignsTableToolbarProps {
  table: Table<ModelCampaign>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function CampaignsTableToolbar( {
  table,
  statuses,
  view,
  setView,
}: CampaignsTableToolbarProps ) {
  const [ searchValue, setSearchValue ] = React.useState( '' );

  // Debounce search input
  React.useEffect( () => {
    const timer = setTimeout( () => {
      table.getColumn( 'campaign_name' )?.setFilterValue( searchValue );
    }, 100 );

    return () => clearTimeout( timer );
  }, [ searchValue, table ] );

  return (
    <div className='flex items-center justify-between py-4 sticky top-[104px] bg-background z-20 px-5 transition-all duration-500 mb-3 border-b'>
      <SuperField
        type='search'
        placeholder='Search Campaign...'
        prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
        fieldClassName='placeholder:text-gray-400 font-regular'
        value={ searchValue }
        onChange={ ( event ) => setSearchValue( event.target.value ) }
        className='max-w-sm bg-background'
        autoComplete='off'
      />
      <div className='flex items-center gap-2'>
        <ToggleGroup
          variant={ 'outline' }
          size={ 'sm' }
          className={ 'rounded-md overflow-hidden border' }
          defaultValue={ [ view ] }
        >
          <ToggleGroupItem
            onClick={ () => setView( 'table' ) }
            title='Table View'
            className={ 'border-0' }
            value='table'
          >
            <TableIcon className='h-4 w-4' strokeWidth={ 1 } />
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={ () => setView( 'cards' ) }
            title='Cards View'
            className={ 'border-0 border-l' }
            value='cards'
          >
            <Grip className='h-4 w-4' strokeWidth={ 1 } />
          </ToggleGroupItem>
        </ToggleGroup>
        <ButtonGroup>
          <ButtonGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size={ 'sm' }>
                  <HugeiconsIcon
                    icon={ FilterHorizontalIcon }
                    className='text-sm'
                  />
                  <ChevronDown width={ 1 } />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={ 'min-w-60' }>
                <div
                  className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center outline-hidden select-none hover:bg-accent text-xs text-primary'
                  onClick={ ( e ) => {
                    e.stopPropagation();
                    const column = table.getColumn( 'campaign_status' );
                    if ( !column ) return;
                    column.setFilterValue( statuses );
                  } }
                >
                  Select All
                </div>
                <DropdownMenuSeparator />
                { statuses.map( ( status ) => {
                  const filterValue = table
                    .getColumn( 'campaign_status' )
                    ?.getFilterValue() as string[] | undefined;

                  return (
                    <DropdownMenuCheckboxItem
                      key={ status }
                      className={ cn( 'capitalize' ) }
                      checked={
                        Array.isArray( filterValue ) &&
                        filterValue.includes( status )
                      }
                      onCheckedChange={ ( value ) => {
                        const column = table.getColumn( 'campaign_status' );
                        if ( !column ) return;

                        let currentStatuses =
                          ( column.getFilterValue() as string[] ) ?? [];

                        if ( value ) {
                          currentStatuses = [ ...currentStatuses, status ];
                        } else {
                          currentStatuses = currentStatuses.filter(
                            ( s ) => s !== status
                          );
                        }

                        column.setFilterValue(
                          currentStatuses.length > 0
                            ? currentStatuses
                            : undefined
                        );
                      } }
                    >
                      { status.replace( /_/g, ' ' ) }
                    </DropdownMenuCheckboxItem>
                  );
                } ) }
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ButtonGroup className='text-slate-600'>
            <Button variant='outline' size={ 'icon-sm' }>
              <HugeiconsIcon icon={ EyeIcon } className='text-sm' />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='ml-auto font-regular text-sm'
                >
                  Columns <ChevronDown width={ 1 } />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={ 'min-w-60' }>
                { table
                  .getAllColumns()
                  .filter( ( column ) => column.getCanHide() )
                  .map( ( column ) => {
                    const shouldHide =
                      column.id === 'campaign_name' ||
                      column.id === 'campaign_status';
                    return (
                      <DropdownMenuCheckboxItem
                        key={ column.id }
                        className={ cn( 'capitalize', { hidden: shouldHide } ) }
                        checked={ shouldHide ? false : column.getIsVisible() }
                        onCheckedChange={ ( value ) =>
                          column.toggleVisibility( !!value )
                        }
                      >
                        { column.id }
                      </DropdownMenuCheckboxItem>
                    );
                  } ) }
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}
