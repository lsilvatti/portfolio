import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight",
      h2: "font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight",
      h3: "font-[family-name:var(--font-heading)] text-2xl font-semibold",
      h4: "font-[family-name:var(--font-heading)] text-xl font-medium",
      body: "text-base",
      small: "text-sm text-muted",
      caption: "text-xs text-muted-foreground",
      ul: "list-disc pl-6 space-y-1 text-base",
      ol: "list-decimal pl-6 space-y-1 text-base",
      li: "text-base",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

const defaultTags: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "span",
  caption: "span",
  ul: "ul",
  ol: "ol",
  li: "li",
};

type TypographyProps<T extends ElementType = "p"> = {
  variant?: TypographyVariant;
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
  variant = "body",
  as,
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag className={cn(typographyVariants({ variant }), className)} {...rest}>
      {children}
    </Tag>
  );
}

export { typographyVariants };
