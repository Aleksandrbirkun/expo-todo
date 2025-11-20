'use client';
import { createContext, useEffect, useState, ReactNode } from 'react';

type ThemeMode = 'default' | 'classic';

interface ThemeContextValue {
  themeMode: ThemeMode;
  isClassic: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'app_theme_mode';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeMode && ['default', 'classic'].includes(savedThemeMode)) {
          setThemeModeState(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme mode:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemeMode();
  }, []);

  // Apply theme to document element
  useEffect(() => {
    if (!isLoading && typeof document !== 'undefined') {
      const theme = themeMode === 'classic' ? 'classic' : 'default';
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [themeMode, isLoading]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  const isClassic = themeMode === 'classic';

  const toggleTheme = async () => {
    const newMode = isClassic ? 'default' : 'classic';
    await setThemeMode(newMode);
  };

  const value: ThemeContextValue = {
    themeMode,
    isClassic,
    setThemeMode,
    toggleTheme,
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
