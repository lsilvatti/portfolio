import { Link as IntlLink } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva("underline-offset-4 transition-colors duration-200", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary hover:text-primary-hover",
      muted: "text-muted hover:text-foreground",
      nav: "text-lg font-medium text-muted-foreground capitalize transition-all duration-300 ease-in-out hover:text-primary hover:drop-shadow-[0_0_6px_var(--color-primary)] active:scale-95 data-[active=true]:text-secondary data-[active=true]:drop-shadow-[0_0_8px_var(--color-secondary)]",
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
} & ComponentPropsWithoutRef<typeof IntlLink>;

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
    <IntlLink className={classes} {...rest}>
      {children}
    </IntlLink>
  );
}

export { linkVariants };