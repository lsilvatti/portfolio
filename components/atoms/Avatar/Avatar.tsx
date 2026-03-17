import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("rounded-full object-cover", {
  variants: {
    size: {
      sm: "h-12 w-12",
      md: "h-20 w-20",
      lg: "h-32 w-32",
    },
    border: {
      default: "ring-2 ring-border",
      primary: "ring-2 ring-primary/20",
      ghost: "ring-2 ring-border/50",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;

const dimensionMap: Record<AvatarSize, number> = {
  sm: 48,
  md: 80,
  lg: 128,
};

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
};

export function Avatar({
  src,
  alt,
  size = "md",
  border,
  priority = false,
  className,
  style,
  loading,
}: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={dimensionMap[size!]}
      height={dimensionMap[size!]}
      priority={priority}
      className={cn(avatarVariants({ size, border }), className)}
      style={style}
      loading={loading}
    />
  );
}

export { avatarVariants };
