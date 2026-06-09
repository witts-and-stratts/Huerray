'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/dashboard-ui/field';
import { cn } from '@/lib/dashboard-utils';
import { AnimatePresence, motion } from "motion/react";
import { ForwardedRef, forwardRef, useId } from "react";
import {
  BaseRendererProps,
  RenderCheckbox,
  RenderChoiceCard,
  RenderCountry,
  RenderDatePicker,
  RenderDateRangeWithOptions,
  RenderEditor,
  RenderEntitySelect,
  RenderInput,
  RenderSearchableSelect,
  RenderSelect,
  RenderSwitch,
  RenderTags,
  RenderTextarea,
  RenderMultiSelect
} from './superfield/field-renderers';
import {
  CheckboxFieldProps,
  ChoiceCardFieldProps,
  CountryFieldProps,
  DatePickerFieldProps,
  DateRangeWithOptionsFieldProps,
  EditorFieldProps,
  EntitySelectFieldProps,
  FileFieldProps,
  InputFieldProps,
  SearchableSelectFieldProps,
  SelectFieldProps,
  SelectOption,
  SwitchFieldProps,
  TagsFieldProps,
  TextareaFieldProps,
  MultiSelectFieldProps
} from "./superfield/types";

// Discriminated union of all field types
type SuperFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | FileFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | TagsFieldProps
  | EditorFieldProps
  | SearchableSelectFieldProps
  | EntitySelectFieldProps
  | DatePickerFieldProps
  | DateRangeWithOptionsFieldProps
  | SwitchFieldProps
  | MultiSelectFieldProps
  | CountryFieldProps
  | ChoiceCardFieldProps;

const renderers: Record<string, React.ElementType> = {
  'select': RenderSelect,
  'searchable-select': RenderSearchableSelect,
  'entity-select': RenderEntitySelect,
  'multi-select': RenderMultiSelect,
  'country': RenderCountry,
  'choice-card': RenderChoiceCard,
  'textarea': RenderTextarea,
  'checkbox': RenderCheckbox,
  'switch': RenderSwitch,
  'tags': RenderTags,
  'editor': RenderEditor,
  'datepicker': RenderDatePicker,
  'date-range-with-options': RenderDateRangeWithOptions,
  'file': RenderInput,
  'default': RenderInput
};

/**
 * SuperField Component
 * A high-level abstraction for form fields, combining Label, Input/Textarea/Select, and Error handling.
 * Supports InputGroups (prefixes/suffixes) and is fully accessible.
 *
 * Supported field types:
 * - text, email, password, number, tel, url, search, date, time, datetime-local
 * - textarea
 * - file
 * - select (with options array or children)
 * - searchable-select
 * - tags
 * - editor
 * - checkbox
 * - datepicker
 * - switch
 *
 * @example
 * // Searchable Select
 * <SuperField
 *   type="searchable-select"
 *   label="Framework"
 *   options={[
 *     { label: "React", value: "react" },
 *     { label: "Vue", value: "vue" }
 *   ]}
 * />
 *
 * @example
 * // Date Picker
 * <SuperField
 *   type="datepicker"
 *   label="Start Date"
 *   value={new Date()}
 *   onChange={(date) => console.log(date)}
 *   placeholder="Select a date"
 * />
 *
 * @example
 * // Tags
 * <SuperField
 *   type="tags"
 *   label="Skills"
 *   value={['React', 'Next.js']}
 *   onChange={(tags) => console.log(tags)}
 * />
 */
export const SuperField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  SuperFieldProps
>( ( props, ref ) => {
  const {
    label,
    description,
    error,
    errors,
    required,
    disabled,
    className,
    fieldClassName,
    labelClassName,
    type,
    prefix,
    suffix,
    prefixAlign = 'inline-start',
    suffixAlign = 'inline-end',
    headerExtra,
    id,
    ...rest
  } = props;

  const generatedId = useId();
  const fieldId = id || generatedId;
  const hasInputGroup = !!( prefix || suffix ) && type !== 'file';

  const ariaConfig = {
    'aria-invalid': !!( error || errors?.length ),
    'aria-describedby':
      description || error || errors?.length
        ? `${ fieldId }-description ${ fieldId }-error`
        : undefined,
  };

  const isCheckable = type === 'checkbox' || type === 'switch';
  const Renderer = renderers[ type ] || renderers[ 'default' ];

  const baseProps: BaseRendererProps = {
    fieldId,
    required,
    disabled,
    ariaConfig,
    fieldClassName,
    hasInputGroup,
    prefix,
    suffix,
    prefixAlign,
    suffixAlign
  };

  const renderControl = () => (
    <Renderer
      props={ props }
      base={ baseProps }
      ref={ ref as ForwardedRef<any> }
    />
  );

  return (
    <Field
      className={ cn( className, "gap-2" ) }
      data-disabled={ disabled }
      data-invalid={ !!( error || errors?.length ) }
      orientation={ isCheckable ? 'horizontal' : 'vertical' }
    >
      { isCheckable ? (
        <>
          { renderControl() }
          <FieldContent>
            { label && (
              <FieldLabel htmlFor={ fieldId } className={ cn( "cursor-pointer", labelClassName ) }>
                { label }
                { required && <span className='text-destructive ml-1'>*</span> }
              </FieldLabel>
            ) }
            { description && (
              <FieldDescription id={ `${ fieldId }-description` }>
                { description }
              </FieldDescription>
            ) }
            <AnimatePresence mode='wait'>
              { ( error || errors ) && (
                <motion.div initial={ { opacity: 0, height: 0 } } animate={ { opacity: 1, height: "auto" } } exit={ { opacity: 0, height: 0 } }>
                  <FieldError id={ `${ fieldId }-error` } errors={ errors } className="font-regular">
                    { error }
                  </FieldError>
                </motion.div>
              ) }
            </AnimatePresence>
          </FieldContent>
        </>
      ) : (
        <>
          { label && (
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={ fieldId } className={ labelClassName }>
                { label }
                { required && <span className='text-destructive ml-1'>*</span> }
              </FieldLabel>
              { headerExtra }
            </div>
          ) }
          { description && (
            <FieldDescription id={ `${ fieldId }-description` }>
              { description }
            </FieldDescription>
          ) }
          { renderControl() }
          <AnimatePresence mode='wait'>
            { ( error || errors ) && (
              <motion.div initial={ { opacity: 0, height: 0 } } animate={ { opacity: 1, height: "auto" } } exit={ { opacity: 0, height: 0 } }>
                <FieldError id={ `${ fieldId }-error` } errors={ errors } className="font-regular">
                  { error }
                </FieldError>
              </motion.div>
            ) }
          </AnimatePresence>
        </>
      ) }
    </Field>
  );
} );

SuperField.displayName = 'SuperField';

// Export types for external use
export type { SelectOption };
