"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Trigger (wrapper) ────────────────────────────────────── */

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

/* ─── Content variants ─────────────────────────────────────── */

const popoverContentVariants = cva(
  [
    "z-50 rounded-xl border bg-surface text-foreground shadow-lg outline-none",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
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
        sm: "w-56 p-3 text-sm",
        md: "w-72 p-4 text-base",
        lg: "w-96 p-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

/* ─── Content ──────────────────────────────────────────────── */

export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> &
  VariantProps<typeof popoverContentVariants>;

function PopoverContent({
  variant,
  size,
  className,
  sideOffset = 8,
  align = "center",
  children,
  ...rest
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(popoverContentVariants({ variant, size }), className)}
        {...rest}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/* ─── Convenience compound wrapper ─────────────────────────── */

type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
  trigger: React.ReactNode;
  contentProps?: Omit<PopoverContentProps, "children">;
  children: React.ReactNode;
};

function Popover({ trigger, contentProps, children, ...rootProps }: PopoverProps) {
  return (
    <PopoverRoot {...rootProps}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent {...contentProps}>{children}</PopoverContent>
    </PopoverRoot>
  );
}

export {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
  popoverContentVariants,
};
