import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva("underline-offset-4 transition-colors duration-200", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary hover:text-primary-hover",
      muted: "text-muted hover:text-foreground",
      unstyled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkProps = VariantProps<typeof linkVariants> & {
  className?: string;
  external?: boolean;
} & ComponentPropsWithoutRef<typeof NextLink>;

export function Link({
  variant,
  className,
  external = false,
  children,
  ...rest
}: LinkProps) {
  const classes = cn(linkVariants({ variant }), className);

  if (external) {
    return (
      <a
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...(rest as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink className={classes} {...rest}>
      {children}
    </NextLink>
  );
}

export { linkVariants };
