import type { ElementType, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/atoms/Button";
import { Download } from "lucide-react";

type DownloadButtonProps = {
  href: string;
  filename?: string;
  children?: ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  fullWidth?: boolean;
  rounded?: boolean;
  iconLeft?: ElementType;
  iconRight?: ElementType;
  disabled?: boolean;
};

export function DownloadButton({
  href,
  filename,
  children,
  iconLeft = Download,
  ...rest
}: DownloadButtonProps) {
  return (
    <Button
      href={href}
      download={filename ?? true}
      target="_blank"
      rel="noopener noreferrer"
      iconLeft={iconLeft}
      {...rest}
    >
      {children}
    </Button>
  );
}
