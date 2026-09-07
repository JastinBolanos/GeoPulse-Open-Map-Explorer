import { useState, useCallback } from 'react';
import { AppTheme } from '../types';

const THEME_STORAGE_KEY = 'geopulse_theme';

export function useTheme(defaultTheme: AppTheme = 'dark') {
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const toggleTheme = useCallback((newTheme: AppTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const isLight = theme === 'light';

  return {
    theme,
    isLight,
    setTheme: toggleTheme,
  };
}
