"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { THEME_META } from "@/constants/theme";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={`Switch to ${THEME_META[next].label} theme`}
      title={`Switch to ${THEME_META[next].label} theme`}
      className={cn(
        "relative h-8 w-8 cursor-pointer rounded-lg",
        "text-muted hover:text-foreground",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      <Icon
        name="sun"
        size="xs"
        className={cn(
          "absolute inset-0 m-auto transition-all duration-300",
          isDark
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Icon
        name="moon"
        size="xs"
        className={cn(
          "absolute inset-0 m-auto transition-all duration-300",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
}
