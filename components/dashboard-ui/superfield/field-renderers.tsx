import { ReactNode, useMemo, ForwardedRef } from 'react';
import { cn } from '@/lib/dashboard-utils';
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { Switch } from "@/components/dashboard-ui/switch";
import { Input } from '@/components/dashboard-ui/input';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard-ui/select';
import { InputGroup, InputGroupInput, InputGroupSelect, InputGroupTextarea, InputGroupAddon, InputGroupText } from '@/components/dashboard-ui/input-group';
import { SearchableSelect } from './searchable-select';
import { EntitySelect } from './entity-select';
import type { EntitySelectFieldProps } from './entity-select';
import { TagsInput } from './tags-input';
import { DatePickerInput } from './date-picker-input';
import {
  SelectFieldProps,
  SearchableSelectFieldProps,
  EditorFieldProps,
  TagsFieldProps,
  CheckboxFieldProps,
  DatePickerFieldProps,
  InputFieldProps,
  TextareaFieldProps,
  FileFieldProps,
  SwitchFieldProps,
  MultiSelectFieldProps,
  CountryFieldProps
} from './types';
import { UtilsCountryCode } from '@/lib/api/generated/models/utils-country-code';
import { getCountryName } from '@/lib/country-flags';
import { MultiSelectInput } from './multi-select-input';
import { ChoiceCardInput } from './choice-card-input';
import type { ChoiceCardFieldProps } from './types';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic( () => import( '@/components/dashboard-ui/quill-editor' ).then( mod => mod.QuillEditor ), {
  ssr: false,
  loading: () => <div className="h-[150px] w-full rounded-md border border-input bg-transparent animate-pulse" />
} );


export interface BaseRendererProps {
  fieldId: string;
  required?: boolean;
  disabled?: boolean;
  ariaConfig: object;
  fieldClassName?: string;
  hasInputGroup: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixAlign?: 'inline-start' | 'block-start';
  suffixAlign?: 'inline-end' | 'block-end';
}

const renderAddon = (
  content: ReactNode,
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

export const RenderInput = ( {
  props,
  base,
  ref
}: {
  props: InputFieldProps | FileFieldProps;
  base: BaseRendererProps;
  ref?: ForwardedRef<HTMLInputElement>;
} ) => {
  const {
    type,
    label,
    description,
    error,
    errors,
    fieldClassName,
    labelClassName,
    prefix,
    suffix,
    prefixAlign,
    suffixAlign,
    headerExtra,
    className,
    ...rest
  } = props;
  const commonProps = {
    id: base.fieldId,
    required: base.required,
    disabled: base.disabled,
    ...base.ariaConfig,
    className: base.fieldClassName,
  };

  const inputProps = {
    ...( rest as any ),
    ...commonProps,
    type: type as any,
    ref: ref,
  };

  if ( base.hasInputGroup ) {
    return (
      <InputGroup className={ base.fieldClassName }>
        { renderAddon( base.prefix, base.prefixAlign || 'inline-start' ) }
        <InputGroupInput { ...inputProps } />
        { renderAddon( base.suffix, base.suffixAlign || 'inline-end' ) }
      </InputGroup>
    );
  }

  return <Input { ...inputProps } />;
};

export const RenderTextarea = ( {
  props,
  base,
  ref
}: {
  props: TextareaFieldProps;
  base: BaseRendererProps;
  ref?: ForwardedRef<HTMLTextAreaElement>;
} ) => {
  const commonProps = {
    id: base.fieldId,
    required: base.required,
    disabled: base.disabled,
    ...base.ariaConfig,
    className: base.fieldClassName,
  };

  // Destructure type out since it's not needed for textarea
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    type: _type,
    label,
    description,
    error,
    errors,
    fieldClassName,
    labelClassName,
    prefix,
    suffix,
    prefixAlign,
    suffixAlign,
    headerExtra,
    className,
    ...restProps
  } = props as any;

  const textareaProps = {
    ...restProps,
    ...commonProps,
    ref: ref,
  };

  if ( base.hasInputGroup ) {
    return (
      <InputGroup className={ base.fieldClassName }>
        { renderAddon( base.prefix, base.prefixAlign || 'inline-start' ) }
        <InputGroupTextarea { ...textareaProps } />
        { renderAddon( base.suffix, base.suffixAlign || 'inline-end' ) }
      </InputGroup>
    );
  }
  return <Textarea { ...textareaProps } />;
};

export const RenderSelect = ( {
  props,
  base
}: {
  props: SelectFieldProps;
  base: BaseRendererProps;
} ) => {
  const { options, children, value, placeholder, onValueChange, defaultValue, name, onBlur } = props;
  const commonProps = {
    id: base.fieldId,
    required: base.required,
    disabled: base.disabled,
    onBlur,
    ...base.ariaConfig,
    className: base.fieldClassName,
  };

  const renderSelectItems = () => {
    if ( options ) {
      return options.map( ( option ) => {
        if ( typeof option === 'string' || typeof option === 'number' ) {
          return (
            <SelectItem key={ option } value={ String( option ) }>
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
    return children;
  };

  const selectedLabel = useMemo( () => {
    if ( !value || !options ) return null;
    const option = options.find( ( opt ) => {
      if ( typeof opt === "object" && opt !== null && "value" in opt ) {
        return opt.value === value;
      }
      return String( opt ) === value;
    } );
    return option ? ( typeof option === "object" && option !== null && "label" in option ? option.label : option ) : null;
  }, [ value, options ] );

  const selectContent = (
    <>
      <SelectTrigger { ...commonProps } className={ cn( base.fieldClassName ) }>
        <SelectValue>{ selectedLabel || placeholder }</SelectValue>
      </SelectTrigger>
      <SelectContent>{ renderSelectItems() }</SelectContent>
    </>
  );

  if ( base.hasInputGroup ) {
    return (
      <InputGroup className={ base.fieldClassName }>
        { renderAddon( base.prefix, base.prefixAlign || 'inline-start' ) }
        <Select
          value={ value }
          defaultValue={ defaultValue }
          onValueChange={ onValueChange }
          name={ name }
          disabled={ base.disabled }
          required={ base.required }
        >
          <InputGroupSelect { ...commonProps } className={ cn( base.fieldClassName ) }>
            <SelectValue>{ selectedLabel || placeholder }</SelectValue>
          </InputGroupSelect>
          <SelectContent>{ renderSelectItems() }</SelectContent>
        </Select>
        { renderAddon( base.suffix, base.suffixAlign || 'inline-end' ) }
      </InputGroup>
    );
  }

  return (
    <Select
      value={ value }
      defaultValue={ defaultValue }
      onValueChange={ onValueChange }
      name={ name }
      disabled={ base.disabled }
      required={ base.required }
    >
      { selectContent }
    </Select>
  );
};

export const RenderSearchableSelect = ( {
  props,
  base
}: {
  props: SearchableSelectFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onValueChange, options, placeholder, renderOption, renderTrigger } = props;

  if ( base.hasInputGroup ) {
    return (
      <InputGroup className={ base.fieldClassName }>
        { renderAddon( base.prefix, base.prefixAlign || 'inline-start' ) }
        <SearchableSelect
          id={ base.fieldId }
          value={ value }
          onValueChange={ onValueChange }
          options={ options }
          placeholder={ placeholder }
          disabled={ base.disabled }
          required={ base.required }
          className={ cn( "rounded-none shadow-none focus-visible:ring-0 border-0 flex-1", base.fieldClassName ) }
          renderOption={ renderOption }
          renderTrigger={ renderTrigger }
        />
        { renderAddon( base.suffix, base.suffixAlign || 'inline-end' ) }
      </InputGroup>
    );
  }

  return (
    <SearchableSelect
      id={ base.fieldId }
      value={ value }
      onValueChange={ onValueChange }
      options={ options }
      placeholder={ placeholder }
      disabled={ base.disabled }
      required={ base.required }
      className={ base.fieldClassName }
      renderOption={ renderOption }
      renderTrigger={ renderTrigger }
    />
  );
};

export const RenderCheckbox = ( {
  props,
  base
}: {
  props: CheckboxFieldProps;
  base: BaseRendererProps;
} ) => {
  const {
    checked,
    onCheckedChange,
    label,
    description,
    error,
    errors,
    fieldClassName,
    labelClassName,
    prefix,
    suffix,
    prefixAlign,
    suffixAlign,
    headerExtra,
    className,
    ...checkboxProps
  } = props;
  return (
    <Checkbox
      id={ base.fieldId }
      checked={ checked }
      onCheckedChange={ onCheckedChange }
      disabled={ base.disabled }
      required={ base.required }
      className={ cn( base.fieldClassName ) }
      { ...base.ariaConfig }
      { ...( checkboxProps as any ) }
    />
  );
};

export const RenderSwitch = ( {
  props,
  base
}: {
  props: SwitchFieldProps;
  base: BaseRendererProps;
} ) => {
  const {
    checked,
    onCheckedChange,
    label,
    description,
    error,
    errors,
    fieldClassName,
    labelClassName,
    prefix,
    suffix,
    prefixAlign,
    suffixAlign,
    headerExtra,
    className,
    ...switchProps
  } = props;
  return (
    <Switch
      id={ base.fieldId }
      checked={ checked }
      onCheckedChange={ onCheckedChange }
      disabled={ base.disabled }
      required={ base.required }
      className={ cn( base.fieldClassName ) }
      { ...base.ariaConfig }
      { ...( switchProps as any ) }
    />
  );
};

export const RenderTags = ( {
  props,
  base
}: {
  props: TagsFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onChange, placeholder, onBlur, size, expand } = props;
  return (
    <TagsInput
      id={ base.fieldId }
      value={ value }
      onChange={ onChange }
      onBlur={ onBlur }
      placeholder={ placeholder }
      disabled={ base.disabled }
      className={ base.fieldClassName }
      ariaConfig={ base.ariaConfig }
      size={ size }
      expand={ expand }
    />
  );
};

export const RenderEditor = ( {
  props,
  base
}: {
  props: EditorFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onChange, onBlur, placeholder, toolbar } = props;
  return (
    <QuillEditor
      className={ base.fieldClassName }
      value={ value }
      onChange={ onChange }
      onBlur={ onBlur }
      placeholder={ placeholder }
      disabled={ base.disabled }
      toolbar={ toolbar }
    />
  );
};

export const RenderDatePicker = ( {
  props,
  base
}: {
  props: DatePickerFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onChange, placeholder, dateFormat, locale, minDate, maxDate, mode, onBlur } = props;
  return (
    <DatePickerInput
      id={ base.fieldId }
      value={ value }
      onChange={ onChange }
      onBlur={ onBlur }
      placeholder={ placeholder }
      disabled={ base.disabled }
      className={ base.fieldClassName }
      ariaConfig={ base.ariaConfig }
      dateFormat={ dateFormat }
      locale={ locale }
      minDate={ minDate }
      maxDate={ maxDate }
      mode={ mode }
    />
  );
};

const COUNTRY_OPTIONS = Object.values( UtilsCountryCode )
  .map( ( val ) => ( { label: getCountryName( val ) ?? val, value: val } ) )
  .sort( ( a, b ) => a.label.localeCompare( b.label ) );

export const RenderCountry = ( {
  props,
  base
}: {
  props: CountryFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onValueChange, placeholder } = props;
  return (
    <SearchableSelect
      id={ base.fieldId }
      value={ value }
      onValueChange={ onValueChange }
      options={ COUNTRY_OPTIONS }
      placeholder={ placeholder }
      disabled={ base.disabled }
      required={ base.required }
      className={ base.fieldClassName }
    />
  );
};

export const RenderChoiceCard = ( {
  props,
  base
}: {
  props: ChoiceCardFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, defaultValue, onValueChange, onBlur, options, containerClassName } = props;
  return (
    <ChoiceCardInput
      id={ base.fieldId }
      value={ value }
      defaultValue={ defaultValue }
      onValueChange={ onValueChange }
      onBlur={ onBlur }
      options={ options }
      disabled={ base.disabled }
      className={ base.fieldClassName }
      containerClassName={ containerClassName }
    />
  );
};

export const RenderEntitySelect = ( {
  props,
  base
}: {
  props: EntitySelectFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onValueChange, options, placeholder, getEntityMeta, getInitials, avatarClassName } = props;
  return (
    <EntitySelect
      id={ base.fieldId }
      value={ value }
      onValueChange={ onValueChange }
      options={ options }
      placeholder={ placeholder }
      disabled={ base.disabled }
      required={ base.required }
      className={ base.fieldClassName }
      getEntityMeta={ getEntityMeta }
      getInitials={ getInitials }
      avatarClassName={ avatarClassName }
    />
  );
};

export const RenderMultiSelect = ( {
  props,
  base
}: {
  props: MultiSelectFieldProps;
  base: BaseRendererProps;
} ) => {
  const { value, onValueChange, options, placeholder, allowCustom } = props;
  return (
    <MultiSelectInput
      id={ base.fieldId }
      value={ value }
      onValueChange={ onValueChange }
      options={ options }
      placeholder={ placeholder }
      disabled={ base.disabled }
      required={ base.required }
      className={ base.fieldClassName }
      allowCustom={ allowCustom }
    />
  );
};
