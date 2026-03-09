"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { THEME_META } from "@/constants/theme";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleTrack = cva([
  "relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center",
  "rounded-full border-2 border-transparent",
  "bg-primary",
  "transition-colors duration-300 ease-in-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
]);

const toggleThumb = cva([
  "pointer-events-none inline-flex h-5 w-5 items-center justify-center",
  "rounded-full bg-surface shadow-md",
  "transform transition-transform duration-300 ease-in-out",
  "text-xs",
]);

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={`Switch to ${THEME_META[next].label} theme`}
      title={`Switch to ${THEME_META[next].label} theme`}
      className={cn(toggleTrack(), className)}
    >
      <span
        aria-hidden
        className={cn(toggleThumb())}
        style={{ transform: isDark ? "translateX(1.75rem)" : "translateX(0)" }}
      >
        {THEME_META[theme].icon}
      </span>
    </button>
  );
}

export { toggleTrack, toggleThumb };
