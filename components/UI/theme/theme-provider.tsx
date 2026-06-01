"use client";

import * as React from "react";

type Props = {
  children: React.ReactNode;
  attribute?: string | string[];
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  resolvedTheme: string;
  setTheme: (t: string) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
  disableTransitionOnChange = false,
}: Props) {
  const [resolvedTheme, setResolvedTheme] = React.useState<string>(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
      if (enableSystem) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) {
      /* ignore */
    }
    return defaultTheme === "system" ? "light" : defaultTheme;
  });

  React.useEffect(() => {
    const apply = (value: string) => {
      const el = document.documentElement;
      if (Array.isArray(attribute)) {
        const attr = attribute[0];
        if (attr === "class") {
          el.classList.remove("light", "dark");
          el.classList.add(value);
        } else {
          el.setAttribute(attr, value);
        }
      } else if (attribute === "class") {
        el.classList.remove("light", "dark");
        el.classList.add(value);
      } else {
        el.setAttribute(attribute, value);
      }
    };

    try {
      if (disableTransitionOnChange) {
        const css = document.createElement("style");
        css.appendChild(
          document.createTextNode("*,*::before,*::after{transition:none!important}")
        );
        document.head.appendChild(css);
        apply(resolvedTheme);
        requestAnimationFrame(() => css.remove());
      } else {
        apply(resolvedTheme);
      }
    } catch (e) {
      /* ignore */
    }
    try {
      localStorage.setItem(storageKey, resolvedTheme);
    } catch (e) {
      /* ignore */
    }
  }, [resolvedTheme, attribute, storageKey, disableTransitionOnChange]);

  const setTheme = (t: string) => setResolvedTheme((_) => t);

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
