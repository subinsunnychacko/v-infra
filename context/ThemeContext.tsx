'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeName, themes, applyTheme } from '@/utils/themes';

interface ThemeContextType {
  currentTheme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('navy-gold');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes['navy-gold']);

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('building-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
      setCurrentTheme(themes[savedTheme]);
      applyTheme(themes[savedTheme]);
    } else {
      applyTheme(themes['navy-gold']);
    }
  }, []);

  const setTheme = (name: ThemeName) => {
    const theme = themes[name];
    if (theme) {
      setThemeName(name);
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem('building-theme', name);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
