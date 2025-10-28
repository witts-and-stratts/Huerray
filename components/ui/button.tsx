import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button--default',
      destructive: 'button--destructive',
      outline: 'button--outline',
      secondary: 'button--secondary',
      ghost: 'button--ghost',
      link: 'button--link',
      hero: 'button--hero',
    },
    size: {
      default: 'button--size-default',
      sm: 'button--size-sm',
      lg: 'button--size-lg',
      xl: 'button--size-xl',
      icon: 'button--size-icon',
      'icon-sm': 'button--size-icon-sm',
      'icon-lg': 'button--size-icon-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
