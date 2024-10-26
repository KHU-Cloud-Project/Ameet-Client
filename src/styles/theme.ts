// /src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    text: '#333',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

export type ThemeType = typeof theme;
