"use client";

import { RadioGroup, RadioGroupItem } from "@/components/dashboard-ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/dashboard-ui/field";
import { cn } from "@/lib/dashboard-utils";
import { BaseFieldProps } from "./types";

export interface ChoiceCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ChoiceCardInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: ( value: string ) => void;
  onBlur?: () => void;
  options: ChoiceCardOption[];
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export interface ChoiceCardFieldProps extends BaseFieldProps, Omit<ChoiceCardInputProps, keyof BaseFieldProps | 'containerClassName'> {
  containerClassName?: string;
  type: 'choice-card';
}

export function ChoiceCardInput( {
  id,
  value,
  defaultValue,
  onValueChange,
  onBlur,
  options,
  disabled,
  className,
  containerClassName,
}: ChoiceCardInputProps ) {
  return (
    <RadioGroup
      value={ value }
      defaultValue={ defaultValue }
      onValueChange={ ( value ) => onValueChange?.( value as string ) }
      disabled={ disabled }
      onBlur={ onBlur }
      className={ cn( "gap-2", containerClassName ) }
    >
      { options.map( ( option ) => (
        <FieldLabel key={ option.value } htmlFor={ `${ id }-${ option.value }` }>
          <Field orientation="horizontal">
            <FieldContent>
              <div className="flex items-center gap-2">
                { option.icon && <span className="text-muted-foreground">{ option.icon }</span> }
                <FieldTitle>{ option.label }</FieldTitle>
              </div>
              { option.description && (
                <FieldDescription>{ option.description }</FieldDescription>
              ) }
            </FieldContent>
            <RadioGroupItem value={ option.value } id={ `${ id }-${ option.value }` } />
          </Field>
        </FieldLabel>
      ) ) }
    </RadioGroup>
  );
}
