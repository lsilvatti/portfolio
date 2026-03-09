import type { ElementType, ComponentPropsWithoutRef } from "react";

const variantStyles = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  body: "text-base",
  small: "text-sm text-muted",
  caption: "text-xs text-muted-foreground",
} as const;

const defaultTags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "span",
  caption: "span",
};

type Variant = keyof typeof variantStyles;

type TypographyProps<T extends ElementType = "p"> = {
  variant?: Variant;
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
  variant = "body",
  as,
  className = "",
  children,
  ...rest
}: TypographyProps<T>) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag className={`${variantStyles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
