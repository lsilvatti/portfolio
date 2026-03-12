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
    "z-50 rounded-lg border bg-background text-foreground shadow-md outline-none",
    "data-[state=delayed-open]:animate-[fade-pop-in_0.2s_ease-out_both]",
    "data-[state=instant-open]:animate-[fade-pop-in_0.2s_ease-out_both]",
    "data-[state=closed]:animate-[fade-pop-out_0.15s_ease-in_both]",
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

function Tooltip({ content, contentProps, children, delayDuration = 100, ...rootProps }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={delayDuration} {...rootProps}>
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
