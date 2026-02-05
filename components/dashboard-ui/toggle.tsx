"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/dashboard-utils";

const toggleVariants = cva(
  "toggle__default-variant group/toggle",
  {
    variants: {
      variant: {
        default: "toggle__variant__default",
        outline: "toggle__variant__outline",
      },
      size: {
        default: "toggle__size__default",
        sm: "toggle__size__sm",
        lg: "toggle__size__lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle( {
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants> ) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={ cn( toggleVariants( { variant, size, className } ) ) }
      { ...props }
    />
  );
}

export { Toggle, toggleVariants };
