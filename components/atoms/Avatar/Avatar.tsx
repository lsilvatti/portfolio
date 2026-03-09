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
};

export function Avatar({
  src,
  alt,
  size = "md",
  priority = false,
  className,
}: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={dimensionMap[size!]}
      height={dimensionMap[size!]}
      priority={priority}
      className={cn(avatarVariants({ size }), className)}
    />
  );
}

export { avatarVariants };
