"use client";

import {
  createContext,
  useCallback,
  useContext,
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

  // Sync the data-theme attribute before every paint so it survives
  // framework-driven DOM patches (e.g. locale navigation that re-renders <html>).
  //
  // On the very first render (initial hydration OR a remount caused by a locale
  // switch): read the attribute the inline <script> already wrote — or fall back
  // to localStorage — so we never flash the wrong theme and the ThemeToggle icon
  // is correct from the first paint even after remounting.
  //
  // On every subsequent render: keep the attribute in sync with state.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const domTheme = document.documentElement.getAttribute(THEME_DATA_ATTRIBUTE);
      const realTheme: Theme =
        domTheme === "light" || domTheme === "dark" ? domTheme : getStoredTheme();
      document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, realTheme);
      if (realTheme !== theme) {
        setTheme(realTheme);
      }
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