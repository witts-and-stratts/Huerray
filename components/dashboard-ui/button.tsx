"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/dashboard-utils";

const buttonVariants = cva(
  "button__default-variant",
  {
    variants: {
      variant: {
        default: "button__default",
        outline: "button__outline",
        secondary: "button__secondary",
        ghost: "button__ghost",
        destructive: "button__destructive",
        link: "button__link",
      },
      size: {
        default: "button__size__default",
        xs: "button__size__xs",
        sm: "button__size__sm",
        lg: "button__size__lg",
        icon: "size-9",
        "icon-xs": "button__size__icon__xs",
        "icon-sm": "button__size__icon__sm",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button( {
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> ) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={ cn( buttonVariants( { variant, size, className } ) ) }
      { ...props }
    />
  );
}

export { Button, buttonVariants };
