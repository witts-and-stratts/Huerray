import { useEffect, useMemo, useState } from "react";
import type { AriaAttributes, ReactNode } from "react";
import { type DateRange } from "react-day-picker";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, Tick02Icon, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/dashboard-ui/button";
import { Calendar } from "@/components/dashboard-ui/calendar";
import { Separator } from "@/components/dashboard-ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard-ui/popover";
import { cn } from "@/lib/dashboard-utils";
import type { BaseFieldProps, SelectOption } from "./types";

export type DateRangeWithOptionsValue = string;

export interface DateRangeWithOptionsInputProps {
  id?: string;
  name?: string;
  value?: DateRangeWithOptionsValue;
  onValueChange?: ( value: string | null ) => void;
  dateRange?: DateRange;
  onDateRangeChange?: ( value: DateRange | undefined ) => void;
  options?: SelectOption[];
  placeholder?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  dropdownClassName?: string;
  ariaConfig?: AriaAttributes;
  dateRangeValue?: string;
  dateRangeLabel?: ReactNode;
  dateRangePlaceholder?: ReactNode;
  dateFormat?: Intl.DateTimeFormatOptions;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  onBlur?: () => void;
}

export interface DateRangeWithOptionsFieldProps extends BaseFieldProps, Omit<DateRangeWithOptionsInputProps, keyof BaseFieldProps> {
  type: 'date-range-with-options';
}

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };

type NormalizedOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

function normalizeOptions( options: SelectOption[] | undefined ): NormalizedOption[] {
  return ( options ?? [] ).map( ( option ) => {
    if ( typeof option === 'string' || typeof option === 'number' ) {
      return { label: option, value: String( option ) };
    }

    return option;
  } );
}

function isCompleteRange( range: DateRange | undefined ) {
  return !!range?.from && !!range?.to;
}

function formatDateValue( date: Date | undefined, format: Intl.DateTimeFormatOptions, locale: string ) {
  if ( !date || isNaN( date.getTime() ) ) return "";
  return date.toLocaleDateString( locale, format );
}

function formatRangeValue( range: DateRange | undefined, format: Intl.DateTimeFormatOptions, locale: string ) {
  if ( !range?.from ) return "";
  const from = formatDateValue( range.from, format, locale );
  const to = range.to ? formatDateValue( range.to, format, locale ) : "...";
  return `${ from } - ${ to }`;
}

export function DateRangeWithOptionsInput( {
  id,
  value,
  onValueChange,
  dateRange,
  onDateRangeChange,
  options,
  placeholder,
  disabled,
  required,
  className,
  dropdownClassName,
  ariaConfig,
  dateRangeValue = 'date_range',
  dateRangeLabel,
  dateRangePlaceholder,
  dateFormat = DEFAULT_DATE_FORMAT,
  locale = "en-US",
  minDate,
  maxDate,
  onBlur,
}: DateRangeWithOptionsInputProps ) {
  const [ open, setOpen ] = useState( false );
  const [ showCalendar, setShowCalendar ] = useState( false );
  const [ internalRange, setInternalRange ] = useState<DateRange | undefined>( dateRange );
  const [ rangeClickStep, setRangeClickStep ] = useState( 0 );
  const normalizedOptions = useMemo( () => normalizeOptions( options ), [ options ] );
  const selectedOption = normalizedOptions.find( ( option ) => option.value === value );
  const selectedLabel = value === dateRangeValue && isCompleteRange( dateRange )
    ? formatRangeValue( dateRange, dateFormat, locale )
    : selectedOption?.label ?? placeholder;

  useEffect( () => {
    if ( open ) {
      setShowCalendar( false );
      setInternalRange( dateRange );
      setRangeClickStep( 0 );
    }
    // Sync only when the popover opens. Re-running this when `value` changes
    // would close the calendar immediately after choosing the date range row.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ] );

  const selectOption = ( nextValue: string ) => {
    onValueChange?.( nextValue );
    if ( nextValue === dateRangeValue ) {
      setShowCalendar( true );
      return;
    }

    setOpen( false );
  };

  const selectRange = ( range: DateRange | undefined ) => {
    if ( !range ) {
      setInternalRange( undefined );
      setRangeClickStep( 0 );
      return;
    }

    setInternalRange( range );
    if ( rangeClickStep < 1 ) {
      setRangeClickStep( 1 );
      return;
    }

    if ( range.from && range.to ) {
      onValueChange?.( dateRangeValue );
      onDateRangeChange?.( range );
      setRangeClickStep( 0 );
      setOpen( false );
    }
  };

  const calendarDisabled = ( date: Date ) => {
    if ( minDate && date < minDate ) return true;
    if ( maxDate && date > maxDate ) return true;
    return false;
  };

  return (
    <Popover
      open={ open }
      onOpenChange={ ( nextOpen ) => {
        setOpen( nextOpen );
        if ( !nextOpen ) onBlur?.();
      } }
    >
      <PopoverTrigger
        render={
          <button
            id={ id }
            type="button"
            disabled={ disabled }
            aria-required={ required }
            className={ cn(
              "border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-maroon-300 focus-visible:ring-maroon-300/40 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] h-9 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
              className
            ) }
            { ...ariaConfig }
          >
            <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-left">
              { value === dateRangeValue && <HugeiconsIcon icon={ Calendar01Icon } strokeWidth={ 2 } className="size-4 text-muted-foreground" /> }
              <span className="truncate">{ selectedLabel }</span>
            </span>
            <HugeiconsIcon icon={ UnfoldMoreIcon } strokeWidth={ 2 } className="size-4 text-muted-foreground" />
          </button>
        }
      />
      <PopoverContent className={ cn( "w-auto gap-0 p-1", showCalendar ? "p-0" : dropdownClassName ) } align="end" sideOffset={ 6 }>
        { showCalendar ? (
          <div
            onClick={ ( event ) => event.stopPropagation() }
            onMouseDown={ ( event ) => event.stopPropagation() }
          >
            <div className="flex items-center justify-between border-b border-border/70 px-2 py-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={ () => setShowCalendar( false ) }
              >
                { placeholder }
              </Button>
              <span className="px-2 text-xs text-muted-foreground">
                { dateRangeLabel }
              </span>
            </div>
            <Calendar
              mode="range"
              selected={ internalRange }
              onSelect={ selectRange }
              captionLayout="dropdown"
              numberOfMonths={ 2 }
              disabled={ calendarDisabled }
              appLocale={ locale }
            />
          </div>
        ) : (
          <div className="min-w-44">
            <button
              type="button"
              className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-2.5 text-sm shadow-xs outline-none transition-[color,box-shadow] hover:bg-muted focus-visible:border-maroon-300 focus-visible:ring-[3px] focus-visible:ring-maroon-300/40"
              onClick={ () => selectOption( dateRangeValue ) }
            >
              <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
                <HugeiconsIcon icon={ Calendar01Icon } strokeWidth={ 2 } className="size-4 shrink-0 text-muted-foreground" />
                <span className={ cn( "truncate", !isCompleteRange( dateRange ) && "text-muted-foreground" ) }>
                  { isCompleteRange( dateRange )
                    ? formatRangeValue( dateRange, dateFormat, locale )
                    : dateRangePlaceholder }
                </span>
              </span>
              { value === dateRangeValue && <HugeiconsIcon icon={ Tick02Icon } strokeWidth={ 2 } className="size-4 shrink-0" /> }
            </button>
            <Separator className="my-1" />
            { normalizedOptions.map( ( option ) => (
              <Button
                key={ option.value }
                type="button"
                variant="ghost"
                disabled={ option.disabled }
                className="h-8 w-full justify-start gap-2 px-2 font-normal"
                onClick={ () => selectOption( option.value ) }
              >
                <span className="flex-1 text-left">{ option.label }</span>
                { value === option.value && <HugeiconsIcon icon={ Tick02Icon } strokeWidth={ 2 } className="size-4" /> }
              </Button>
            ) ) }
          </div>
        ) }
      </PopoverContent>
    </Popover>
  );
}
