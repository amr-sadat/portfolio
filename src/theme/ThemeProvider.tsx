import { useEffect, useState, type ReactNode } from 'react';
import { THEME_STORAGE_KEY, ThemeContext, type Theme } from './useTheme';

function readInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'obsidian') {
      return 'obsidian';
    }
    if (stored === 'daylight') {
      return 'daylight';
    }
  } catch {
    // Ignore storage access errors in restricted contexts.
  }

  return document.documentElement.dataset.theme === 'obsidian' ? 'obsidian' : 'daylight';
}

function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write errors in restricted contexts.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    persistTheme(next);
  };

  const toggleTheme = () => {
    setTheme(theme === 'daylight' ? 'obsidian' : 'daylight');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
