import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { spacingTokens, typographyTokens, themeVariants, applyThemeVariant } from './theme';

const ThemeContext = createContext({
  theme: 'light',
  tokens: {
    spacing: spacingTokens,
    typography: typographyTokens,
    palette: themeVariants.light
  },
  setTheme: () => {},
  toggleTheme: () => {}
});

export const ThemeProvider = ({ initialTheme = 'light', children }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    applyThemeVariant(theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    tokens: {
      spacing: spacingTokens,
      typography: typographyTokens,
      palette: themeVariants[theme] ?? themeVariants.light
    }
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
