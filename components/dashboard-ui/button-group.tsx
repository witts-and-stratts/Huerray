import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/dashboard-utils";
import { Separator } from "@/components/dashboard-ui/separator";

const buttonGroupVariants = cva(
  "button-group__default-variant",
  {
    variants: {
      orientation: {
        horizontal:
          "button-group__orientation__horizontal",
        vertical:
          "button-group__orientation__vertical",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

function ButtonGroup( {
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants> ) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={ orientation }
      className={ cn( buttonGroupVariants( { orientation } ), className ) }
      { ...props }
    />
  );
}

function ButtonGroupText( {
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> ) {
  return useRender( {
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "button-group__text",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  } );
}

function ButtonGroupSeparator( {
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator> ) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={ orientation }
      className={ cn(
        "button-group__separator",
        className
      ) }
      { ...props }
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
