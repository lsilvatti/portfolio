export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "light";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEME_DATA_ATTRIBUTE = "data-theme";

export const THEME_META: Record<Theme, { label: string; icon: string }> = {
  light: { label: "Light", icon: "☀️" },
  dark: { label: "Dark", icon: "🌙" },
};
