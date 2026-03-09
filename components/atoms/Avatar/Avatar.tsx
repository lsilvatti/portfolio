import Image from "next/image";

const sizeMap = {
  sm: { dimension: 48, className: "h-12 w-12" },
  md: { dimension: 80, className: "h-20 w-20" },
  lg: { dimension: 128, className: "h-32 w-32" },
} as const;

type AvatarSize = keyof typeof sizeMap;

type AvatarProps = {
  src: string;
  alt: string;
  size?: AvatarSize;
  priority?: boolean;
  className?: string;
};

export function Avatar({
  src,
  alt,
  size = "md",
  priority = false,
  className = "",
}: AvatarProps) {
  const { dimension, className: sizeClass } = sizeMap[size];

  return (
    <Image
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      priority={priority}
      className={`rounded-full object-cover ${sizeClass} ${className}`}
    />
  );
}
