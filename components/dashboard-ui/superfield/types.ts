import React, { ComponentProps, ReactNode } from "react";
import { Input } from '@/components/dashboard-ui/input';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Switch } from '@/components/dashboard-ui/switch';
import { type QuillToolbarConfig } from '@/components/dashboard-ui/quill-editor';


// Select option types
export type SelectOption =
  | number
  | string
  | { label: ReactNode; value: string; disabled?: boolean; };

// Base props shared by all field types
export interface BaseFieldProps {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  errors?: Array<{ message?: string; } | undefined>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  // InputGroup support
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixAlign?: 'inline-start' | 'block-start';
  suffixAlign?: 'inline-end' | 'block-end';
  headerExtra?: ReactNode;
}

// Input field specific props
export interface InputFieldProps
  extends BaseFieldProps,
  Omit<ComponentProps<typeof Input>, keyof BaseFieldProps | 'type'> {
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
export interface TextareaFieldProps
  extends BaseFieldProps,
  Omit<ComponentProps<typeof Textarea>, keyof BaseFieldProps | 'type'> {
  type: 'textarea';
}

// File input specific props
export interface FileFieldProps
  extends BaseFieldProps,
  Omit<ComponentProps<typeof Input>, keyof BaseFieldProps | 'type'> {
  type: 'file';
}

// Checkbox field specific props
export interface CheckboxFieldProps
  extends BaseFieldProps,
  Omit<ComponentProps<typeof CheckboxPrimitive.Root>, keyof BaseFieldProps | 'type'> {
  type: 'checkbox';
  checked?: boolean;
  onCheckedChange?: ( checked: boolean | 'indeterminate' ) => void;
}

// Switch field specific props
export interface SwitchFieldProps
  extends BaseFieldProps,
  Omit<ComponentProps<typeof Switch>, keyof BaseFieldProps | 'type'> {
  type: 'switch';
  checked?: boolean;
  onCheckedChange?: ( checked: boolean ) => void;
}

// Select field specific props
export interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  placeholder?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: ( value: string | null ) => void;
  onBlur?: () => void;
  children?: ReactNode;
  options?: SelectOption[];
  name?: string;
  id?: string;
}

// Editor field specific props
export interface EditorFieldProps extends BaseFieldProps {
  type: 'editor';
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ( value: string ) => void;
  onBlur?: () => void;
  toolbar?: QuillToolbarConfig;
}

// Country field specific props (searchable-select pre-populated with countries)
export interface CountryFieldProps extends BaseFieldProps {
  type: 'country';
  placeholder?: string;
  value?: string;
  onValueChange?: ( value: string | null ) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
}

// Re-export types from other files
export type { ChoiceCardFieldProps } from './choice-card-input';
export type { DatePickerFieldProps } from './date-picker-input';
export type { TagsFieldProps } from './tags-input';
export type { SearchableSelectFieldProps } from './searchable-select';
export type { MultiSelectFieldProps } from './multi-select-input';