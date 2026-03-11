import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("border-0 shrink-0", {
  variants: {
    color: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      muted: "bg-muted",
      border: "bg-border",
    },
    size: {
      thin: "",
      medium: "",
      thick: "",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "thin",   class: "h-px" },
    { orientation: "horizontal", size: "medium", class: "h-0.75" },
    { orientation: "horizontal", size: "thick",  class: "h-1" },
    { orientation: "vertical",   size: "thin",   class: "w-px" },
    { orientation: "vertical",   size: "medium", class: "w-0.75" },
    { orientation: "vertical",   size: "thick",  class: "w-1" },
  ],
  defaultVariants: {
    color: "primary",
    size: "medium",
    orientation: "horizontal",
  },
});

type DividerProps = {
  animated?: boolean;
} & VariantProps<typeof dividerVariants> &
  ComponentPropsWithoutRef<"hr">;

export const Divider = ({
  animated = false,
  color,
  size,
  orientation,
  className,
  ...rest
}: DividerProps) => {
  return (
    <hr
      className={cn(
        dividerVariants({ color, size, orientation }),
        animated && orientation !== "vertical" ? "origin-center animate-grow-x" : "",
        className
      )}
      {...rest}
    />
  );
};