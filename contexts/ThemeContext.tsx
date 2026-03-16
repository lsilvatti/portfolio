"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_THEME,
  THEME_DATA_ATTRIBUTE,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/constants/theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with DEFAULT_THEME so the first client render matches the
  // server-rendered HTML, avoiding a hydration mismatch.
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const isFirstRender = useRef(true);

  // After hydration, sync to the user's actual stored/system preference.
  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  // Sync the data-theme attribute before every paint so it survives
  // framework-driven DOM patches (e.g. locale navigation that re-renders <html>).
  // Skip the very first render so the inline script's value is preserved through
  // hydration and we don't flash the wrong theme.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, theme);
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}