'use client';

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { SuperField } from '../dashboard-ui/super-field';

export function AdminDateRangePicker() {
  const [ range, setRange ] = useState<DateRange | undefined>( {
    from: new Date( 2026, 1, 1 ),
    to: new Date( 2026, 1, 21 ),
  } );

  return (
    <div className="flex flex-col gap-1 min-w-[250px]">
      <SuperField
        type='datepicker'
        mode='range'
        value={ range }
        onChange={ ( v ) => setRange( v as DateRange | undefined ) }
      />
    </div>
  );
}
