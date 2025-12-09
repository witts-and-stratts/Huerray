import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"
import {JSX} from "react";

const typographyVariants = cva(
  "",
  {
    variants: {
      variant: {
        h1: "typo-h1",
        h2: "typo-h2",
        h3: "typo-h3",
        h4: "typo-h4",
        h5: "typo-h5",
        h6: "typo-h6",
        body: "typo-body",
        blockquote: "typo-blockquote",
        caption: "typo-caption",
        endnote: "typo-endnote",
        footnote: "typo-footnote",
        xlarge: "typo-xlarge",
        xxlarge: "typo-xxlarge",
      },
    },
    defaultVariants: {
      variant: "body",
    },
  }
)

// Default tag mapping based on variant
const defaultTagMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  blockquote: "blockquote",
  caption: "span",
  endnote: "small",
  footnote: "small",
  xlarge: "h1",
  xxlarge: "h1",
} as const

// Reverse mapping to get variant from tag
const tagToVariantMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "body",
  blockquote: "blockquote",
  span: "caption",
  small: "endnote", // Could be endnote or footnote, defaulting to endnote
} as const

type TypographyVariant = keyof typeof defaultTagMap
type HtmlTag = keyof JSX.IntrinsicElements

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string,
  type?: HtmlTag,
  as?: TypographyVariant,
  ref?: React.RefObject<HTMLElement | null>
}

function Typography({
                      className,
                      as,
                      type,
                      children,
                      ref,
                      ...props
                    }: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  // Determine the style variant: use 'as' if provided, otherwise infer from 'type', fallback to 'body'
  const styleVariant = as || (type && tagToVariantMap[type as keyof typeof tagToVariantMap]) || "body"

  // Determine the HTML tag: use 'type' if provided, otherwise use default mapping for the style variant
  const Tag = type || defaultTagMap[styleVariant]

  return React.createElement(
    Tag,
    {
      "data-slot": "typography",
      className: cn(typographyVariants({variant: styleVariant}), className),
      ref: ref,
      ...props,
    },
    children
  )
}

export {Typography, typographyVariants, type TypographyProps}
