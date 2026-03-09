import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "rounded-2xl transition-all duration-300",
    /* 3-D layered shadow */
    "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.06)]",
    "hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.1),0_24px_48px_rgba(0,0,0,0.08)]",
    "hover:-translate-y-0.5",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface border border-border",
        primary: "bg-primary-light border border-primary/20",
        ghost: "bg-transparent border border-border/50",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

type CardProps = VariantProps<typeof cardVariants> & {
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export function Card({
  variant,
  padding,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)} {...rest}>
      {children}
    </div>
  );
}

export { cardVariants };
