"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  type TooltipContentProps,
} from "@/components/atoms/Tooltip";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-all duration-300 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:scale-[1.03] active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-sm",
        outline: "border border-border bg-transparent text-foreground hover:bg-surface-hover",
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
  icon: ElementType;
  label: string;
  tooltip?: ReactNode;
  tooltipProps?: Omit<TooltipContentProps, "children">;
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
    const { disabled, href, tooltip: _t, tooltipProps: _tp, ...linkRest } =
      rest as IconButtonAsLink & { tooltip?: ReactNode; tooltipProps?: unknown };

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

  const { tooltip: _t, tooltipProps: _tp, ...btnRest } =
    rest as IconButtonAsButton & { tooltip?: ReactNode; tooltipProps?: unknown };

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
  icon: Component,
  label,
  tooltip,
  tooltipProps,
  ...rest
}: IconButtonProps) {
  const resolvedSize = size ?? "md";
  const classes = cn(iconButtonVariants({ variant, size }), className);
  const iconNode = <Icon icon={Component} size={iconSizeMap[resolvedSize]} aria-hidden="true" />;

  const button = renderButton({ classes, label, iconNode, rest: rest as IconButtonAsButton | IconButtonAsLink });

  if (tooltip) {
    return (
      <TooltipProvider>
        <TooltipRoot delayDuration={100}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent {...tooltipProps}>{tooltip}</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    );
  }

  return button;
}

export { iconButtonVariants };