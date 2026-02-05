'use client';

import { Grip, Table as TableIcon } from 'lucide-react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/dashboard-ui/toggle-group';
import { cn } from '@/lib/dashboard-utils';

export type DataTableViewType = 'table' | 'cards';

interface DataTableViewToggleProps {
  view: DataTableViewType;
  setView: ( view: DataTableViewType ) => void;
  className?: string;
}

export function DataTableViewToggle( {
  view,
  setView,
  className,
}: DataTableViewToggleProps ) {
  return (
    <ToggleGroup
      variant={ 'outline' }
      size={ 'sm' }
      className={ cn( 'rounded-md overflow-hidden border font-normal h-8', className ) }
      value={ [ view ] }
      onValueChange={ ( val ) => {
        if ( val && val.length > 0 ) {
          setView( val[ 0 ] as DataTableViewType );
        }
      } }
    >
      <ToggleGroupItem
        title='Table View'
        className={ 'border-0' }
        value='table'
      >
        <TableIcon className='size-4' strokeWidth={ 1 } />
      </ToggleGroupItem>
      <ToggleGroupItem
        title='Cards View'
        className={ 'border-0 border-l' }
        value='cards'
      >
        <Grip className='size-4' strokeWidth={ 1 } />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
