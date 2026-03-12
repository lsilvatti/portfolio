import type { SVGProps } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { localIcons, type LocalIconName } from "./icons";

/* ─── Lucide name resolution ───────────────────────────────── */

/** Converts "arrow-left" → "ArrowLeft" for lucide lookup. */
function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function getLucideComponent(name: string): LucideIcon | undefined {
  const key = toPascalCase(name);
  const component = (LucideIcons as Record<string, unknown>)[key];
  return typeof component === "function" ? (component as LucideIcon) : undefined;
}

/* ─── Size variants ────────────────────────────────────────── */

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

/* ─── Props ────────────────────────────────────────────────── */

type SvgProps = Omit<SVGProps<SVGSVGElement>, "name" | "size">;
type LucideProps = Omit<React.ComponentProps<LucideIcon>, "size">;
type BaseVariantProps = VariantProps<typeof iconVariants> & { className?: string };

/**
 * Resolves icons with the following priority:
 * 1. Local SVG definitions in `icons.ts` (full control, customisable)
 * 2. Lucide-react fallback — name is converted to PascalCase for lookup
 * 3. `lucide` prop — pass any LucideIcon component directly (escape hatch)
 *
 * @example
 * <Icon name="github" />           // local SVG
 * <Icon name="rocket" />           // lucide fallback (Rocket)
 * <Icon lucide={Sparkles} />       // direct lucide component
 */
export type IconProps =
  | (BaseVariantProps & SvgProps & { name: LocalIconName; lucide?: never })
  | (BaseVariantProps & SvgProps & { name: string; lucide?: never })
  | (BaseVariantProps & LucideProps & { lucide: LucideIcon; name?: never });

export type IconName = LocalIconName;

export function Icon({ name, lucide, size, className, ...rest }: IconProps) {
  const sizeClass = iconVariants({ size });

  // 1. Direct lucide component prop
  if (lucide) {
    const LucideComponent = lucide;
    return (
      <LucideComponent
        className={cn(sizeClass, className)}
        aria-hidden
        {...(rest as LucideProps)}
      />
    );
  }

  const iconName = name as string;

  // 2. Local SVG icon (highest priority for named icons)
  if (iconName in localIcons) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(sizeClass, className)}
        aria-hidden
        {...(rest as SvgProps)}
      >
        {localIcons[iconName as LocalIconName]}
      </svg>
    );
  }

  // 3. Lucide fallback by name (PascalCase conversion)
  const LucideFallback = getLucideComponent(iconName);
  if (LucideFallback) {
    return (
      <LucideFallback
        className={cn(sizeClass, className)}
        aria-hidden
        {...(rest as LucideProps)}
      />
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(`[Icon] "${iconName}" not found locally or in lucide-react.`);
  }

  return null;
}

export { iconVariants };
