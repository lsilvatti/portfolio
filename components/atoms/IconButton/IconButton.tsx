"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/atoms/Icon";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  type PopoverContentProps,
} from "@/components/atoms/Popover";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-all duration-300 cursor-pointer",
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
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const iconSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "md",
} as const satisfies Record<
  NonNullable<VariantProps<typeof iconButtonVariants>["size"]>,
  "xs" | "sm" | "md"
>;

type BaseProps = VariantProps<typeof iconButtonVariants> & {
  icon: IconName;
  /** Always used as aria-label for accessibility. */
  label: string;
  /** Content rendered inside the popover when the button is clicked. */
  popover?: ReactNode;
  /** Props forwarded to PopoverContent. Only used when `popover` is set. */
  popoverProps?: Omit<PopoverContentProps, "children">;
  className?: string;
};

type IconButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: never;
  };

type IconButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & {
    href: string;
    disabled?: boolean;
  };

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

function renderButton({
  classes,
  label,
  iconNode,
  rest,
}: {
  classes: string;
  label: string;
  iconNode: ReactNode;
  rest: IconButtonAsButton | IconButtonAsLink;
}) {
  if ("href" in rest && rest.href != null) {
    const { disabled, href, popover: _p, popoverProps: _pp, ...linkRest } =
      rest as IconButtonAsLink & { popover?: ReactNode; popoverProps?: unknown };

    if (disabled) {
      return (
        <span
          className={cn(classes, "pointer-events-none opacity-50")}
          aria-label={label}
          aria-disabled
        >
          {iconNode}
        </span>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={label} {...(linkRest as object)}>
        {iconNode}
      </Link>
    );
  }

  const { popover: _p, popoverProps: _pp, ...btnRest } =
    rest as IconButtonAsButton & { popover?: ReactNode; popoverProps?: unknown };

  return (
    <button className={classes} aria-label={label} {...(btnRest as object)}>
      {iconNode}
    </button>
  );
}

export function IconButton({
  variant,
  size,
  className,
  icon,
  label,
  popover,
  popoverProps,
  ...rest
}: IconButtonProps) {
  const resolvedSize = size ?? "md";
  const classes = cn(iconButtonVariants({ variant, size }), className);
  const iconNode = <Icon name={icon} size={iconSizeMap[resolvedSize]} aria-hidden />;

  const button = renderButton({ classes, label, iconNode, rest: rest as IconButtonAsButton | IconButtonAsLink });

  if (popover) {
    return (
      <PopoverRoot>
        <PopoverTrigger asChild>{button}</PopoverTrigger>
        <PopoverContent {...popoverProps}>{popover}</PopoverContent>
      </PopoverRoot>
    );
  }

  return button;
}

export { iconButtonVariants };
