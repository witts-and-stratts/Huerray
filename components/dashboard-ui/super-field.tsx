'use client';

import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as React from 'react';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/dashboard-ui/field';
import { Input } from '@/components/dashboard-ui/input';
import { Textarea } from '@/components/dashboard-ui/textarea';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/dashboard-ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupSelect,
} from '@/components/dashboard-ui/input-group';
import { cn } from '@/lib/dashboard-utils';
import { AnimatePresence, motion } from "motion/react";

// Base props shared by all field types
interface BaseFieldProps {
  label?: string;
  description?: string;
  error?: string;
  errors?: Array<{ message?: string; } | undefined>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  // InputGroup support
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixAlign?: 'inline-start' | 'block-start';
  suffixAlign?: 'inline-end' | 'block-end';
  headerExtra?: React.ReactNode;
}

// Input field specific props
interface InputFieldProps
  extends BaseFieldProps,
  Omit<React.ComponentProps<typeof Input>, keyof BaseFieldProps | 'type'> {
  type:
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local';
}

// Textarea field specific props
interface TextareaFieldProps
  extends BaseFieldProps,
  Omit<React.ComponentProps<typeof Textarea>, keyof BaseFieldProps | 'type'> {
  type: 'textarea';
}

// File input specific props
interface FileFieldProps
  extends BaseFieldProps,
  Omit<React.ComponentProps<typeof Input>, keyof BaseFieldProps | 'type'> {
  type: 'file';
}

// Checkbox field specific props
interface CheckboxFieldProps
  extends BaseFieldProps,
  Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, keyof BaseFieldProps | 'type'> {
  type: 'checkbox';
  checked?: boolean;
  onCheckedChange?: ( checked: boolean | 'indeterminate' ) => void;
}

// Select option types
type SelectOption =
  | number
  | string
  | { label: React.ReactNode; value: string; disabled?: boolean; };

// Select field specific props
interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  placeholder?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: ( value: string | null ) => void;
  children?: React.ReactNode;
  options?: SelectOption[];
  name?: string;
  id?: string;
}

// Discriminated union of all field types
type SuperFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | FileFieldProps
  | SelectFieldProps
  | CheckboxFieldProps;

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
 *
 * @example
 * // Select with options array (strings)
 * <SuperField
 *   type="select"
 *   label="Country"
 *   options={["USA", "UK", "Canada"]}
 * />
 *
 * @example
 * // Select with options array (objects)
 * <SuperField
 *   type="select"
 *   label="Language"
 *   options={[
 *     { label: "English", value: "en" },
 *     { label: "Spanish", value: "es", disabled: true }
 *   ]}
 * />
 *
 * @example
 * // Select with children (traditional approach)
 * <SuperField type="select" label="Theme">
 *   <SelectItem value="light">Light</SelectItem>
 *   <SelectItem value="dark">Dark</SelectItem>
 * </SuperField>
 */
export const SuperField = React.forwardRef<
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

  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const hasInputGroup = !!( prefix || suffix ) && type !== 'file';

  const ariaConfig = {
    'aria-invalid': !!( error || errors?.length ),
    'aria-describedby':
      description || error || errors?.length
        ? `${ fieldId }-description ${ fieldId }-error`
        : undefined,
  };

  // Helper to render prefix/suffix addons
  const renderAddon = (
    content: React.ReactNode,
    align: 'inline-start' | 'block-start' | 'inline-end' | 'block-end'
  ) => {
    if ( !content ) return null;
    return (
      <InputGroupAddon align={ align }>
        { typeof content === 'string' ? (
          <InputGroupText>{ content }</InputGroupText>
        ) : (
          content
        ) }
      </InputGroupAddon>
    );
  };

  // Unified control renderer
  const renderControl = () => {
    const commonProps = {
      id: fieldId,
      required,
      disabled,
      ...ariaConfig,
      className: fieldClassName,
    };

    if ( type === 'select' ) {
      const selectProps = props as SelectFieldProps;

      // Render select items from options array or use children
      const renderSelectItems = () => {
        if ( selectProps.options ) {
          return selectProps.options.map( ( option ) => {
            if ( typeof option === 'string' || typeof option === 'number' ) {
              return (
                <SelectItem key={ option } value={ option }>
                  { option }
                </SelectItem>
              );
            }
            return (
              <SelectItem
                key={ option.value }
                value={ option.value }
                disabled={ option.disabled }
              >
                { option.label }
              </SelectItem>
            );
          } );
        }
        return selectProps.children;
      };

      // Calculate display label from options if available
      const selectedLabel = React.useMemo( () => {
        if ( !selectProps.value || !selectProps.options ) return null;
        const option = selectProps.options.find( ( opt ) => {
          if ( typeof opt === "object" && opt !== null && "value" in opt ) {
            return opt.value === selectProps.value;
          }
          return String( opt ) === selectProps.value;
        } );
        return option ? ( typeof option === "object" && option !== null && "label" in option ? option.label : option ) : null;
      }, [ selectProps.value, selectProps.options ] );

      const selectContent = (
        <>
          <SelectTrigger { ...commonProps } className={ cn( fieldClassName ) }>
            <SelectValue>{ selectedLabel || selectProps.placeholder }</SelectValue>
          </SelectTrigger>
          <SelectContent>{ renderSelectItems() }</SelectContent>
        </>
      );

      if ( hasInputGroup ) {
        return (
          <InputGroup className={ fieldClassName }>
            { renderAddon( prefix, prefixAlign ) }
            <Select
              value={ selectProps.value }
              defaultValue={ selectProps.defaultValue }
              onValueChange={ selectProps.onValueChange }
              name={ selectProps.name }
              disabled={ disabled }
              required={ required }
            >
              <InputGroupSelect { ...commonProps } className={ cn( fieldClassName ) }>
                <SelectValue>{ selectedLabel || selectProps.placeholder }</SelectValue>
              </InputGroupSelect>
              <SelectContent>{ renderSelectItems() }</SelectContent>
            </Select>
            { renderAddon( suffix, suffixAlign ) }
          </InputGroup>
        );
      }

      return (
        <Select
          value={ selectProps.value }
          defaultValue={ selectProps.defaultValue }
          onValueChange={ selectProps.onValueChange }
          name={ selectProps.name }
          disabled={ disabled }
          required={ required }
        >
          { selectContent }
        </Select>
      );
    }

    if ( type === 'textarea' ) {
      const textareaProps = {
        ...( rest as React.ComponentProps<typeof Textarea> ),
        ...commonProps,
        ref: ref as React.ForwardedRef<HTMLTextAreaElement>,
      };

      if ( hasInputGroup ) {
        return (
          <InputGroup className={ fieldClassName }>
            { renderAddon( prefix, prefixAlign ) }
            <InputGroupTextarea { ...textareaProps } />
            { renderAddon( suffix, suffixAlign ) }
          </InputGroup>
        );
      }
      return <Textarea { ...textareaProps } />;
    }

    if ( type === 'checkbox' ) {
      const {
        checked,
        onCheckedChange,
        ...checkboxProps
      } = props as CheckboxFieldProps;

      return (
        <Checkbox
          id={ fieldId }
          checked={ checked }
          onCheckedChange={ onCheckedChange }
          disabled={ disabled }
          required={ required }
          className={ cn( fieldClassName ) }
          { ...ariaConfig }
          { ...( checkboxProps as any ) }
        />
      );
    }

    const inputProps = {
      ...( rest as React.ComponentProps<typeof Input> ),
      ...commonProps,
      type: type as any,
      ref: ref as React.ForwardedRef<HTMLInputElement>,
    };

    if ( hasInputGroup ) {
      return (
        <InputGroup className={ fieldClassName }>
          { renderAddon( prefix, prefixAlign ) }
          <InputGroupInput { ...inputProps } />
          { renderAddon( suffix, suffixAlign ) }
        </InputGroup>
      );
    }

    return <Input { ...inputProps } />;
  };

  const isCheckbox = type === 'checkbox';

  return (
    <Field
      className={ cn( className, ) }
      data-disabled={ disabled }
      data-invalid={ !!( error || errors?.length ) }
      orientation={ isCheckbox ? 'horizontal' : 'vertical' }
    >
      { isCheckbox ? (
        <>
          { renderControl() }
          <div className="flex flex-col gap-1.5 leading-none">
            { label && (
              <FieldLabel htmlFor={ fieldId } className={ cn( "cursor-pointer", labelClassName ) }>
                { label }
                { required && <span className='text-destructive -ml-1'>*</span> }
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
          </div>
        </>
      ) : (
        <>
          { label && (
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={ fieldId } className={ labelClassName }>
                { label }
                { required && <span className='text-destructive -ml-1'>*</span> }
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
