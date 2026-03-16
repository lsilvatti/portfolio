import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/atoms/Button";
import { Download } from "lucide-react";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type DownloadButtonProps = ButtonVariantProps & {
  href: string;
  filename?: string;
  iconLeft?: ElementType;
  iconRight?: ElementType;
  rounded?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "download">;

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
