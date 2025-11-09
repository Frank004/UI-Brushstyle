export const spacingTokens = {
  xs: '0.375rem',
  sm: '0.625rem',
  md: '0.875rem',
  lg: '1.25rem',
  xl: '1.75rem',
  container: 'clamp(1.25rem, 4vw, 2.75rem)',
  section: 'clamp(2.5rem, 6vw, 4.5rem)',
  gap: 'clamp(1rem, 3vw, 2.25rem)'
};

export const typographyTokens = {
  fonts: {
    body: "'DM Sans', 'Kalam', 'Segoe UI', sans-serif",
    display: "'Caveat', 'Kalam', cursive",
    mono: "'Fira Code', monospace"
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    title: '1.75rem',
    display: '2.75rem'
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

export const themeVariants = {
  light: {
    name: 'light',
    background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 45%, #fde4f9 100%)',
    text: '#1f2937',
    textMuted: 'rgba(31, 41, 55, 0.72)',
    textSubtle: 'rgba(31, 41, 55, 0.55)',
    surface: '#ffffff',
    surfaceAlt: '#f8fafc',
    surfaceActive: '#eff6ff',
    surfaceText: '#1f2937',
    surfaceTextMuted: 'rgba(31, 41, 55, 0.68)',
    surfaceTextSubtle: 'rgba(31, 41, 55, 0.52)',
    border: '#111827',
    borderMuted: 'rgba(17, 24, 39, 0.14)',
    accent: '#2563eb',
    shadow: 'drop-shadow(4px 4px 0 rgba(15, 23, 42, 0.08))'
  },
  dark: {
    name: 'dark',
    background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 40%, #312e81 100%)',
    text: '#f9fafb',
    textMuted: 'rgba(249, 250, 251, 0.78)',
    textSubtle: 'rgba(249, 250, 251, 0.56)',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',
    surfaceActive: '#e5e7eb',
    surfaceText: '#1f2937',
    surfaceTextMuted: 'rgba(31, 41, 55, 0.68)',
    surfaceTextSubtle: 'rgba(31, 41, 55, 0.52)',
    border: '#111827',
    borderMuted: 'rgba(17, 24, 39, 0.25)',
    accent: '#60a5fa',
    shadow: 'drop-shadow(4px 4px 0 rgba(96, 165, 250, 0.22))'
  }
};

export const colorTokens = {
  text: 'var(--brush-text, #1f2937)',
  textMuted: 'var(--brush-text-muted, rgba(31, 41, 55, 0.72))',
  textSubtle: 'var(--brush-text-subtle, rgba(31, 41, 55, 0.55))',
  surface: 'var(--brush-surface, #ffffff)',
  surfaceAlt: 'var(--brush-surface-alt, #f8fafc)',
  surfaceActive: 'var(--brush-surface-active, #eff6ff)',
  surfaceText: 'var(--brush-surface-text, #1f2937)',
  surfaceTextMuted: 'var(--brush-surface-text-muted, rgba(31, 41, 55, 0.68))',
  surfaceTextSubtle: 'var(--brush-surface-text-subtle, rgba(31, 41, 55, 0.52))',
  border: 'var(--brush-border, #111827)',
  borderMuted: 'var(--brush-border-muted, rgba(17, 24, 39, 0.14))',
  accent: 'var(--brush-accent, #2563eb)'
};

export const getSpacing = (token, fallback) => spacingTokens[token] ?? fallback;
export const getFontFamily = (token = 'body') => typographyTokens.fonts[token] ?? typographyTokens.fonts.body;
export const getFontSize = (token, fallback) => typographyTokens.sizes[token] ?? fallback ?? typographyTokens.sizes.md;
export const getFontWeight = (token, fallback) => typographyTokens.weights[token] ?? fallback ?? typographyTokens.weights.regular;
export const getColor = (token, fallback) => colorTokens[token] ?? fallback ?? colorTokens.text;

export const applyThemeVariant = (variantName) => {
  const variant = themeVariants[variantName] ?? themeVariants.light;
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--brush-surface', variant.surface);
  root.style.setProperty('--brush-surface-alt', variant.surfaceAlt);
  root.style.setProperty('--brush-surface-active', variant.surfaceActive);
  root.style.setProperty('--brush-border', variant.border);
  root.style.setProperty('--brush-border-muted', variant.borderMuted);
  root.style.setProperty('--brush-text', variant.text);
  root.style.setProperty('--brush-text-muted', variant.textMuted);
  root.style.setProperty('--brush-text-subtle', variant.textSubtle);
  root.style.setProperty('--brush-surface-text', variant.surfaceText);
  root.style.setProperty('--brush-surface-text-muted', variant.surfaceTextMuted);
  root.style.setProperty('--brush-surface-text-subtle', variant.surfaceTextSubtle);
  root.style.setProperty('--brush-accent', variant.accent);
  root.style.setProperty('--brush-shadow', variant.shadow);
  root.style.setProperty('--brush-background', variant.background);
};
