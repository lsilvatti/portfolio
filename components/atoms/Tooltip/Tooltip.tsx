"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Primitives ────────────────────────────────────────────── */

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

/* ─── Content variants ─────────────────────────────────────── */

const tooltipContentVariants = cva(
  [
    "z-50 rounded-lg border bg-surface text-foreground shadow-md outline-none",
    "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=top]:slide-in-from-bottom-2",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/20",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

/* ─── Content ──────────────────────────────────────────────── */

export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> &
  VariantProps<typeof tooltipContentVariants>;

function TooltipContent({
  variant,
  size,
  className,
  sideOffset = 6,
  children,
  ...rest
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant, size }), className)}
        {...rest}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/* ─── Convenience compound wrapper ─────────────────────────── */

type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> & {
  content: React.ReactNode;
  contentProps?: Omit<TooltipContentProps, "children">;
  children: React.ReactNode;
};

function Tooltip({ content, contentProps, children, ...rootProps }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot {...rootProps}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...contentProps}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  tooltipContentVariants,
};
