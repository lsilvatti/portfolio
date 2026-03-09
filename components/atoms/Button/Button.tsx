import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg font-medium",
    "transition-colors duration-200 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface-hover",
        ghost: "bg-transparent text-foreground hover:bg-surface-hover",
      },
      size: {
        sm: "h-8 px-3 text-sm gap-1.5",
        md: "h-10 px-4 text-base gap-2",
        lg: "h-12 px-6 text-lg gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type BaseProps = ButtonVariantProps & {
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & {
    href: string;
    disabled?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in rest && rest.href != null) {
    const { disabled, href, ...linkRest } = rest as ButtonAsLink;

    if (disabled) {
      return (
        <span
          className={cn(classes, "pointer-events-none opacity-50")}
          aria-disabled
        >
          {children}
        </span>
      );
    }

    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}

export { buttonVariants };
