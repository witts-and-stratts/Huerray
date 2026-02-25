import { AriaAttributes, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/dashboard-ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard-ui/popover";
import { Calendar } from "@/components/dashboard-ui/calendar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { BaseFieldProps } from "./types";
import { type DateRange } from "react-day-picker";

export type { DateRange };

export interface DatePickerInputProps {
  id?: string;
  name?: string;
  value?: Date | string | DateRange;
  onChange?: ( value: Date | DateRange | undefined ) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  ariaConfig?: AriaAttributes;
  dateFormat?: Intl.DateTimeFormatOptions;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  mode?: 'single' | 'range';
  onBlur?: () => void;
}

export interface DatePickerFieldProps extends BaseFieldProps, Omit<DatePickerInputProps, keyof BaseFieldProps> {
  type: 'datepicker';
}

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };

function isDateRange( v: unknown ): v is DateRange {
  return typeof v === 'object' && v !== null && 'from' in v;
}

const normalizeDate = ( d: Date | string | undefined ): Date | undefined => {
  if ( !d ) return undefined;
  if ( d instanceof Date ) return d;
  if ( typeof d === 'string' ) {
    const parsed = new Date( d );
    return isNaN( parsed.getTime() ) ? undefined : parsed;
  }
  return undefined;
};

function formatDateValue( date: Date | undefined, format: Intl.DateTimeFormatOptions, loc: string ) {
  if ( !date || !( date instanceof Date ) || isNaN( date.getTime() ) ) return "";
  return date.toLocaleDateString( loc, format );
}

function formatRangeValue( range: DateRange, format: Intl.DateTimeFormatOptions, loc: string ) {
  const from = range.from ? formatDateValue( range.from, format, loc ) : "...";
  const to = range.to ? formatDateValue( range.to, format, loc ) : "...";
  return range.from ? `${ from } – ${ to }` : "";
}

function formatValue( v: Date | DateRange | undefined, format: Intl.DateTimeFormatOptions, loc: string ) {
  if ( !v ) return "";
  if ( isDateRange( v ) ) return formatRangeValue( v, format, loc );
  return formatDateValue( v, format, loc );
}

function isValidDate( date: Date | undefined ) {
  if ( !date ) return false;
  return !isNaN( date.getTime() );
}

function normalizeValue( value: Date | string | DateRange | undefined ): Date | DateRange | undefined {
  if ( isDateRange( value ) ) return value;
  return normalizeDate( value as Date | string | undefined );
}

function getMonthFromValue( v: Date | DateRange | undefined ): Date {
  if ( !v ) return new Date();
  if ( isDateRange( v ) ) return v.from ?? new Date();
  return v;
}

export const DatePickerInput = ( {
  id,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  ariaConfig,
  dateFormat = DEFAULT_DATE_FORMAT,
  locale = "en-US",
  minDate,
  maxDate,
  mode = 'single',
  onBlur,
}: DatePickerInputProps ) => {

  const normalizedValue = normalizeValue( value );

  const [ open, setOpen ] = useState( false );
  const [ month, setMonth ] = useState<Date | undefined>( getMonthFromValue( normalizedValue ) );
  const [ inputValue, setInputValue ] = useState( formatValue( normalizedValue, dateFormat, locale ) );
  const lastEmittedRef = useRef<Date | DateRange | undefined>( undefined );

  // In range mode we buffer the in-progress selection here instead of calling
  // onChange immediately. Calling onChange with a partial range causes the
  // parent to re-render and pass a new `value` prop back, which forces the
  // Calendar to re-render and momentarily move focus, which Base UI's Popover
  // interprets as a click-outside and dismisses the popup.
  const [ internalRange, setInternalRange ] = useState<DateRange | undefined>(
    mode === 'range' && isDateRange( normalizedValue ) ? normalizedValue : undefined
  );
  const [ rangeClickStep, setRangeClickStep ] = useState( 0 );

  // Sync internal range from the committed external value each time the
  // popover opens so any externally-driven value changes are reflected.
  useEffect( () => {
    if ( open && mode === 'range' ) {
      setInternalRange( isDateRange( normalizedValue ) ? normalizedValue : undefined );
      setRangeClickStep( 0 );
    }
    if ( !open && mode === 'range' ) {
      setRangeClickStep( 0 );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ] );

  useEffect( () => {
    const normalized = normalizeValue( value );
    queueMicrotask( () => {
      if ( normalized ) {
        const prev = lastEmittedRef.current;
        const isFromTyping = prev instanceof Date && normalized instanceof Date
          ? prev.getTime() === normalized.getTime()
          : false;
        if ( !isFromTyping ) {
          setInputValue( formatValue( normalized, dateFormat, locale ) );
        }
        setMonth( getMonthFromValue( normalized ) );
      } else {
        setInputValue( "" );
      }
    } );
  }, [ value, dateFormat, locale ] );

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const newValue = e.target.value;
    setInputValue( newValue );
    if ( mode !== 'range' ) {
      const date = new Date( newValue );
      if ( isValidDate( date ) ) {
        lastEmittedRef.current = date;
        onChange?.( date );
        setMonth( date );
      }
    }
  };

  const handleBlur = () => {
    setInputValue( formatValue( normalizedValue, dateFormat, locale ) );
    lastEmittedRef.current = undefined;
    onBlur?.();
  };

  const handleKeyDown = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === "ArrowDown" || e.key === "Enter" ) {
      e.preventDefault();
      setOpen( true );
    }
  };

  const handleSingleSelect = ( date: Date | undefined ) => {
    onChange?.( date );
    setInputValue( date instanceof Date ? formatDateValue( date, dateFormat, locale ) : "" );
    setOpen( false );
    lastEmittedRef.current = undefined;
  };

  const handleRangeSelect = ( date: DateRange | undefined ) => {
    if ( !date ) {
      setInternalRange( undefined );
      setRangeClickStep( 0 );
      return;
    }
    // Buffer the partial range locally — do NOT call onChange until both
    // from and to are selected. This prevents the parent re-render that
    // would move focus and cause the popover to close prematurely.
    setInternalRange( date );
    setInputValue( formatRangeValue( date, dateFormat, locale ) );
    if ( rangeClickStep < 1 ) {
      setRangeClickStep( 1 );
      return;
    }
    if ( date.from && date.to ) {
      onChange?.( date );
      setOpen( false );
      lastEmittedRef.current = undefined;
      setRangeClickStep( 0 );
    }
  };

  const handleOpenChange = ( nextOpen: boolean ) => {
    if ( !nextOpen && mode === 'range' ) {
      const activeRange = internalRange;
      if ( activeRange?.from && !activeRange?.to ) {
        return;
      }
    }
    setOpen( nextOpen );
  };

  const calendarDisabled = ( date: Date ) => {
    if ( minDate && date < minDate ) return true;
    if ( maxDate && date > maxDate ) return true;
    return false;
  };

  return (
    <InputGroup className={ className }>
      <InputGroupInput
        id={ id }
        value={ inputValue }
        placeholder={ placeholder || "Select date..." }
        onChange={ handleInputChange }
        onKeyDown={ handleKeyDown }
        onBlur={ handleBlur }
        disabled={ disabled }
        { ...ariaConfig }
      />
      <InputGroupAddon align="inline-end">
        <Popover open={ open } onOpenChange={ handleOpenChange }>
          <PopoverTrigger
            render={
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
                disabled={ disabled }
                type="button"
              >
                <HugeiconsIcon icon={ Calendar01Icon } strokeWidth={ 2 } className="size-4" />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            }
          />
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={ -8 }
            sideOffset={ 10 }
          >
            <div
              onClick={ ( e ) => e.stopPropagation() }
              onMouseDown={ ( e ) => e.stopPropagation() }
            >
              { mode === 'range' ? (
                <Calendar
                  mode="range"
                  selected={ internalRange }
                  onSelect={ handleRangeSelect }
                  month={ month }
                  onMonthChange={ setMonth }
                  captionLayout="dropdown"
                  numberOfMonths={ 2 }
                  disabled={ calendarDisabled }
                />
              ) : (
                <Calendar
                  mode="single"
                  selected={ normalizedValue instanceof Date ? normalizedValue : undefined }
                  onSelect={ handleSingleSelect }
                  month={ month }
                  onMonthChange={ setMonth }
                  captionLayout="dropdown"
                  disabled={ calendarDisabled }
                />
              ) }
            </div>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
};
