import type { ElementType, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    size: {
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type IconProps = SVGProps<SVGSVGElement> &
  VariantProps<typeof iconVariants> & {
    icon: ElementType;
  };

export function Icon({ icon: Component, size, className, ...rest }: IconProps) {
  return (
    <Component
      className={cn(iconVariants({ size }), className)}
      aria-hidden="true"
      {...rest}
    />
  );
}

export { iconVariants };